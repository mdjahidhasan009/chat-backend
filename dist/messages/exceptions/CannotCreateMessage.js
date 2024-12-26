"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotCreateMessageException = void 0;
const common_1 = require("@nestjs/common");
class CannotCreateMessageException extends common_1.HttpException {
    constructor() {
        super('Cannot Create Message', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.CannotCreateMessageException = CannotCreateMessageException;
//# sourceMappingURL=CannotCreateMessage.js.map