import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';
import { HashtagsService } from '../hashtags/hashtags.service';
import { FriendsService } from '../friends/friends.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly hashtagsService: HashtagsService,
    private readonly friendsService: FriendsService,
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { hashtags: hashtagNames, ...postData } = createPostDto;
    
    const post = this.postsRepository.create({
      ...postData,
      author: user,
    });

    await this.postsRepository.save(post);
    
    if (hashtagNames && hashtagNames.length > 0) {
      const hashtags = await this.hashtagsService.findOrCreateMany(hashtagNames);
      post.hashtags = hashtags;
      await this.postsRepository.save(post);
    }
    
    return post;
  }

  async findAll(filters: { hashtag?: string; location?: string; userId?: string }, currentUser: User): Promise<Post[]> {
    const queryBuilder = this.postsRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.photos', 'photos')
      .leftJoinAndSelect('post.hashtags', 'hashtags');
    
    if (filters.hashtag) {
      queryBuilder.andWhere('hashtags.name = :hashtag', { hashtag: filters.hashtag });
    }
    
    if (filters.location) {
      queryBuilder.andWhere('post.location ILIKE :location', { location: `%${filters.location}%` });
    }
    
    if (filters.userId) {
      queryBuilder.andWhere('author.id = :userId', { userId: filters.userId });
    }
    
    
    queryBuilder.andWhere('(post.privacyLevel = :public OR (post.privacyLevel = :friends AND author.id IN (:...friendIds)) OR author.id = :currentUserId)', {
      public: 'public',
      friends: 'friends',
      friendIds: await this.friendsService.getFriendIds(currentUser.id),
      currentUserId: currentUser.id,
    });
    
    return queryBuilder.orderBy('post.createdAt', 'DESC').getMany();
  }

  async getFeed(user: User): Promise<Post[]> {
    const friendIds = await this.friendsService.getFriendIds(user.id);
    
    return this.postsRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.photos', 'photos')
      .leftJoinAndSelect('post.hashtags', 'hashtags')
      .where('author.id IN (:...ids)', { ids: [...friendIds, user.id] })
      .andWhere('(post.privacyLevel = :public OR (post.privacyLevel = :friends AND author.id IN (:...friendIds)) OR author.id = :userId)', {
        public: 'public',
        friends: 'friends',
        friendIds,
        userId: user.id,
      })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string, currentUser: User): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'photos', 'hashtags', 'likedBy'],
    });
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    // Check if the current user has permission to view this post
    const friendIds = await this.friendsService.getFriendIds(currentUser.id);
    
    if (
      post.privacyLevel === 'private' && post.author.id !== currentUser.id ||
      post.privacyLevel === 'friends' && post.author.id !== currentUser.id && !friendIds.includes(post.author.id)
    ) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const { hashtags: hashtagNames, ...postData } = updatePostDto;
    
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['hashtags'],
    });
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    // Update post data
    Object.assign(post, postData);
    
    // Process hashtags if present
    if (hashtagNames && hashtagNames.length > 0) {
      const hashtags = await this.hashtagsService.findOrCreateMany(hashtagNames);
      post.hashtags = hashtags;
    }
    
    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    await this.postsRepository.softRemove(post);
  }

  async likePost(id: string, user: User): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['likedBy'],
    });
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    // Check if user already liked the post
    const alreadyLiked = post.likedBy.some(likedUser => likedUser.id === user.id);
    
    if (!alreadyLiked) {
      post.likedBy.push(user);
      post.likesCount += 1;
      await this.postsRepository.save(post);
    }
    
    return post;
  }

  async unlikePost(id: string, user: User): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['likedBy'],
    });
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    
    // Remove user from likedBy array
    post.likedBy = post.likedBy.filter(likedUser => likedUser.id !== user.id);
    
    // Update likes count
    post.likesCount = Math.max(0, post.likesCount - 1);
    
    await this.postsRepository.save(post);
    
    return post;
  }
}