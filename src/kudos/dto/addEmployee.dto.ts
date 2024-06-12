import { IsEmail } from 'class-validator';
import { UpdateEmployeeDto } from './updateEmployee.dto';

export class AddEmployeeDto extends UpdateEmployeeDto {
  @IsEmail()
  email: string;
}
