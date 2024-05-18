import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  EmployeeEntity,
  KudoEntity,
  MonthlyScoresEntity,
} from '../kudos/entities';
// import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mssql',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          entities: [EmployeeEntity, KudoEntity, MonthlyScoresEntity],
          options: {
            trustServerCertificate: true,
          },
          logging: true,
          // migrations: [join(__dirname, './_migrations/**/*{.ts,.js}')],
          // migrationsRun: true,
          // migrationsTableName: 'typeorm_migration',
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
