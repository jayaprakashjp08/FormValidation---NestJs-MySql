import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './config/database.module';
import { Users } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), DatabaseModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
