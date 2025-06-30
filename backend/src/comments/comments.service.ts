import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async create(postId: string, createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const { parentId, ...commentData } = createCommentDto;
    
    // Find the post
    const post = await this.postsService.findOne(postId, user);
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    
    
    const comment = this.commentsRepository.create({
      ...commentData,
      author: user,
      post,
    });
    
    if (parentId) {
      const parentComment = await this.commentsRepository.findOne({ where: { id: parentId } });
      
      if (!parentComment) {
        throw new NotFoundException(`Parent comment with ID ${parentId} not found`);
      }
      
      comment.parent = parentComment;
    }
    
    // Increment the post's comments count
    post.commentsCount += 1;
    await this.postsService.update(postId, { commentsCount: post.commentsCount });
    
    return this.commentsRepository.save(comment);
  }

  async findAllForPost(postId: string): Promise<Comment[]> {
    return this.commentsRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.replies', 'replies')
      .leftJoinAndSelect('replies.author', 'replyAuthor')
      .where('comment.post.id = :postId', { postId })
      .andWhere('comment.parent IS NULL')
      .orderBy('comment.createdAt', 'ASC')
      .addOrderBy('replies.createdAt', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['author', 'post', 'parent', 'replies', 'likedBy'],
    });
    
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    
    Object.assign(comment, updateCommentDto);
    
    return this.commentsRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const comment = await this.findOne(id);
    
    // If the comment has replies, don't delete it, just mark it as deleted
    if (comment.replies && comment.replies.length > 0) {
      comment.content = '[deleted]';
      await this.commentsRepository.save(comment);
    } else {
      await this.commentsRepository.remove(comment);
      
      // Decrement the post's comments count
      const post = comment.post;
      post.commentsCount = Math.max(0, post.commentsCount - 1);
      await this.postsService.update(post.id, { commentsCount: post.commentsCount });
    }
  }

  async likeComment(id: string, user: User): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['likedBy'],
    });
    
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    
    // Check if user already liked the comment
    const alreadyLiked = comment.likedBy.some(likedUser => likedUser.id === user.id);
    
    if (!alreadyLiked) {
      comment.likedBy.push(user);
      comment.likesCount += 1;
      await this.commentsRepository.save(comment);
    }
    
    return comment;
  }

  async unlikeComment(id: string, user: User): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['likedBy'],
    });
    
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    
    // Remove user from likedBy array
    comment.likedBy = comment.likedBy.filter(likedUser => likedUser.id !== user.id);
    
    // Update likes count
    comment.likesCount = Math.max(0, comment.likesCount - 1);
    
    await this.commentsRepository.save(comment);
    
    return comment;
  }
}