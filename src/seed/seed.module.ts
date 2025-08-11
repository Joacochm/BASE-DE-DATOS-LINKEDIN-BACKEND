import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pai } from 'src/pais/entities/pai.entity';

@Module({
  controllers: [SeedController],
  imports: [TypeOrmModule.forFeature([Pai])],
  providers: [SeedService],
})
export class SeedModule {}
