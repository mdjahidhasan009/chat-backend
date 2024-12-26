"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageStorageService = void 0;
const helpers_1 = require("./../utils/helpers");
const constants_1 = require("./../utils/constants");
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
let ImageStorageService = class ImageStorageService {
    constructor(spacesClient) {
        this.spacesClient = spacesClient;
    }
    upload(params) {
        return this.spacesClient.putObject({
            Bucket: 'chuachat',
            Key: params.key,
            Body: params.file.buffer,
            ACL: 'public-read',
            ContentType: params.file.mimetype,
        });
    }
    async uploadMessageAttachment(params) {
        this.spacesClient.putObject({
            Bucket: 'chuachat',
            Key: `original/${params.messageAttachment.key}`,
            Body: params.file.buffer,
            ACL: 'public-read',
            ContentType: params.file.mimetype,
        });
        await this.spacesClient.putObject({
            Bucket: 'chuachat',
            Key: `preview/${params.messageAttachment.key}`,
            Body: await (0, helpers_1.compressImage)(params.file),
            ACL: 'public-read',
            ContentType: params.file.mimetype,
        });
        return params.messageAttachment;
    }
    async uploadGroupMessageAttachment(params) {
        this.spacesClient.putObject({
            Bucket: 'chuachat',
            Key: `original/${params.messageAttachment.key}`,
            Body: params.file.buffer,
            ACL: 'public-read',
            ContentType: params.file.mimetype,
        });
        await this.spacesClient.putObject({
            Bucket: 'chuachat',
            Key: `preview/${params.messageAttachment.key}`,
            Body: await (0, helpers_1.compressImage)(params.file),
            ACL: 'public-read',
            ContentType: params.file.mimetype,
        });
        return params.messageAttachment;
    }
};
ImageStorageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.Services.SPACES_CLIENT)),
    __metadata("design:paramtypes", [client_s3_1.S3])
], ImageStorageService);
exports.ImageStorageService = ImageStorageService;
//# sourceMappingURL=image-storage.service.js.map