import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'MONTHLY_SCORES' })
export class MonthlyScoresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmployeeEntity, { eager: true })
  employee: EmployeeEntity;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'date' })
  month: Date;
}
