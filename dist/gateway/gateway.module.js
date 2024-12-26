"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const conversations_module_1 = require("../conversations/conversations.module");
const friends_module_1 = require("../friends/friends.module");
const group_module_1 = require("../groups/group.module");
const constants_1 = require("../utils/constants");
const gateway_1 = require("./gateway");
const gateway_session_1 = require("./gateway.session");
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [conversations_module_1.ConversationsModule, group_module_1.GroupModule, friends_module_1.FriendsModule],
        providers: [
            gateway_1.MessagingGateway,
            {
                provide: constants_1.Services.GATEWAY_SESSION_MANAGER,
                useClass: gateway_session_1.GatewaySessionManager,
            },
        ],
        exports: [
            gateway_1.MessagingGateway,
            {
                provide: constants_1.Services.GATEWAY_SESSION_MANAGER,
                useClass: gateway_session_1.GatewaySessionManager,
            },
        ],
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map