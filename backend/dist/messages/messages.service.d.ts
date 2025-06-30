import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
export declare class MessagesService {
    private readonly conversationRepository;
    private readonly messageRepository;
    private readonly usersService;
    constructor(conversationRepository: Repository<Conversation>, messageRepository: Repository<Message>, usersService: UsersService);
    createConversation(createConversationDto: CreateConversationDto, currentUser: User): Promise<Conversation>;
    getUserConversations(userId: string): Promise<Conversation[]>;
    getConversationById(id: string): Promise<Conversation>;
    sendMessage(conversationId: string, createMessageDto: CreateMessageDto, sender: User): Promise<Message>;
    getConversationMessages(conversationId: string): Promise<Message[]>;
    leaveConversation(conversationId: string, userId: string): Promise<void>;
}
