"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImage = exports.generateUUIDV4 = exports.isAuthorized = exports.compareHash = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
async function hashPassword(rawPassword) {
    const salt = await bcrypt_1.default.genSalt();
    return bcrypt_1.default.hash(rawPassword, salt);
}
exports.hashPassword = hashPassword;
async function compareHash(rawPassword, hashedPassword) {
    return bcrypt_1.default.compare(rawPassword, hashedPassword);
}
exports.compareHash = compareHash;
function isAuthorized(req, res, next) {
    if (req.user)
        next();
    else
        throw new common_1.HttpException('Forbidden', common_1.HttpStatus.UNAUTHORIZED);
}
exports.isAuthorized = isAuthorized;
const generateUUIDV4 = () => (0, uuid_1.v4)();
exports.generateUUIDV4 = generateUUIDV4;
const compressImage = (attachment) => (0, sharp_1.default)(attachment.buffer).resize(300).jpeg().toBuffer();
exports.compressImage = compressImage;
//# sourceMappingURL=helpers.js.map