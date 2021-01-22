import { Test, TestingModule } from '@nestjs/testing';
import { FrequentFlyerController } from './ff.controller';
import { FrequentFlyerService } from './ff.service';
import { MemberRepository } from '../common/repos/member';

describe('Frequent Flyer Controller Tests', () => {
  let ffController: FrequentFlyerController;

  jest.mock('../common/repos/member');
  const registerNewMember = jest.fn();
  registerNewMember.mockReturnValue(Promise.resolve({ code: 200}));
  MemberRepository.prototype.registerNewMember = registerNewMember;

  beforeEach(async () => {
    const ff: TestingModule = await Test.createTestingModule({
      controllers: [FrequentFlyerController],
      providers: [FrequentFlyerService, MemberRepository],
    }).compile();

    ffController = ff.get<FrequentFlyerController>(FrequentFlyerController);
  });

  it('Should add user to Frequent Flyer Club', () => {
    const newMember = { lastName: 'Smith', firstName: 'Jill' };
    const res = ffController.joinClub(newMember);

    expect(res.code).toBe(200);
    expect(res.message).toContain('Success');
  });

  it('Should retrieve Club Member', () => {});

  it('should add points to user account', () => {
    const id = 0;
    const points = 100;
    const res = ffController.addPointsToAccount({ id: id, pts: points });

    expect(res.code).toBe(200);
    expect(res.message).toContain('Success');
  });

  it('should update account status', () => {
    const id = 0;
    let status = 'Silver';
    const newMember = { lastName: 'Smith', firstName: 'Jill' };

    let res = ffController.joinClub(newMember);
    expect(res.code).toBe(200);
    expect(res.message).toContain('Success');

    let m = ffController.findClubMember({ id });
    expect(m.clubMember.status).toBe('Bronze');

    res = ffController.updateAccountStatus({ id, status });
    expect(res.code).toBe(200);
    expect(res.message).toContain('Success');

    m = ffController.findClubMember({ id });
    expect(m.clubMember.status).toBe(status);

    status = 'Gold';
    res = ffController.updateAccountStatus({ id, status });
    expect(res.code).toBe(200);
    expect(res.message).toContain('Success');

    m = ffController.findClubMember({ id });
    expect(m.clubMember.status).toBe(status);
  })
});
