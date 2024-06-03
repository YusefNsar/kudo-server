import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity, KudoEntity } from '../entities';
import { Repository } from 'typeorm';
import { SendKudoDto } from '../dto/send-kudo.dto';
import { EmployeeService } from './employee.service';
import { scoresMap } from '../../constants';
import { MonthlyScoresService } from './monthly-scores.service';

@Injectable()
export class KudoService {
  constructor(
    @InjectRepository(KudoEntity)
    private kudoRepository: Repository<KudoEntity>,
    private employeeService: EmployeeService,
    private monthlyScoresService: MonthlyScoresService,
  ) {}

  async sendKudo(sendKudoDto: SendKudoDto) {
    const { from, to, reason } = sendKudoDto;

    const [fromEmployee, toEmployee] = await this.getFromAndToEmployees(
      from,
      to,
    );

    await this.isThisKudoValid(fromEmployee, toEmployee);

    const kudo = await this.saveKudo(fromEmployee, toEmployee, reason);

    await this.monthlyScoresService.updateMonthlyScore(
      toEmployee.id,
      kudo.score,
    );

    return kudo;
  }

  async saveKudo(
    fromEmployee: EmployeeEntity,
    toEmployee: EmployeeEntity,
    reason: string,
  ) {
    const score = scoresMap[fromEmployee.role];

    let kudo = await this.kudoRepository.create({
      from: fromEmployee.email,
      to: toEmployee.email,
      reason,
      score,
    });
    kudo = await this.kudoRepository.save(kudo);

    return kudo;
  }

  private async getFromAndToEmployees(from: string, to: string) {
    const fromEmployee = await this.employeeService.getEmployeeByEmail(
      from,
      true,
    );
    let toEmployee = await this.employeeService.getEmployeeByEmail(to);
    if (!toEmployee) {
      toEmployee = await this.employeeService.createEmployee(to);
    }

    return [fromEmployee, toEmployee];
  }

  private async isThisKudoValid(
    fromEmployee: EmployeeEntity,
    toEmployee: EmployeeEntity,
  ) {
    this.checkItIsNotSameEmployee(fromEmployee.email, toEmployee.email);
    await this.checkEmployeeIsNotBlocked(fromEmployee);
    await this.checkThereIsNoRecentKudos(fromEmployee.email, toEmployee.email);
  }

  private async checkEmployeeIsNotBlocked(employee: EmployeeEntity) {
    if (employee?.blocked) {
      throw new HttpException('Employee is blocked', HttpStatus.BAD_REQUEST);
    }
  }

  private async checkItIsNotSameEmployee(from: string, to: string) {
    if (from === to) {
      throw new HttpException(
        'From and To cannot be the same',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async checkThereIsNoRecentKudos(from: string, to: string) {
    const kudos = await this.getRecentKudosFromTo(from, to);

    if (kudos.length > 0) {
      throw new HttpException(
        'There is a recent kudo already',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // recent kudos from to (this week)
  private async getRecentKudosFromTo(
    from: string,
    to: string,
  ): Promise<KudoEntity[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.kudoRepository
      .createQueryBuilder('kudo')
      .where('kudo.from = :from', { from })
      .andWhere('kudo.to = :to', { to })
      .andWhere('kudo.date >= :date', { date: oneWeekAgo })
      .getMany();
  }
}
