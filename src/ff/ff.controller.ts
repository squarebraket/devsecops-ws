import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewMemberRequest } from '../interface/new-member-request-interface';
import { FrequentFlyerService } from './ff.service';

@Controller('ff')
export class FrequentFlyerController {
  constructor(private ffService: FrequentFlyerService) {}

  @Get()
  findAll(): string {
    return 'This will return Frequent Flyer Info.';
  }

  @Post()
  joinClub(@Body() newMemberDto: NewMemberRequest): string {
    this.ffService.addToClub(newMemberDto);
    return '';
  }
}
