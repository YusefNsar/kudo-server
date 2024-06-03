import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity, MonthlyScoresEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class MonthlyScoresService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(MonthlyScoresEntity)
    private monthlyScoresRepository: Repository<MonthlyScoresEntity>,
  ) {}

  async updateMonthlyScore(employeeId: number, newScore: number) {
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth());

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    let ms = await this.monthlyScoresRepository.findOne({
      where: { month: currentMonth, employee: employee },
    });

    if (ms) {
      await this.monthlyScoresRepository.update(ms.id, {
        score: newScore + ms.score,
      });

      return;
    }

    ms = this.monthlyScoresRepository.create({
      month: currentMonth,
      score: newScore,
      employee: employee,
    });

    await this.monthlyScoresRepository.save(ms);
  }
}
