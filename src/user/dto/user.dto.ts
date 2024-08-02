import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
