import minsToHoursMinutes from './minsToHoursMinutes';

describe('Format minutes to hours', () => {
    it('should format 128 minutes to 2:08', () => {
       expect(minsToHoursMinutes(128)).toEqual('2:08'); 
    });
});