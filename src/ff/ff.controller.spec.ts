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

  it('Should Return acknowledge', () => {
    expect(ffController.findAll()).toBe(
      'This will return Frequent Flyer Info.',
    );
  });

  it('Should add user to Frequent Flyer Club', () => {
    const newMember = {
      lastName: 'Smith',
      firstName: 'Jill',
    };
    expect(ffController.joinClub(newMember)).toBe(
      'Success! Your status is Bronze',
    );
  });
});
