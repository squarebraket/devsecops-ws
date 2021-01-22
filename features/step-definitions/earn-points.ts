import { Test, TestingModule } from '@nestjs/testing';
import { FrequentFlyerController } from '../../src/ff/ff.controller';
import { FrequentFlyerService } from '../../src/ff/ff.service';
import { FrequentFlyerDto } from '../../src/dto/frequent-flyer-dto';
import { ResponseDto } from '../../src/dto/response-dto';

import { Before, Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { FrequentFlyerModelInterface } from '../../src/interface/frequent-flyer-model-interface';


let ffController: FrequentFlyerController;
const memberId = 0;

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

Given('{string} is a {string} FrequentFlyer member', function (name, status) {
  const n = name.split(' ');
  const dto = new FrequentFlyerDto(n[1], n[0]);
  let res: ResponseDto = ffController.joinClub(dto);

  assert.equal(res.code, 200);
  assert.notEqual(res.message.indexOf('Success'), -1);

  res = ffController.findClubMember({ id: 0 });
  assert.equal(res.clubMember.status, 'Bronze');

  res = ffController.updateAccountStatus({ id: 0, status });
  assert.equal(res.code, 200);
  assert.notEqual(res.message.indexOf('Success'), -1);

  res = ffController.findClubMember({ id: 0 });
  assert.equal(res.clubMember.status, status);

});

Given('{string} has {int} status points', function (name, points) {
  const r = ffController.addPointsToAccount({ id: memberId, pts: points });

  assert.equal(r.code, 200);

  const m = ffController.findClubMember({ id: memberId });

  assert.equal(m.clubMember.points, points);
});

When('{string} earns {int} extra status points', function (name, points) {
  let m = ffController.findClubMember({ id: memberId });
  const morePoints = m.clubMember.points + points;

  console.log('more points = ', morePoints);

  const r = ffController.addPointsToAccount({ id: memberId, pts: points });

  m = ffController.findClubMember({ id: memberId });

  console.log('clubMember points=', m.clubMember);
  assert.equal(m.clubMember.points, morePoints);
});

Then('he should have a status of {string}', function (status) {
  const m = ffController.findClubMember({ id: 0 });

  assert.equal(m.clubMember.status, status);
});
