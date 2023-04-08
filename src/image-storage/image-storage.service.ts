import { Services } from './../utils/constants';
import { Inject, Injectable } from "@nestjs/common";
import { IImageStorage } from "./image-storage";
import { S3 } from '@aws-sdk/client-s3';
import { UploadImageParams } from 'src/utils/types';

@Injectable()
export class ImageStorageService implements IImageStorage {
  constructor(
    @Inject(Services.SPACES_CLIENT)
    private readonly spacesClient: S3,
  ) {}

  uploadBanner(params: UploadImageParams) {
    return this.spacesClient.putObject({
      Bucket: 'chuachat',
      Key: params.key,
      Body: params.file.buffer,
      ACL: 'public-read',
      ContentType: params.file.mimetype,
    })
  }

  uploadProfilePicture() {}
  deleteBanner() {}
  deleteProfilePicture() {}
}