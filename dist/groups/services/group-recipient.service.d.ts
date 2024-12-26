import { IUserService } from '../../users/interfaces/user';
import { IGroupRecipientService } from '../interfaces/group-recipient';
import { IGroupService } from '../interfaces/group';
import { AddGroupRecipientParams, CheckUserGroupParams, LeaveGroupParams, RemoveGroupRecipientParams } from '../../utils/types';
export declare class GroupRecipientService implements IGroupRecipientService {
    private userService;
    private groupService;
    constructor(userService: IUserService, groupService: IGroupService);
    addGroupRecipient(params: AddGroupRecipientParams): Promise<{
        group: import("../../utils/typeorm").Group;
        user: import("../../utils/typeorm").User;
    }>;
    removeGroupRecipient(params: RemoveGroupRecipientParams): Promise<{
        group: import("../../utils/typeorm").Group;
        user: import("../../utils/typeorm").User;
    }>;
    isUserInGroup({ id, userId }: CheckUserGroupParams): Promise<import("../../utils/typeorm").Group>;
    leaveGroup({ id, userId }: LeaveGroupParams): Promise<import("../../utils/typeorm").Group>;
}
