import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../../utils/typeorm';
import { Attachment } from '../../utils/types';
import { CreateGroupDto } from '../dtos/CreateGroup.dto';
import { UpdateGroupDetailsDto } from '../dtos/UpdateGroupDetails.dto';
import { TransferOwnerDto } from '../dtos/TransferOwner.dto';
import { IGroupService } from '../interfaces/group';
export declare class GroupController {
    private readonly groupService;
    private eventEmitter;
    constructor(groupService: IGroupService, eventEmitter: EventEmitter2);
    createGroup(user: User, payload: CreateGroupDto): Promise<any>;
    getGroups(user: User): Promise<import("../../utils/typeorm").Group[]>;
    getGroup(user: User, id: number): Promise<import("../../utils/typeorm").Group>;
    updateGroupOwner({ id: userId }: User, groupId: number, { newOwnerId }: TransferOwnerDto): Promise<import("../../utils/typeorm").Group>;
    updateGroupDetails({ title }: UpdateGroupDetailsDto, id: number, avatar: Attachment): Promise<import("../../utils/typeorm").Group>;
}
