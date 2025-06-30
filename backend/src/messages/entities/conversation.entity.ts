import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation extends BaseEntity {
  @ApiProperty({ example: 'Trip planning' })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ example: true })
  @Column({ default: false })
  isGroupChat: boolean;

  @ManyToMany(() => User)
  @JoinTable({ name: 'conversation_participants' })
  participants: User[];

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];
}