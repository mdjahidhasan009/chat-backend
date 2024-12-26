"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExists = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExists extends common_1.HttpException {
    constructor() {
        super('User already exists', common_1.HttpStatus.CONFLICT);
    }
}
exports.UserAlreadyExists = UserAlreadyExists;
//# sourceMappingURL=UserAlreadyExists.js.map