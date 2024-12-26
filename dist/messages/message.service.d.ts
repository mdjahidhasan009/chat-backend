import { IFriendsService } from '../friends/friends';
import { Repository } from 'typeorm';
import { IConversationsService } from '../conversations/conversations';
import { IMessageAttachmentsService } from '../message-attachments/message-attachments';
import { Conversation, Message } from '../utils/typeorm';
import { CreateMessageParams, DeleteMessageParams, EditMessageParams } from '../utils/types';
import { IMessageService } from './message';
export declare class MessageService implements IMessageService {
    private readonly messageRepository;
    private readonly conversationService;
    private readonly messageAttachmentsService;
    private readonly friendsService;
    constructor(messageRepository: Repository<Message>, conversationService: IConversationsService, messageAttachmentsService: IMessageAttachmentsService, friendsService: IFriendsService);
    createMessage(params: CreateMessageParams): Promise<{
        message: Message;
        conversation: Conversation;
    }>;
    getMessages(conversationId: number): Promise<Message[]>;
    deleteMessage(params: DeleteMessageParams): Promise<import("typeorm").DeleteResult>;
    deleteLastMessage(conversation: Conversation, message: Message): Promise<import("typeorm").DeleteResult>;
    editMessage(params: EditMessageParams): Promise<Message>;
}
