import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';
import { departments, roles } from '../../static';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(departments)
  department: string;

  @IsOptional()
  @IsString()
  @IsIn(roles)
  role: string;
}