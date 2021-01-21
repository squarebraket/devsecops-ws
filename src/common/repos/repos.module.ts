import { Module } from '@nestjs/common';
import { MemberRepository } from './member';

@Module({
  imports: [],
  controllers: [],
  providers: [MemberRepository],
  exports: [MemberRepository],
})
export class ReposModule {}
