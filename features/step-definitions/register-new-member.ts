import { Test, TestingModule } from '@nestjs/testing';
import { FrequentFlyerController } from '../../src/ff/ff.controller';
import { FrequentFlyerService } from '../../src/ff/ff.service';

import { Before, Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { FrequentFlyerModelInterface } from '../../src/interface/frequent-flyer-model-interface';
import { FrequentFlyerDto } from "../../src/dto/frequent-flyer-dto";
import { ResponseDto } from "../../src/dto/response-dto";

let ffController: FrequentFlyerController;

Before(async () => {
  class MemberRepository {
    registerNewMember(member: FrequentFlyerModelInterface) {
      return Promise.resolve({ code: 200 });
    }
  }

  const ff: TestingModule = await Test.createTestingModule({
    controllers: [FrequentFlyerController],
    providers: [FrequentFlyerService, MemberRepository],
  }).compile();

  ffController = ff.get<FrequentFlyerController>(FrequentFlyerController);
});

Given('user is not a Frequent Flyer member', function () {
  const res = ffController.findClubMember({ id: 0 });
  assert.equal(res.clubMember, null);
});

When('user registers on the Frequent Flyer program', function () {
  const dto = new FrequentFlyerDto('Fonda', 'Jane');
  let res: ResponseDto = ffController.joinClub(dto);

  assert.equal(res.code, 200);
  assert.notEqual(res.message.indexOf('Success'), -1);

  res = ffController.findClubMember({ id: 0 });
  assert.equal(res.clubMember.lastName, 'Fonda');
});

Then('user should have a status of BRONZE', function () {
  const res = ffController.findClubMember({ id: 0 });
  assert.equal(res.clubMember.lastName, 'Fonda');

});
