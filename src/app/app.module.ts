import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { GuestsModule } from 'src/guests/guests.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TasksModule, TeachersModule, GuestsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
