import { Injectable } from '@nestjs/common';
import { FrequentFlyerDtoInterface } from '../interface/frequent-flyer-dto-interface';
import { FrequentFlyerModel } from '../model/frequent-flyer-model';

@Injectable()
export class FrequentFlyerService {
  private clubMembers: Array<FrequentFlyerModel> = [];

  addToClub(newMemberDto: FrequentFlyerDtoInterface): number {
    const newMember = new FrequentFlyerModel(
      newMemberDto.firstName,
      newMemberDto.lastName,
    );

    this.clubMembers.push(newMember);

    // Temporary code, it should be remove once DB is integrated
    const status = this.clubMembers[this.clubMembers.length - 1].status;

    if (status !== 'Bronze') {
      // Error ocurred
      return -1;
    }

    // return member id (position in Arry at this point, shoudl be changed)
    return this.clubMembers.length - 1;
  }

  getMemberDetails(id: number): FrequentFlyerModel {
    const m = this.clubMembers[id];

    if (m) {
      return m;
    } else {
      /**
       * An error should be log, perhaps
       */
      return {
        lastName: '',
        firstName: '',
        status: '',
        points: -1,
      };
    }
  }

  getMemberStatus(id: number): string {
    const m = this.clubMembers[id];

    if (m) {
      return m.status;
    } else {
      return 'Error, ID not found';
    }
  }
}
