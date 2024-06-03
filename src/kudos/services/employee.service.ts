import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../entities';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from '../dto/updateEmployee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async saveOtp(email: string, otp: string) {
    const employee = await this.getEmployeeByEmail(email);

    if (!employee) {
      await this.createEmployee(email);
    }

    await this.employeeRepository.update({ email }, { lastOtp: otp });
  }

  async getOtp(email: string) {
    const employee = await this.getEmployeeByEmail(email);

    return employee.lastOtp;
  }

  async createEmployee(email: string) {
    const employee = this.employeeRepository.create({
      email,
    });

    return this.employeeRepository.save(employee);
  }

  async getEmployeeByEmail(email: string, shouldExists: boolean = false) {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });

    if (!employee && shouldExists) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    return employee;
  }

  async updateEmployee(
    employeeId: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const isEmptyUpdateObject = Object.keys(updateEmployeeDto).length === 0;
    if (isEmptyUpdateObject) {
      throw new HttpException('Update object is empty', HttpStatus.BAD_REQUEST);
    }

    await this.employeeRepository.update(employeeId, updateEmployeeDto);

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    return employee;
  }
}
