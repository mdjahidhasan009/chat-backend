"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyMessageException = void 0;
const common_1 = require("@nestjs/common");
class EmptyMessageException extends common_1.HttpException {
    constructor() {
        super('Message must contain content or at least 1 attachment', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.EmptyMessageException = EmptyMessageException;
//# sourceMappingURL=EmptyMessage.js.map