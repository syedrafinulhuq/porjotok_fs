import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { User } from '../users/entities/user.entity';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    createConversation(createConversationDto: CreateConversationDto, user: User): Promise<import("./entities/conversation.entity").Conversation>;
    getUserConversations(user: User): Promise<import("./entities/conversation.entity").Conversation[]>;
    getConversation(id: string, user: User): Promise<import("./entities/conversation.entity").Conversation>;
    sendMessage(conversationId: string, createMessageDto: CreateMessageDto, user: User): Promise<import("./entities/message.entity").Message>;
    getMessages(conversationId: string, user: User): Promise<import("./entities/message.entity").Message[]>;
    leaveConversation(conversationId: string, user: User): Promise<void>;
}
