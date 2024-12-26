"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAttachmentsModule = void 0;
const message_attachments_service_1 = require("./message-attachments.service");
const constants_1 = require("./../utils/constants");
const image_storage_module_1 = require("./../image-storage/image-storage.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../utils/typeorm");
let MessageAttachmentsModule = class MessageAttachmentsModule {
};
MessageAttachmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([typeorm_2.MessageAttachment, typeorm_2.GroupMessageAttachment]), image_storage_module_1.ImageStorageModule],
        providers: [
            {
                provide: constants_1.Services.MESSAGE_ATTACHMENTS,
                useClass: message_attachments_service_1.MessageAttachmentsService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.MESSAGE_ATTACHMENTS,
                useClass: message_attachments_service_1.MessageAttachmentsService,
            },
        ],
    })
], MessageAttachmentsModule);
exports.MessageAttachmentsModule = MessageAttachmentsModule;
//# sourceMappingURL=message-attachments.module.js.map