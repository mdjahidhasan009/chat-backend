"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFindMessageParams = void 0;
const buildFindMessageParams = (params) => ({
    id: params.messageId,
    author: { id: params.userId },
    conversation: { id: params.conversationId },
});
exports.buildFindMessageParams = buildFindMessageParams;
//# sourceMappingURL=builders.js.map