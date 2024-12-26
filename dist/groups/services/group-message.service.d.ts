import { IMessageAttachmentsService } from './../../message-attachments/message-attachments';
import { Repository } from 'typeorm';
import { IGroupService } from '../interfaces/group';
import { Group, GroupMessage } from '../../utils/typeorm';
import { CreateGroupMessageParams, DeleteGroupMessageParams, EditGroupMessageParams } from '../../utils/types';
import { IGroupMessagesService } from '../interfaces/group-messages';
export declare class GroupMessageService implements IGroupMessagesService {
    private readonly groupMessageRepository;
    private readonly groupRepository;
    private readonly groupService;
    private readonly messageAttachmentsService;
    constructor(groupMessageRepository: Repository<GroupMessage>, groupRepository: Repository<Group>, groupService: IGroupService, messageAttachmentsService: IMessageAttachmentsService);
    createGroupMessage({ groupId: id, ...params }: CreateGroupMessageParams): Promise<{
        message: GroupMessage;
        group: Group;
    }>;
    getGroupMessages(id: number): Promise<GroupMessage[]>;
    deleteGroupMessage(params: DeleteGroupMessageParams): Promise<import("typeorm").DeleteResult>;
    editGroupMessage(params: EditGroupMessageParams): Promise<GroupMessage>;
}
