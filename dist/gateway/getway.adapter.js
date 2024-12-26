"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("../utils/typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_1 = __importDefault(require("cookie"));
const class_transformer_1 = require("class-transformer");
class WebsocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const sessionRepository = (0, typeorm_1.getRepository)(typeorm_2.Session);
        const server = super.createIOServer(port, options);
        server.use(async (socket, next) => {
            const { cookie: clientCookie } = socket.handshake.headers;
            if (!clientCookie) {
                return next(new Error('Not Authenticated. No cookies were sent'));
            }
            const { CHAT_APP_SESSION_ID } = cookie_1.default.parse(clientCookie);
            if (!CHAT_APP_SESSION_ID) {
                return next(new Error('Not Authenticated.'));
            }
            const signedCookie = cookie_parser_1.default.signedCookie(CHAT_APP_SESSION_ID, process.env.COOKIE_SECRET);
            if (!signedCookie) {
                return next(new Error('Error signing cookie'));
            }
            const sessionDB = await sessionRepository.findOne({ id: signedCookie });
            if (!sessionDB)
                return next(new Error('No session found'));
            const userFromJson = JSON.parse(sessionDB.json);
            if (!userFromJson.passport || !userFromJson.passport.user)
                return next(new Error('Passport or User object does not exist.'));
            const userDB = (0, class_transformer_1.plainToInstance)(typeorm_2.User, JSON.parse(sessionDB.json).passport.user);
            socket.user = userDB;
            next();
        });
        return server;
    }
}
exports.WebsocketAdapter = WebsocketAdapter;
//# sourceMappingURL=getway.adapter.js.map