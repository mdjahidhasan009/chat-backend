import { UploadImageParams } from "src/utils/types";

export interface IImageStorage {
  uploadBanner(params: UploadImageParams);
  uploadProfilePicture();
  deleteBanner();
  deleteProfilePicture();
}