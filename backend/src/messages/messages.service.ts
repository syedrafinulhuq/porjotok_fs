import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message, MessageType } from './entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}

  async createConversation(createConversationDto: CreateConversationDto, currentUser: User): Promise<Conversation> {
    const { participantIds, ...conversationData } = createConversationDto;
    
    
    const uniqueParticipantIds = [...new Set([...participantIds, currentUser.id])];
    
    
    const participants: User[] = [];
    for (const id of uniqueParticipantIds) {
      try {
        const user = await this.usersService.findOne(id);
        participants.push(user);
      } catch (error) {
        
      }
    }
    
    
    const conversation = this.conversationRepository.create({
      ...conversationData,
      participants,
      isGroupChat: participants.length > 2 || conversationData.isGroupChat,
    });
    
    return this.conversationRepository.save(conversation);
  }

  async getUserConversations(userId: string): Promise<Conversation[]> {
    return this.conversationRepository.createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.participants', 'participant')
      .leftJoinAndSelect('conversation.messages', 'message')
      .where('participant.id = :userId', { userId })
      .orderBy('message.createdAt', 'DESC')
      .getMany();
  }

  async getConversationById(id: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['participants'],
    });
    
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    
    return conversation;
  }

  async sendMessage(conversationId: string, createMessageDto: CreateMessageDto, sender: User): Promise<Message> {
    const conversation = await this.getConversationById(conversationId);
    
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
    }
    
    const message = this.messageRepository.create({
      ...createMessageDto,
      sender,
      conversation,
    });
    
    return this.messageRepository.save(message);
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'ASC' },
      relations: ['sender'],
    });
  }

  async leaveConversation(conversationId: string, userId: string): Promise<void> {
    const conversation = await this.getConversationById(conversationId);
    
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
    }
    
   
    conversation.participants = conversation.participants.filter(
      participant => participant.id !== userId,
    );
    
    if (conversation.isGroupChat && conversation.participants.length > 0) {
      await this.conversationRepository.save(conversation);
    } else if (conversation.participants.length <= 1) {
   
      await this.conversationRepository.remove(conversation);
    } else {
      
      await this.conversationRepository.remove(conversation);
    }
  }
}