"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class FriendRequestNotFoundException extends common_1.HttpException {
    constructor() {
        super('Friend Request not found', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.FriendRequestNotFoundException = FriendRequestNotFoundException;
//# sourceMappingURL=FriendRequestNotFound.js.map