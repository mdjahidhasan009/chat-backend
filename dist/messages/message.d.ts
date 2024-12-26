import { Message } from '../utils/typeorm';
import { CreateMessageParams, CreateMessageResponse, DeleteMessageParams, EditMessageParams } from '../utils/types';
export interface IMessageService {
    createMessage(params: CreateMessageParams): Promise<CreateMessageResponse>;
    getMessages(conversationId: number): Promise<Message[]>;
    deleteMessage(params: DeleteMessageParams): any;
    editMessage(params: EditMessageParams): Promise<Message>;
}
