import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateFriendDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}