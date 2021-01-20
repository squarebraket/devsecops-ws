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

  addPointsToAccount(id: number, points: number): string {
    const BRONZE_LOWER = 0;
    const BRONZE_UPPER = 299;
    const SILVER_LOWER = 300;
    const SILVER_UPPER = 499;
    const GOLD_LOWER = 500;
    const GOLD_UPPER = 699;
    const PLATINUM_UPPER = 700;

    try {
      const m = this.clubMembers[id];

      m.points += points;

      if (m.points >= BRONZE_LOWER && m.points <= BRONZE_UPPER) {
        m.status = 'Bronze';
      } else if (m.points >= SILVER_LOWER && m.points <= SILVER_UPPER) {
        m.status = 'Silver';
      } else if (m.points >= GOLD_LOWER && m.points <= GOLD_UPPER) {
        m.status = 'Gold';
      } else if (m.points >= PLATINUM_UPPER) {
        m.status = 'Platinum';
      }

      return 'ok';
    } catch (e) {
      return 'error';
    }
  }

  setMemberStatus(id, status) {
    try {
      const m = this.clubMembers[id];
      m.status = status;

      return 'ok';
    } catch (e) {
      return 'error';
    }
  }
}
