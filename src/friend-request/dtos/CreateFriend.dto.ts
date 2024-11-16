import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  username: string;
}
