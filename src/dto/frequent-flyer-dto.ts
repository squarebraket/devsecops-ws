import { FrequentFlyer } from '../interface/frequent-flyer-interface';

export class FrequentFlyerDto implements FrequentFlyer {
  lastName: string;
  firstName: string;
  status: string;
  points: number;

  constructor(lastName: string, firstName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.status = 'Bronze';
    this.points = 0;
  }
}
