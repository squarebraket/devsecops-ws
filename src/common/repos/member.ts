import { Injectable } from '@nestjs/common';
import { pool } from '../db/db-pool';
import { FrequentFlyerModelInterface } from '../../interface/frequent-flyer-model-interface';

@Injectable()
export class MemberRepository {
  // constructor(private pool: any) {}

  async registerNewMember(member: FrequentFlyerModelInterface) {
    const query = {
      text:
        'INSERT INTO MEMBER (last_name, first_name, status, points) VALUES ($1, $2, $3, $4)',
      values: [member.firstName, member.lastName, 'Bronze', 0],
    };

    try {
      const res = await pool.query(query);

      return res;
    } catch (e) {
      console.log('Error(RegisterNewMember) pool.query=', e);

      return '';
    }

  }
}
