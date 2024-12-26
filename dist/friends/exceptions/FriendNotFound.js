"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class FriendNotFoundException extends common_1.HttpException {
    constructor() {
        super('Friend Not Found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.FriendNotFoundException = FriendNotFoundException;
//# sourceMappingURL=FriendNotFound.js.map