"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ConversationNotFoundException extends common_1.HttpException {
    constructor() {
        super('Conversation not found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ConversationNotFoundException = ConversationNotFoundException;
//# sourceMappingURL=ConversationNotFound.js.map