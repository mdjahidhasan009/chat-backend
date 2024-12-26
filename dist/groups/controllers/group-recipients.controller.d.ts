import { IGroupRecipientService } from '../interfaces/group-recipient';
import { User } from '../../utils/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AddGroupRecipientDto } from '../dtos/AddGroupRecipient.dto';
export declare class GroupRecipientsController {
    private readonly groupRecipientService;
    private eventEmitter;
    constructor(groupRecipientService: IGroupRecipientService, eventEmitter: EventEmitter2);
    addGroupRecipient({ id: userId }: User, id: number, { username }: AddGroupRecipientDto): Promise<import("../../utils/types").AddGroupUserResponse>;
    leaveGroup(user: User, groupId: number): Promise<any>;
    removeGroupRecipient({ id: issuerId }: User, id: number, removeUserId: number): Promise<import("../../utils/typeorm").Group>;
}
