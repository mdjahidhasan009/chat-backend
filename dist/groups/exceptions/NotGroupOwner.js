"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotGroupOwnerException = void 0;
const common_1 = require("@nestjs/common");
class NotGroupOwnerException extends common_1.HttpException {
    constructor() {
        super('Not a Group Owner', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.NotGroupOwnerException = NotGroupOwnerException;
//# sourceMappingURL=NotGroupOwner.js.map