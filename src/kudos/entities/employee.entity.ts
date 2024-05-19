import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MonthlyScoresEntity } from './monthly-score.entity';

@Entity({ name: 'EMPLOYEES' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  role: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  department: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastOtp: string;

  @Column({ type: 'bit', default: 0 })
  blocked: number;

  @OneToMany(() => MonthlyScoresEntity, (monthlyScore) => monthlyScore.employee)
  monthlyScores: MonthlyScoresEntity[];
}
