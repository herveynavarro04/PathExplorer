import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { GoalsModule } from './goals/goals.module';
import { HistoryModule } from './history/history.module';
import { CoursesModule } from './courses/courses.module';
import { CertificatesModule } from './certificates/certificates.module';
import { AgentModule } from './agent/agent.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PeopleLeadModule } from './people-lead/people-lead.module';

@Module({
  imports: [
    AuthModule,
    EmployeeModule,
    TypeOrmModule.forFeature([]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      ssl: true,
    }),

    ProjectsModule,
    SkillsModule,
    GoalsModule,
    HistoryModule,
    CoursesModule,
    CertificatesModule,
    AgentModule,
    FeedbackModule,
    PeopleLeadModule,
  ],
})
export class AppModule {}
