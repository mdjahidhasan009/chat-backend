import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
