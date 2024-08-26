import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './services.entity';
import { ServicesService } from './services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
<<<<<<< HEAD
export class ServicesModule {}
=======
export class ServicesModule {}
>>>>>>> 5f782a3549ce3ef059f1b60b3dc39f00024feebb
