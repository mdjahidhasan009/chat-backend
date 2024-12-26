import { IFriendsService } from "../friends/friends";
import { Repository } from 'typeorm';
import { IUserService } from '../users/interfaces/user';
import { Conversation, Message, User } from '../utils/typeorm';
import { AccessParams, CreateConversationParams, GetConversationMessagesParams, UpdateConversationParams } from '../utils/types';
import { IConversationsService } from './conversations';
export declare class ConversationsService implements IConversationsService {
    private readonly conversationRepository;
    private readonly messageRepository;
    private readonly userService;
    private readonly friendsService;
    constructor(conversationRepository: Repository<Conversation>, messageRepository: Repository<Message>, userService: IUserService, friendsService: IFriendsService);
    getConversations(id: number): Promise<Conversation[]>;
    findById(id: number): Promise<Conversation>;
    isCreated(userId: number, recipientId: number): Promise<Conversation>;
    createConversation(creator: User, params: CreateConversationParams): Promise<Conversation>;
    hasAccess({ id, userId }: AccessParams): Promise<boolean>;
    save(conversation: Conversation): Promise<Conversation>;
    getMessages({ id, limit, }: GetConversationMessagesParams): Promise<Conversation>;
    update({ id, lastMessageSent }: UpdateConversationParams): Promise<import("typeorm").UpdateResult>;
}
