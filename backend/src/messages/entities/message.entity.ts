import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Conversation } from './conversation.entity';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VOICE = 'voice',
}

@Entity('messages')
export class Message extends BaseEntity {
  @ApiProperty({ enum: MessageType, default: MessageType.TEXT })
  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  type: MessageType;

  @ApiProperty({ example: 'Hello, how are you?' })
  @Column()
  content: string;

  @ManyToOne(() => Conversation, conversation => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => User, { eager: true })
  sender: User;

  @ApiProperty({ example: true })
  @Column({ default: false })
  isRead: boolean;

  @ManyToMany(() => User)
  @JoinTable({ name: 'message_reactions' })
  reactions: User[];
}