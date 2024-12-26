import { CreateGroupMessageParams, DeleteGroupMessageParams, EditGroupMessageParams } from '../../utils/types';
import { GroupMessage } from '../../utils/typeorm';
export interface IGroupMessagesService {
    createGroupMessage(params: CreateGroupMessageParams): any;
    getGroupMessages(id: number): Promise<GroupMessage[]>;
    deleteGroupMessage(params: DeleteGroupMessageParams): any;
    editGroupMessage(params: EditGroupMessageParams): Promise<GroupMessage>;
}
