import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity, KudoEntity, MonthlyScoresEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, KudoEntity, MonthlyScoresEntity]),
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class KudosModule {}
