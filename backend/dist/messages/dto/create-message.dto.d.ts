import { MessageType } from '../entities/message.entity';
export declare class CreateMessageDto {
    type?: MessageType;
    content: string;
}
