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
exports.MessageAttachmentsService = void 0;
const constants_1 = require("./../utils/constants");
const MessageAttachment_1 = require("./../utils/typeorm/entities/MessageAttachment");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("../utils/typeorm");
let MessageAttachmentsService = class MessageAttachmentsService {
    constructor(attachmentRepository, groupAttachmentRepository, imageUploadService) {
        this.attachmentRepository = attachmentRepository;
        this.groupAttachmentRepository = groupAttachmentRepository;
        this.imageUploadService = imageUploadService;
    }
    create(attachments) {
        const promise = attachments.map((attachments) => {
            const newAttachment = this.attachmentRepository.create();
            return this.attachmentRepository
                .save(newAttachment)
                .then((messageAttachment) => this.imageUploadService.uploadMessageAttachment({
                messageAttachment,
                file: attachments,
            }));
        });
        return Promise.all(promise);
    }
    createGroupAttachments(attachments) {
        const promise = attachments.map((attachment) => {
            const newAttachment = this.groupAttachmentRepository.create();
            return this.groupAttachmentRepository
                .save(newAttachment)
                .then((messageAttachment) => this.imageUploadService.uploadGroupMessageAttachment({
                messageAttachment,
                file: attachment
            }));
        });
        return Promise.all(promise);
    }
    deleteAllAttachments(attachments) {
        const promise = attachments.map((attachment) => this.attachmentRepository.delete(attachment.key));
        return Promise.all(promise);
    }
};
MessageAttachmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(MessageAttachment_1.MessageAttachment)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.GroupMessageAttachment)),
    __param(2, (0, common_1.Inject)(constants_1.Services.IMAGE_UPLOAD_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], MessageAttachmentsService);
exports.MessageAttachmentsService = MessageAttachmentsService;
//# sourceMappingURL=message-attachments.service.js.map