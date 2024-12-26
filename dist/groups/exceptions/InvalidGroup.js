"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidGroupException = void 0;
const common_1 = require("@nestjs/common");
class InvalidGroupException extends common_1.HttpException {
    constructor() {
        super('Invalid group', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidGroupException = InvalidGroupException;
//# sourceMappingURL=InvalidGroup.js.map