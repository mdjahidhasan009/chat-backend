"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const message_attachments_module_1 = require("./../message-attachments/message-attachments.module");
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const group_service_1 = require("./services/group.service");
const group_controller_1 = require("./controllers/group.controller");
const users_module_1 = require("../users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../utils/typeorm");
const group_message_controller_1 = require("./controllers/group-message.controller");
const image_storage_module_1 = require("../image-storage/image-storage.module");
const group_message_service_1 = require("./services/group-message.service");
const group_recipients_controller_1 = require("./controllers/group-recipients.controller");
const group_recipient_service_1 = require("./services/group-recipient.service");
const helpers_1 = require("../utils/helpers");
const group_middleware_1 = require("./middlewares/group.middleware");
let GroupModule = class GroupModule {
    configure(consumer) {
        consumer.apply(helpers_1.isAuthorized, group_middleware_1.GroupMiddleware).forRoutes('groups/:id');
    }
};
GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            message_attachments_module_1.MessageAttachmentsModule,
            image_storage_module_1.ImageStorageModule,
            typeorm_1.TypeOrmModule.forFeature([typeorm_2.Group, typeorm_2.GroupMessage]),
        ],
        controllers: [
            group_controller_1.GroupController,
            group_message_controller_1.GroupMessageController,
            group_recipients_controller_1.GroupRecipientsController,
        ],
        providers: [
            {
                provide: constants_1.Services.GROUPS,
                useClass: group_service_1.GroupService,
            },
            {
                provide: constants_1.Services.GROUP_MESSAGES,
                useClass: group_message_service_1.GroupMessageService,
            },
            {
                provide: constants_1.Services.GROUP_RECIPIENTS,
                useClass: group_recipient_service_1.GroupRecipientService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.GROUPS,
                useClass: group_service_1.GroupService,
            },
        ],
    })
], GroupModule);
exports.GroupModule = GroupModule;
//# sourceMappingURL=group.module.js.map