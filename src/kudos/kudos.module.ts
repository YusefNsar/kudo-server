import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity, KudoEntity, MonthlyScoresEntity } from './entities';
import { EmployeesController } from './controllers/employees.controller';

@Module({
  controllers: [EmployeesController],
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, KudoEntity, MonthlyScoresEntity]),
  ],
  providers: [EmployeeService],
  exports: [EmployeeService, TypeOrmModule],
})
export class KudosModule {}
