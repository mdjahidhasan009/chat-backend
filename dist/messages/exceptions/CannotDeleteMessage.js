"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotDeleteMessage = void 0;
const common_1 = require("@nestjs/common");
class CannotDeleteMessage extends common_1.HttpException {
    constructor() {
        super('Cannot Delete Message', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.CannotDeleteMessage = CannotDeleteMessage;
//# sourceMappingURL=CannotDeleteMessage.js.map