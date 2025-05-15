import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { GoalsModule } from './goals/goals.module';
import { HistoryModule } from './history/history.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
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
    }),
    ProjectsModule,
    SkillsModule,
    GoalsModule,
    HistoryModule,
    CoursesModule,
  ],
})
export class AppModule {}
