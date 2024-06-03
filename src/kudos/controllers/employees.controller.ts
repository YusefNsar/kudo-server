import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdateEmployeeDto } from '../dto/updateEmployee.dto';
import { EmployeeService } from '../services/employee.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('')
  async updateEmployee(@Body() body: UpdateEmployeeDto, @Request() req) {
    const employee = await this.employeeService.updateEmployee(
      req.user.employee.id,
      body,
    );

    return { employee };
  }
}
