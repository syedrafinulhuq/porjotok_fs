import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Photo } from '../../photos/entities/photo.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'Rafi.Nul@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'rafinulhuq' })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: 'Rafi' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Nul' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'Travel enthusiast and photographer' })
  @Column({ nullable: true })
  bio: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @Column({ nullable: true })
  profilePicture: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg' })
  @Column({ nullable: true })
  coverPhoto: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}