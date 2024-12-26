"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestPending = void 0;
const common_1 = require("@nestjs/common");
class FriendRequestPending extends common_1.HttpException {
    constructor() {
        super('Friend request pending', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.FriendRequestPending = FriendRequestPending;
//# sourceMappingURL=FriendRequestPending.js.map