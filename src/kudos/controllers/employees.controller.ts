import { UpdateMyEmployeeDto } from '../dto/updateMyEmployee.dto';
import { EmployeeService } from '../services/employee.service';
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
}
