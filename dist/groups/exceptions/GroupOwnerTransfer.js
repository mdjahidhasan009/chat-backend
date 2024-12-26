"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupOwnerTransferException = void 0;
const common_1 = require("@nestjs/common");
class GroupOwnerTransferException extends common_1.HttpException {
    constructor(msg) {
        const defaultMessage = 'Group Owner Transfer Exception';
        const errorMessage = msg
            ? defaultMessage.concat(': ', msg)
            : defaultMessage;
        super(errorMessage, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.GroupOwnerTransferException = GroupOwnerTransferException;
//# sourceMappingURL=GroupOwnerTransfer.js.map