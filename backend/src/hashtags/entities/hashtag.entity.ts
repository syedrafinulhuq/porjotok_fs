import { Entity, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('hashtags')
export class Hashtag extends BaseEntity {
  @ApiProperty({ example: 'travel' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 1024 })
  @Column({ default: 0 })
  postsCount: number;

  @ManyToMany(() => Post, post => post.hashtags)
  posts: Post[];
}