"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupParticipantNotFound = void 0;
const common_1 = require("@nestjs/common");
class GroupParticipantNotFound extends common_1.HttpException {
    constructor() {
        super('Group Participant Not Found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.GroupParticipantNotFound = GroupParticipantNotFound;
//# sourceMappingURL=GroupParticipantNotFound.js.map