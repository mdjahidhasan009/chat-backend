import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateFriendDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;
}