"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peer = exports.UserPresence = exports.GroupMessageAttachment = exports.MessageAttachment = exports.Profile = exports.FriendRequest = exports.Friend = exports.GroupMessage = exports.Group = exports.Message = exports.Conversation = exports.Session = exports.User = void 0;
const Friend_1 = require("./entities/Friend");
Object.defineProperty(exports, "Friend", { enumerable: true, get: function () { return Friend_1.Friend; } });
const User_1 = require("./entities/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Session_1 = require("./entities/Session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return Session_1.Session; } });
const Conversation_1 = require("./entities/Conversation");
Object.defineProperty(exports, "Conversation", { enumerable: true, get: function () { return Conversation_1.Conversation; } });
const Message_1 = require("./entities/Message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return Message_1.Message; } });
const Group_1 = require("./entities/Group");
Object.defineProperty(exports, "Group", { enumerable: true, get: function () { return Group_1.Group; } });
const GroupMessage_1 = require("./entities/GroupMessage");
Object.defineProperty(exports, "GroupMessage", { enumerable: true, get: function () { return GroupMessage_1.GroupMessage; } });
const FriendRequest_1 = require("./entities/FriendRequest");
Object.defineProperty(exports, "FriendRequest", { enumerable: true, get: function () { return FriendRequest_1.FriendRequest; } });
const Profile_1 = require("./entities/Profile");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return Profile_1.Profile; } });
const MessageAttachment_1 = require("./entities/MessageAttachment");
Object.defineProperty(exports, "MessageAttachment", { enumerable: true, get: function () { return MessageAttachment_1.MessageAttachment; } });
const GroupMessageAttachment_1 = require("./entities/GroupMessageAttachment");
Object.defineProperty(exports, "GroupMessageAttachment", { enumerable: true, get: function () { return GroupMessageAttachment_1.GroupMessageAttachment; } });
const UserPresence_1 = require("./entities/UserPresence");
Object.defineProperty(exports, "UserPresence", { enumerable: true, get: function () { return UserPresence_1.UserPresence; } });
const Peer_1 = require("./entities/Peer");
Object.defineProperty(exports, "Peer", { enumerable: true, get: function () { return Peer_1.Peer; } });
const entities = [
    User_1.User,
    Session_1.Session,
    Conversation_1.Conversation,
    Message_1.Message,
    Group_1.Group,
    GroupMessage_1.GroupMessage,
    Friend_1.Friend,
    FriendRequest_1.FriendRequest,
    Profile_1.Profile,
    MessageAttachment_1.MessageAttachment,
    GroupMessageAttachment_1.GroupMessageAttachment,
    UserPresence_1.UserPresence,
    Peer_1.Peer,
];
exports.default = entities;
//# sourceMappingURL=index.js.map