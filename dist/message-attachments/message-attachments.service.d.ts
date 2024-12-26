import { Attachment } from './../utils/types';
import { IImageStorageService } from './../image-storage/image-storage';
import { MessageAttachment } from './../utils/typeorm/entities/MessageAttachment';
import { IMessageAttachmentsService } from "./message-attachments";
import { Repository } from 'typeorm';
import { GroupMessageAttachment } from '../utils/typeorm';
export declare class MessageAttachmentsService implements IMessageAttachmentsService {
    private readonly attachmentRepository;
    private readonly groupAttachmentRepository;
    private readonly imageUploadService;
    constructor(attachmentRepository: Repository<MessageAttachment>, groupAttachmentRepository: Repository<GroupMessageAttachment>, imageUploadService: IImageStorageService);
    create(attachments: Attachment[]): Promise<MessageAttachment[]>;
    createGroupAttachments(attachments: Attachment[]): Promise<GroupMessageAttachment[]>;
    deleteAllAttachments(attachments: MessageAttachment[]): Promise<import("typeorm").DeleteResult[]>;
}
