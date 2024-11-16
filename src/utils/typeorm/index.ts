import { Friend } from './entities/Friend';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { Group } from './entities/Group';
import { GroupMessage } from './entities/GroupMessage';
import { FriendRequest } from './entities/FriendRequest';
import { Profile } from './entities/Profile';
import { MessageAttachment } from './entities/MessageAttachment';
import { GroupMessageAttachment } from './entities/GroupMessageAttachment';
import { UserPresence } from './entities/UserPresence';
import { Peer } from './entities/Peer';

const entities = [
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  Friend,
  FriendRequest,
  Profile,
  MessageAttachment,
  GroupMessageAttachment,
  UserPresence,
  Peer,
];

export default entities;

export {
  User,
  Session,
  Conversation,
  Message,
  Group,
  GroupMessage,
  Friend,
  FriendRequest,
  Profile,
  MessageAttachment,
  GroupMessageAttachment,
  UserPresence,
  Peer,
};
////TODO: Have to upgrade to datasource means latest version
