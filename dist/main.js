"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_typeorm_1 = require("connect-typeorm");
const typeorm_1 = require("./utils/typeorm");
const typeorm_2 = require("typeorm");
const getway_adapter_1 = require("./gateway/getway.adapter");
async function bootstrap() {
    const { PORT, COOKIE_SECRET } = process.env;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const sessionRepository = (0, typeorm_2.getRepository)(typeorm_1.Session);
    const adapter = new getway_adapter_1.WebsocketAdapter(app);
    app.useWebSocketAdapter(adapter);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: [
            'http://localhost:3000',
            `${process.env.FRONTEND_URL}`,
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.set('trust proxy', 'loopback');
    app.use((0, express_session_1.default)({
        secret: COOKIE_SECRET,
        saveUninitialized: false,
        resave: false,
        name: 'CHAT_APP_SESSION_ID',
        cookie: {
            maxAge: 86400000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        },
        store: new connect_typeorm_1.TypeormStore().connect(sessionRepository),
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    try {
        await app.listen(PORT, () => {
            console.log(`Running on Port ${PORT}`);
            console.log(`Running in ${process.env.ENVIRONMENT} mode: ${process.env.ENVIRONMENT_MESSAGE}`);
        });
    }
    catch (err) {
        console.error(err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map