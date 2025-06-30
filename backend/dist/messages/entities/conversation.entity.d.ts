import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Message } from './message.entity';
export declare class Conversation extends BaseEntity {
    name: string;
    isGroupChat: boolean;
    participants: User[];
    messages: Message[];
}
