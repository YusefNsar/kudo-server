import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async saveOtp(email: string, otp: string) {
    const employee = await this.getEmployeeByEmail(email);

    if (!employee) {
      const employee = this.employeeRepository.create({
        email,
        lastOtp: otp,
      });

      await this.employeeRepository.save(employee);
    }

    await this.employeeRepository.update({ email }, { lastOtp: otp });
  }

  async getOtp(email: string) {
    const employee = await this.getEmployeeByEmail(email);

    return employee.lastOtp;
  }

  async getEmployeeByEmail(email: string) {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });

    return employee;
  }
}
