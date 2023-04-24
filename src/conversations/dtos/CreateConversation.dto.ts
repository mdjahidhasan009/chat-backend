import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
