import { UploadGroupMessageAttachmentParams, UploadMessageAttachmentParams } from './../utils/types';
import { IImageStorageService } from "./image-storage";
import { S3 } from '@aws-sdk/client-s3';
import { UploadImageParams } from 'src/utils/types';
import { GroupMessageAttachment } from 'src/utils/typeorm';
export declare class ImageStorageService implements IImageStorageService {
    private readonly spacesClient;
    constructor(spacesClient: S3);
    upload(params: UploadImageParams): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    uploadMessageAttachment(params: UploadMessageAttachmentParams): Promise<import("src/utils/typeorm").MessageAttachment>;
    uploadGroupMessageAttachment(params: UploadGroupMessageAttachmentParams): Promise<GroupMessageAttachment>;
}
