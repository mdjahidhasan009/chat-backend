import { User } from "src/utils/typeorm";

export const mockUser = {
  id: 3453635,
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'User',
  password: 'kosafoaifj',
  messages: [],
  groups: []
} as User;

// export const mockUser: User = {
//   id: 3453635,
//   email: 'test@test.com',
//   firstName: 'Test',
//   lastName: 'User',
//   password: 'kosafoaifj',
//   messages: [],
//   groups: []
// }