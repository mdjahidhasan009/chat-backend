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
exports.Group = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const GroupMessage_1 = require("./GroupMessage");
let Group = class Group {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, (user) => user.groups),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Group.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Group.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Group.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GroupMessage_1.GroupMessage, (message) => message.group, {
        cascade: ['insert', 'update', 'remove'],
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Group.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Number)
], Group.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => GroupMessage_1.GroupMessage),
    (0, typeorm_1.JoinColumn)({ name: 'last_message_sent' }),
    __metadata("design:type", GroupMessage_1.GroupMessage)
], Group.prototype, "lastMessageSent", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Group.prototype, "lastMessageSentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "avatar", void 0);
Group = __decorate([
    (0, typeorm_1.Entity)({ name: 'group_conversations' })
], Group);
exports.Group = Group;
//# sourceMappingURL=Group.js.map