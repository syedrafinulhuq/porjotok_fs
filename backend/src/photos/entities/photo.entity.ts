import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('photos')
export class Photo extends BaseEntity {
  @ApiProperty({ example: 'https://google.com/photos/beach.jpg' })
  @Column()
  url: string;

  @ApiProperty({ example: 'Beautfiul Dhaka' })
  @Column({ nullable: true })
  caption: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh' })
  @Column({ nullable: true })
  location: string;

  @ApiProperty({ example: '{"lat": 123.456, "lng": 78.90}' })
  @Column({ type: 'json', nullable: true })
  geoLocation: Record<string, any>;

  @ManyToOne(() => User, user => user.photos)
  user: User;

  @ManyToOne(() => Post, post => post.photos, { nullable: true })
  post: Post;
}