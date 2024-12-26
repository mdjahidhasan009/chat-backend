"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageStorageModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const client_s3_1 = require("@aws-sdk/client-s3");
const image_storage_service_1 = require("./image-storage.service");
let ImageStorageModule = class ImageStorageModule {
};
ImageStorageModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: constants_1.Services.SPACES_CLIENT,
                useValue: new client_s3_1.S3({
                    credentials: {
                        accessKeyId: process.env.SPACES_KEY,
                        secretAccessKey: process.env.SPACES_SECRET_KEY,
                    },
                    endpoint: 'https://ams3.digitaloceanspaces.com',
                    region: 'ams3',
                }),
            },
            {
                provide: constants_1.Services.IMAGE_UPLOAD_SERVICE,
                useClass: image_storage_service_1.ImageStorageService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.SPACES_CLIENT,
                useValue: new client_s3_1.S3({
                    credentials: {
                        accessKeyId: process.env.SPACES_KEY,
                        secretAccessKey: process.env.SPACES_SECRET_KEY,
                    },
                    endpoint: 'https://ams3.digitaloceanspaces.com',
                    region: 'ams3',
                }),
            },
            {
                provide: constants_1.Services.IMAGE_UPLOAD_SERVICE,
                useClass: image_storage_service_1.ImageStorageService,
            },
        ],
    })
], ImageStorageModule);
exports.ImageStorageModule = ImageStorageModule;
//# sourceMappingURL=image-storage.module.js.map