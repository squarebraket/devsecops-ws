import { Module } from '@nestjs/common';
import { FrequentFlyerController } from './ff.controller';
import { FrequentFlyerService } from './ff.service';
import { ReposModule } from '../common/repos/repos.module';

@Module({
  imports: [ReposModule],
  controllers: [FrequentFlyerController],
  providers: [FrequentFlyerService],
})
export class FfModule {}
