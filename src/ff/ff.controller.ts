import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FrequentFlyerDtoInterface } from '../interface/frequent-flyer-dto-interface';
import { FrequentFlyerService } from './ff.service';
import { ResponseDto } from '../dto/response-dto';

@Controller('flyers')
export class FrequentFlyerController {
  constructor(private ffService: FrequentFlyerService) {}

  @Get(':id')
  findClubMember(@Param() params): ResponseDto {
    console.log(`Member Id Requested = ${params.id}`);

    const m = this.ffService.getMemberDetails(params.id);

    if (m.status !== '') {
      const res = new ResponseDto(
        '200',
        `Found club member with id =${params.id}`,
        m,
      );

      return res;
    }
  }

  @Post()
  joinClub(@Body() newMemberDto: FrequentFlyerDtoInterface): ResponseDto {
    const s = this.ffService.addToClub(newMemberDto);
    let res;

    if (s < 0) {
      res = new ResponseDto('400', 'Error');
    } else {
      res = new ResponseDto('200', `Success! Your member ID is ${s}`);
    }
    return res;
  }
}
