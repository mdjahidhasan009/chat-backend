import { Message } from './Message';
import { Group } from './Group';
import { Profile } from './Profile';
import { UserPresence } from './UserPresence';
import { Peer } from './Peer';
export declare class User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    messages: Message[];
    groups: Group[];
    profile: Profile;
    presence: UserPresence;
    peer: Peer;
}
