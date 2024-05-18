import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'KUDOS' })
export class KudoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  from: string;

  @Column({ type: 'varchar', length: 255 })
  to: string;

  @Column({ type: 'varchar' })
  reason: string;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
