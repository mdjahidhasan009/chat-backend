"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileFileFields = exports.WebsocketEvents = exports.ServerEvents = exports.Services = exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["AUTH"] = "auth";
    Routes["USERS"] = "users";
    Routes["USERS_PROFILES"] = "users/profiles";
    Routes["CONVERSATIONS"] = "conversations";
    Routes["MESSAGES"] = "conversations/:id/messages";
    Routes["GROUPS"] = "groups";
    Routes["GROUP_MESSAGES"] = "groups/:id/messages";
    Routes["GROUP_RECIPIENTS"] = "groups/:id/recipients";
    Routes["FRIENDS"] = "friends";
    Routes["FRIEND_REQUESTS"] = "friends/requests";
    Routes["EXISTS"] = "exists";
    Routes["USER_PRESENCE"] = "users/presence";
})(Routes = exports.Routes || (exports.Routes = {}));
var Services;
(function (Services) {
    Services["AUTH"] = "AUTH_SERVICE";
    Services["USERS"] = "USERS_SERVICE";
    Services["USERS_PROFILES"] = "USERS_PROFILES_SERVICE";
    Services["CONVERSATIONS"] = "CONVERSATIONS_SERVICE";
    Services["MESSAGES"] = "MESSAGE_SERVICE";
    Services["GATEWAY_SESSION_MANAGER"] = "GATEWAY_SESSION_MANAGER";
    Services["GROUPS"] = "GROUPS_SERVICE";
    Services["GROUP_MESSAGES"] = "GROUP_MESSAGES_SERVICE";
    Services["GROUP_RECIPIENTS"] = "GROUP_RECIPIENTS_SERVICE";
    Services["FRIENDS_SERVICE"] = "FRIENDS_SERVICE";
    Services["FRIENDS_REQUESTS_SERVICE"] = "FRIEND_REQUEST_SERVICE";
    Services["SPACES_CLIENT"] = "SPACES_CLIENT";
    Services["IMAGE_UPLOAD_SERVICE"] = "IMAGE_UPLOAD_SERVICE";
    Services["MESSAGE_ATTACHMENTS"] = "MESSAGE_ATTACHMENTS_SERVICE";
    Services["USER_PRESENCE"] = "USER_PRESENCE_SERVICE";
})(Services = exports.Services || (exports.Services = {}));
var ServerEvents;
(function (ServerEvents) {
    ServerEvents["FRIEND_REQUEST_ACCEPTED"] = "friendrequest.accepted";
    ServerEvents["FRIEND_REQUEST_REJECTED"] = "friendrequest.rejected";
    ServerEvents["FRIEND_REQUEST_CANCELLED"] = "friendrequest.cancelled";
    ServerEvents["FRIEND_REMOVED"] = "friend.removed";
})(ServerEvents = exports.ServerEvents || (exports.ServerEvents = {}));
var WebsocketEvents;
(function (WebsocketEvents) {
    WebsocketEvents["FRIEND_REQUEST_ACCEPTED"] = "onFriendRequestAccepted";
    WebsocketEvents["FRIEND_REQUEST_REJECTED"] = "onFriendRequestRejected";
    WebsocketEvents["VIDEO_CALL_REJECTED"] = "onVideoCallRejected";
    WebsocketEvents["VOICE_CALL_ACCEPTED"] = "onVoiceCallAccepted";
    WebsocketEvents["VOICE_CALL_HANG_UP"] = "onVoiceCallHangUp";
    WebsocketEvents["VOICE_CALL_REJECTED"] = "onVoiceCallRejected";
})(WebsocketEvents = exports.WebsocketEvents || (exports.WebsocketEvents = {}));
exports.UserProfileFileFields = [
    {
        name: 'banner',
        maxCount: 1,
    },
    {
        name: 'avatar',
        maxCount: 1,
    },
];
//# sourceMappingURL=constants.js.map