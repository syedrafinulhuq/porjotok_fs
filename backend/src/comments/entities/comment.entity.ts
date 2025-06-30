import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @ApiProperty({ example: 'This looks amazing!' })
  @Column()
  content: string;

  @ApiProperty({ example: 5 })
  @Column({ default: 0 })
  likesCount: number;

  @ManyToOne(() => User, user => user.comments, { eager: true })
  author: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @ManyToOne(() => Comment, comment => comment.replies, { nullable: true })
  parent: Comment;

  @OneToMany(() => Comment, comment => comment.parent)
  replies: Comment[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'comment_likes' })
  likedBy: User[];
}