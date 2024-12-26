"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidConversationIdException = void 0;
const common_1 = require("@nestjs/common");
class InvalidConversationIdException extends common_1.HttpException {
    constructor() {
        super('Invalid Conversation Id', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidConversationIdException = InvalidConversationIdException;
//# sourceMappingURL=InvalidConversationId.js.map