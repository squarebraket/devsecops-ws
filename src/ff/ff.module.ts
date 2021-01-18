import { Module } from '@nestjs/common';
import { FrequentFlyerController } from './ff.controller';
import { FrequentFlyerService } from './ff.service';

@Module({
  controllers: [FrequentFlyerController],
  providers: [FrequentFlyerService],
})
export class FfModule {}
