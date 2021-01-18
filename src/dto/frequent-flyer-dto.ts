import { FrequentFlyerDtoInterface } from '../interface/frequent-flyer-dto-interface';

export class FrequentFlyerDto implements FrequentFlyerDtoInterface {
  lastName: string;
  firstName: string;

  constructor(lastName: string, firstName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
  }
}
