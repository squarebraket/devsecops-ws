import { Test, TestingModule } from '@nestjs/testing';
import { FrequentFlyerController } from './ff.controller';
import { FrequentFlyerService } from './ff.service';

describe('Frequent Flyer Controller Tests', () => {
  let ffController: FrequentFlyerController;

  beforeEach(async () => {
    const ff: TestingModule = await Test.createTestingModule({
      controllers: [FrequentFlyerController],
      providers: [FrequentFlyerService],
    }).compile();

    ffController = ff.get<FrequentFlyerController>(FrequentFlyerController);
  });

  it('Should add user to Frequent Flyer Club', () => {
    const newMember = { lastName: 'Smith', firstName: 'Jill' };
    const res = ffController.joinClub(newMember);

    expect(res.code).toBe('200');
    expect(res.message).toContain('Success');
  });

  it('Should retrieve Club Member', () => {});
});
