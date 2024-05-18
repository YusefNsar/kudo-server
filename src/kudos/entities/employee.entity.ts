import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'timestamp', nullable: true })
  lastOtp: Date;

  @Column({ type: 'bit', default: 0 })
  blocked: number;
}
