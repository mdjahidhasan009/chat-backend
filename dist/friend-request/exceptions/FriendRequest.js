"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestException = void 0;
const common_1 = require("@nestjs/common");
class FriendRequestException extends common_1.HttpException {
    constructor(msg) {
        const defaultMessage = 'Friend Request Exception';
        const error = msg ? defaultMessage.concat(': ', msg) : defaultMessage;
        super(error, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.FriendRequestException = FriendRequestException;
//# sourceMappingURL=FriendRequest.js.map