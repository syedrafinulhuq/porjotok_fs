import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Conversation } from './conversation.entity';
export declare enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    VOICE = "voice"
}
export declare class Message extends BaseEntity {
    type: MessageType;
    content: string;
    conversation: Conversation;
    sender: User;
    isRead: boolean;
    reactions: User[];
}
