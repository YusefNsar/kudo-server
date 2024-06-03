import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendKudoDto {
  @IsString()
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsOptional()
  from: string;
}
