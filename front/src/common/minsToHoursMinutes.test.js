import minsToHoursMinutes from './minsToHoursMinutes';

describe('Format minutes to hours', () => {
  it('should format 128 minutes to 2:08', () => {
    expect(minsToHoursMinutes(128)).toEqual('2:08');
  });
  it('should format 24 hours in minutes to 24:00', () => {
    expect(minsToHoursMinutes(60 * 24)).toEqual('24:00');
  });
});
