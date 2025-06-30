import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { User } from '../users/entities/user.entity';
import { PostsService } from '../posts/posts.service';
import { FriendsService } from '../friends/friends.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
    private readonly postsService: PostsService,
    private readonly friendsService: FriendsService,
  ) {}

  async create(createPhotoDto: CreatePhotoDto, user: User): Promise<Photo> {
    const { postId, ...photoData } = createPhotoDto;
    
    const photo = this.photosRepository.create({
      ...photoData,
      user,
    });
    
    
    if (postId) {
      const post = await this.postsService.findOne(postId, user);
      
      if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }
      
      photo.post = post;
    }
    
    return this.photosRepository.save(photo);
  }

  async findAll(currentUser: User): Promise<Photo[]> {
    const friendIds = await this.friendsService.getFriendIds(currentUser.id);
    
    return this.photosRepository.createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'user')
      .leftJoinAndSelect('photo.post', 'post')
      .where('(post.privacyLevel = :public OR (post.privacyLevel = :friends AND user.id IN (:...friendIds)) OR user.id = :userId)', {
        public: 'public',
        friends: 'friends',
        friendIds: friendIds.length ? friendIds : ['no-friends'],
        userId: currentUser.id,
      })
      .orderBy('photo.createdAt', 'DESC')
      .getMany();
  }

  async findByUser(userId: string, currentUser: User): Promise<Photo[]> {
    const areFriends = await this.friendsService.areUsersFriends(userId, currentUser.id);
    
    const queryBuilder = this.photosRepository.createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'user')
      .leftJoinAndSelect('photo.post', 'post')
      .where('user.id = :userId', { userId });
    
    if (userId !== currentUser.id) {
      if (areFriends) {
        queryBuilder.andWhere('(post.privacyLevel = :public OR post.privacyLevel = :friends)', {
          public: 'public',
          friends: 'friends',
        });
      } else {
        queryBuilder.andWhere('post.privacyLevel = :public', { public: 'public' });
      }
    }
    
    return queryBuilder.orderBy('photo.createdAt', 'DESC').getMany();
  }

  async findOne(id: string, currentUser: User): Promise<Photo> {
    const photo = await this.photosRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
    
    if (!photo) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    
    if (photo.post) {
      const areFriends = await this.friendsService.areUsersFriends(photo.user.id, currentUser.id);
      
      if (
        photo.post.privacyLevel === 'private' && photo.user.id !== currentUser.id ||
        photo.post.privacyLevel === 'friends' && !areFriends && photo.user.id !== currentUser.id
      ) {
        throw new NotFoundException(`Photo with ID ${id} not found`);
      }
    }
    
    return photo;
  }

  async remove(id: string): Promise<void> {
    const photo = await this.photosRepository.findOne({ where: { id } });
    
    if (!photo) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }
    
    await this.photosRepository.remove(photo);
  }
}