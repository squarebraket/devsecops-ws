import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FrequentFlyerDtoInterface } from '../interface/frequent-flyer-dto-interface';
import { FrequentFlyerService } from './ff.service';
import { ResponseDto } from '../dto/response-dto';

@Controller('flyers')
export class FrequentFlyerController {
  constructor(private ffService: FrequentFlyerService) {}

  @Get(':id')
  findClubMember(@Param() params): ResponseDto {
    const m = this.ffService.getMemberDetails(params.id);

    if (m.status !== '') {
      return new ResponseDto(
        200,
        `Success! Found club member with id =${params.id}`,
        m,
      );
    } else {
      return new ResponseDto(
        400,
        `Club member with id =${params.id}, not found`,
        null,
      );
    }
  }

  @Post()
  joinClub(@Body() newMemberDto: FrequentFlyerDtoInterface): ResponseDto {
    const s = this.ffService.addToClub(newMemberDto);
    let res;

    if (s < 0) {
      res = new ResponseDto(400, 'Error');
    } else {
      res = new ResponseDto(200, `Success! Your member ID is ${s}`);
    }
    return res;
  }

  @Get(':id/points/:pts')
  addPointsToAccount(@Param() params): ResponseDto {

    try {
      const res = this.ffService.addPointsToAccount(params.id, params.pts);
      return new ResponseDto(200, 'Success! Points were added to account');
    } catch (e) {
      console.log(
        `There was an error while adding points to account with id ${params.id}`,
      );
      return new ResponseDto(400, 'Error, something went wrong');
    }
  }

  @Get(':id/status/:status')
  updateAccountStatus(@Param() params): ResponseDto {
    try {
      const res = this.ffService.setMemberStatus(params.id, params.status);
      return new ResponseDto(200, 'Success! Account status updated');
    } catch (e) {
      console.log(
        `There was an error while adding points to account with id ${params.id}`,
      );
      return new ResponseDto(400, 'Error, something went wrong');
    }
  }
}
