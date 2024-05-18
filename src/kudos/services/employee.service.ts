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
    // get emp from email
    const employee = await this.getEmployeeByEmail(email);

    // if employee not found create it
    if (!employee) {
      const employee = this.employeeRepository.create({
        email,
      });

      await this.employeeRepository.save(employee);
    }

    // save otp
    await this.employeeRepository.update({ email }, { lastOtp: otp });
  }

  async getEmployeeByEmail(email: string) {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });

    return employee;
  }
}
