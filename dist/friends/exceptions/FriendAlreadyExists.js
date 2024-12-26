"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendAlreadyExists = void 0;
const common_1 = require("@nestjs/common");
class FriendAlreadyExists extends common_1.HttpException {
    constructor() {
        super('Friend Already Exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.FriendAlreadyExists = FriendAlreadyExists;
//# sourceMappingURL=FriendAlreadyExists.js.map