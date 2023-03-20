import { Friend } from './entities/Friend';
import { User } from './entities/User';
import { Session } from './entities/Session';
import { Conversation } from './entities/Conversation';
import { Message } from './entities/Message';
import { Group } from './entities/Group';
import { GroupMessage } from './entities/GroupMessage';

const entities = [
  User, 
  Session, 
  Conversation, 
  Message, 
  Group, 
  GroupMessage,
  Friend
];

export default entities;

export { User, Session, Conversation, Message, Group, GroupMessage, Friend };
////TODO: Have to upgrade to datasource means latest version
