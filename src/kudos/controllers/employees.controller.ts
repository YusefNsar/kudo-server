import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateMyEmployeeDto } from '../dto/updateMyEmployee.dto';
import { EmployeeService } from '../services/employee.service';
import { JwtAdminGuard } from '../../auth/guard/jwt-admin.guard';
import {
  UpdateEmployeeDto,
  UpdateEmployeeParamsDto,
} from '../dto/updateEmployee.dto';
import { AddEmployeeDto } from '../dto/addEmployee.dto';
import { JwtEmployeeGuard } from '../../auth/guard/jwt-employee.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeeService) {}

  @UseGuards(JwtEmployeeGuard)
  @Patch('/')
  async updateMyEmployee(@Body() body: UpdateMyEmployeeDto, @Request() req) {
    const employee = await this.employeeService.updateEmployee(
      req.user.employee.id,
      body,
    );

    return { employee };
  }

  @UseGuards(JwtAdminGuard)
  @Post('/')
  async addEmployee(@Body() body: AddEmployeeDto) {
    const employee = await this.employeeService.createEmployee(body.email, {
      ...body,
      blocked: +body.blocked,
    });

    return { employee };
  }

  @UseGuards(JwtAdminGuard)
  @Patch(':employeeId')
  async updateEmployee(
    @Param() params: UpdateEmployeeParamsDto,
    @Body() body: UpdateEmployeeDto,
  ) {
    const employee = await this.employeeService.updateEmployee(
      parseInt(params.employeeId),
      body,
    );

    return { employee };
  }
}
