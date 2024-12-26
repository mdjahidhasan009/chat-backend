"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class GroupNotFoundException extends common_1.HttpException {
    constructor() {
        super('Group Not Found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.GroupNotFoundException = GroupNotFoundException;
//# sourceMappingURL=GroupNotFound.js.map