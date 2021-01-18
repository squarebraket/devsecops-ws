import { Injectable } from '@nestjs/common';
import { FrequentFlyer } from '../interface/frequent-flyer-interface';
import { NewMemberRequest } from '../interface/new-member-request-interface';
import { FrequentFlyerDto } from '../dto/frequent-flyer-dto';

@Injectable()
export class FrequentFlyerService {
  private clubMembers: Array<FrequentFlyer> = [];

  addToClub(newMemberDto: NewMemberRequest) {
    const newMember = new FrequentFlyerDto(
      newMemberDto.lastName,
      newMemberDto.firstName,
    );

    this.clubMembers.push(newMember);
  }
}
