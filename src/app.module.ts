import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FfModule } from './ff/ff.module';

@Module({
  imports: [FfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
