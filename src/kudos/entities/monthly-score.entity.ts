import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'MONTHLY_SCORES' })
export class MonthlyScoresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'datetime' })
  month: Date;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.monthlyScores)
  employee: EmployeeEntity;
}
