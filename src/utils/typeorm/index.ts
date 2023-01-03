import { User } from './entries/User';
import { Session } from './entries/Session';
import { Conversation } from './entries/Conversation';
import { Participant } from './entries/Participant';

const entities = [User, Session, Conversation, Participant];

export default entities;

export { User, Session, Conversation, Participant };
////TODO: Have to upgrade to datasource means latest version
