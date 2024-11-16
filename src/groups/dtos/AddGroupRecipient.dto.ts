import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddGroupRecipientDto {
  @IsNotEmpty()
  username: string;
}
