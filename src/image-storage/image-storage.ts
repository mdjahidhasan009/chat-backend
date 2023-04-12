import { GroupMessageAttachment, MessageAttachment } from '../utils/typeorm';
import { UploadGroupMessageAttachmentParams, UploadMessageAttachmentParams } from './../utils/types';
import { UploadImageParams } from "../utils/types";

export interface IImageStorageService {
  upload(params: UploadImageParams);
  uploadMessageAttachment(
    params: UploadMessageAttachmentParams,
  ): Promise<MessageAttachment>;
  uploadGroupMessageAttachment(
    params: UploadGroupMessageAttachmentParams,
  ): Promise<GroupMessageAttachment>;
}