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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const Conversation_1 = require("./Conversation");
const BaseMessage_1 = require("./BaseMessage");
const MessageAttachment_1 = require("./MessageAttachment");
let Message = class Message extends BaseMessage_1.BaseMessage {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Conversation_1.Conversation, (conversation) => conversation.messages),
    __metadata("design:type", Conversation_1.Conversation)
], Message.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MessageAttachment_1.MessageAttachment, (attachment) => attachment.message),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Message.prototype, "attachments", void 0);
Message = __decorate([
    (0, typeorm_1.Entity)({ name: 'messages' })
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map