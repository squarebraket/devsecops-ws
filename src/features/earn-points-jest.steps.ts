import { defineFeature, loadFeature } from 'jest-cucumber';
import { FrequentFlyerController } from '../ff/ff.controller';
import { FrequentFlyerModelInterface } from '../interface/frequent-flyer-model-interface';
import { FrequentFlyerDto } from '../dto/frequent-flyer-dto';
import { ResponseDto } from '../dto/response-dto';
import { Test, TestingModule } from '@nestjs/testing';
import { FrequentFlyerService } from '../ff/ff.service';

const feature = loadFeature(
  'src/features/new-club-member-registration-stand-alone.feature',
);

defineFeature(feature, (test) => {
  let ffController: FrequentFlyerController;

  beforeEach(async () => {
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
  test('New members should start out as BRONZE members', ({ given, when, then }) => {
    given('user is not a Frequent Flyer member', () => {
      const res = ffController.findClubMember({ id: 0 });
      expect(res.clubMember).toEqual(null);
    });

    when('user registers on the Frequent Flyer program', () => {
      const dto = new FrequentFlyerDto('Fonda', 'Jane');
      let res: ResponseDto = ffController.joinClub(dto);

      expect(res.code).toEqual(200);
      expect(res.message.indexOf('Success')).not.toBe(-1);

      res = ffController.findClubMember({ id: 0 });
      expect(res.clubMember.lastName).toEqual('Fonda');
    });

    then('user should have a status of BRONZE', () => {
      const res = ffController.findClubMember({ id: 0 });
      expect(res.clubMember.lastName).toEqual('Fonda');
    });
  });
});
