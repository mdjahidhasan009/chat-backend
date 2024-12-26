"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConversationException = void 0;
const common_1 = require("@nestjs/common");
class CreateConversationException extends common_1.HttpException {
    constructor(msg) {
        const defaultMessage = 'Create Conversation Exception';
        super(msg ? defaultMessage.concat(`:${msg}`) : defaultMessage, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.CreateConversationException = CreateConversationException;
//# sourceMappingURL=CreateConversation.js.map