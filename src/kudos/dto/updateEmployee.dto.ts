import {
  IsOptional,
  IsBoolean,
  IsNumberString,
  IsNotEmpty,
} from 'class-validator';
import { UpdateMyEmployeeDto } from './updateMyEmployee.dto';

export class UpdateEmployeeDto extends UpdateMyEmployeeDto {
  @IsOptional()
  @IsBoolean()
  blocked: boolean;
}

export class UpdateEmployeeParamsDto {
  @IsNumberString()
  @IsNotEmpty()
  employeeId: string;
}
