import { FrequentFlyerService } from './ff.service';

describe('Should perform FF functions', () => {
  let service: FrequentFlyerService;

  beforeEach(() => {
    service = new FrequentFlyerService();
  });

  it('Should register a new member', () => {
    const res = service.addToClub({
      firstName: 'Jonny',
      lastName: 'Appleseed',
    });

    expect(res).toEqual(0);
  });

  it('Should find register members', () => {
    const s = service.addToClub({ firstName: 'Jonny', lastName: 'Appleseed' });
    const m = service.getMemberDetails(0);

    expect(s).toEqual(0);
    expect(m.firstName).toBe('Jonny');
    expect(m.lastName).toBe('Appleseed');
    expect(m.status).toBe('Bronze');
    expect(m.points).toBe(0);
  });

  it('Should return empty object when member not found', () => {
    const m = service.getMemberDetails(0);

    expect(m.firstName).toBe('');
    expect(m.lastName).toBe('');
    expect(m.status).toBe('');
    expect(m.points).toBe(-1);
  });

  it('Should return member Status', () => {
    service.addToClub({ firstName: 'Jonny', lastName: 'Appleseed' });
    const s = service.getMemberStatus(0);

    expect(s).toBe('Bronze');
  });

  it('should add points to account', () => {
    service.addToClub({ firstName: 'Jonny', lastName: 'Appleseed' });
    const additionalPoints = 100;
    const id = 0;

    const m = service.getMemberDetails(id);
    const p = m.points;

    const r = service.addPointsToAccount(id, additionalPoints);

    expect(r).toBe('ok');
    expect(m.points).toBe(p + additionalPoints);
  });

  it('should change account status when more points are added', () => {
    let additionalPoints = 100;
    const id = 0;

    service.addToClub({ firstName: 'Jonny', lastName: 'Appleseed' });

    const m = service.getMemberDetails(id);
    let p = m.points;
    expect(m.status).toBe('Bronze');

    let r = service.addPointsToAccount(id, additionalPoints);

    expect(r).toBe('ok');
    expect(m.points).toBe(p + additionalPoints);
    expect(m.status).toBe('Bronze');

    p = m.points;
    additionalPoints += 100;
    r = service.addPointsToAccount(id, additionalPoints);
    expect(r).toBe('ok');
    expect(m.points).toBe(p + additionalPoints);
    expect(m.status).toBe('Silver');

    p = m.points;
    additionalPoints += 100;
    r = service.addPointsToAccount(id, additionalPoints);
    expect(r).toBe('ok');
    expect(m.points).toBe(p + additionalPoints);
    expect(m.status).toBe('Gold');

    p = m.points;
    additionalPoints += 100;
    r = service.addPointsToAccount(id, additionalPoints);
    expect(r).toBe('ok');
    expect(m.points).toBe(p + additionalPoints);
    expect(m.status).toBe('Platinum');
  });

  it('should set status for account', () => {
    service.addToClub({ firstName: 'Jonny', lastName: 'Appleseed' });
    const id = 0;
    let status = 'Bronze';

    let r = service.setMemberStatus(id, status);
    let m = service.getMemberDetails(id);
    expect(r).toBe('ok');
    expect(m.status).toBe(status);

    status = 'Silver';
    r = service.setMemberStatus(id, status);
    m = service.getMemberDetails(id);
    expect(r).toBe('ok');
    expect(m.status).toBe(status);

  });
});
