import { Entity, Column, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Photo } from '../../photos/entities/photo.entity';
import { Hashtag } from '../../hashtags/entities/hashtag.entity';

export enum PrivacyLevel {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  PRIVATE = 'private',
}

@Entity('posts')
export class Post extends BaseEntity {
  @ApiProperty({ example: 'My amazing trip to Bali' })
  @Column()
  content: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ enum: PrivacyLevel, default: PrivacyLevel.PUBLIC })
  @Column({ type: 'enum', enum: PrivacyLevel, default: PrivacyLevel.PUBLIC })
  privacyLevel: PrivacyLevel;

  @ApiProperty({ example: 42 })
  @Column({ default: 0 })
  likesCount: number;

  @ApiProperty({ example: 15 })
  @Column({ default: 0 })
  commentsCount: number;

  @ApiProperty({ example: false })
  @Column({ default: false })
  isPinned: boolean;

  @ApiProperty({ example: '2023-05-30T15:30:00Z', required: false })
  @Column({ nullable: true })
  scheduledFor: Date;

  @ManyToOne(() => User, user => user.posts, { eager: true })
  author: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Photo, photo => photo.post)
  photos: Photo[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'post_likes' })
  likedBy: User[];

  @ManyToMany(() => Hashtag, hashtag => hashtag.posts)
  @JoinTable({ name: 'post_hashtags' })
  hashtags: Hashtag[];
}