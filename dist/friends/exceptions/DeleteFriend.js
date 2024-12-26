"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFriendException = void 0;
const common_1 = require("@nestjs/common");
class DeleteFriendException extends common_1.HttpException {
    constructor() {
        super('Cannot Delete Friend', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.DeleteFriendException = DeleteFriendException;
//# sourceMappingURL=DeleteFriend.js.map