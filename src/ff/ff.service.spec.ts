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
});
