"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationExistsException = void 0;
const common_1 = require("@nestjs/common");
class ConversationExistsException extends common_1.HttpException {
    constructor() {
        super('Conversation Already Exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.ConversationExistsException = ConversationExistsException;
//# sourceMappingURL=ConversationExists.js.map