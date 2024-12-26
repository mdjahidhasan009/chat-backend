"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestAcceptedException = void 0;
const common_1 = require("@nestjs/common");
class FriendRequestAcceptedException extends common_1.HttpException {
    constructor() {
        super('Friend Request Already Accepted', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.FriendRequestAcceptedException = FriendRequestAcceptedException;
//# sourceMappingURL=FriendRequestAccepted.js.map