import { RegisteredUserDto } from './registered-user.dto';

export class LoginedUserDto extends RegisteredUserDto {
  token: string;
}
