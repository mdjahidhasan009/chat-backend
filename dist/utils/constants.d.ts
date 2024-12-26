import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
export declare enum Routes {
    AUTH = "auth",
    USERS = "users",
    USERS_PROFILES = "users/profiles",
    CONVERSATIONS = "conversations",
    MESSAGES = "conversations/:id/messages",
    GROUPS = "groups",
    GROUP_MESSAGES = "groups/:id/messages",
    GROUP_RECIPIENTS = "groups/:id/recipients",
    FRIENDS = "friends",
    FRIEND_REQUESTS = "friends/requests",
    EXISTS = "exists",
    USER_PRESENCE = "users/presence"
}
export declare enum Services {
    AUTH = "AUTH_SERVICE",
    USERS = "USERS_SERVICE",
    USERS_PROFILES = "USERS_PROFILES_SERVICE",
    CONVERSATIONS = "CONVERSATIONS_SERVICE",
    MESSAGES = "MESSAGE_SERVICE",
    GATEWAY_SESSION_MANAGER = "GATEWAY_SESSION_MANAGER",
    GROUPS = "GROUPS_SERVICE",
    GROUP_MESSAGES = "GROUP_MESSAGES_SERVICE",
    GROUP_RECIPIENTS = "GROUP_RECIPIENTS_SERVICE",
    FRIENDS_SERVICE = "FRIENDS_SERVICE",
    FRIENDS_REQUESTS_SERVICE = "FRIEND_REQUEST_SERVICE",
    SPACES_CLIENT = "SPACES_CLIENT",
    IMAGE_UPLOAD_SERVICE = "IMAGE_UPLOAD_SERVICE",
    MESSAGE_ATTACHMENTS = "MESSAGE_ATTACHMENTS_SERVICE",
    USER_PRESENCE = "USER_PRESENCE_SERVICE"
}
export declare enum ServerEvents {
    FRIEND_REQUEST_ACCEPTED = "friendrequest.accepted",
    FRIEND_REQUEST_REJECTED = "friendrequest.rejected",
    FRIEND_REQUEST_CANCELLED = "friendrequest.cancelled",
    FRIEND_REMOVED = "friend.removed"
}
export declare enum WebsocketEvents {
    FRIEND_REQUEST_ACCEPTED = "onFriendRequestAccepted",
    FRIEND_REQUEST_REJECTED = "onFriendRequestRejected",
    VIDEO_CALL_REJECTED = "onVideoCallRejected",
    VOICE_CALL_ACCEPTED = "onVoiceCallAccepted",
    VOICE_CALL_HANG_UP = "onVoiceCallHangUp",
    VOICE_CALL_REJECTED = "onVoiceCallRejected"
}
export declare const UserProfileFileFields: MulterField[];
