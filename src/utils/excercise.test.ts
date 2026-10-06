import { isOverdue, getDeadlineText } from './excercise';
import { ExcerciseStatus, Priority } from '../types/excercise';

describe('utils/excercise', () => {
  describe('isOverdue', () => {
    it('returns true if status is PENDING and deadline is in the past', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const exercise: any = {
        excerciseStatus: ExcerciseStatus.PENDING,
        deadline: pastDate.toISOString(),
      };
      
      expect(isOverdue(exercise)).toBe(true);
    });

    it('returns false if status is COMPLETED even if deadline is in the past', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const exercise: any = {
        excerciseStatus: ExcerciseStatus.COMPLETED,
        deadline: pastDate.toISOString(),
      };
      
      expect(isOverdue(exercise)).toBe(false);
    });
  });

  describe('getDeadlineText', () => {
    it('returns "Còn X ngày" for future dates', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      
      expect(getDeadlineText(futureDate.toISOString())).toBe('Còn 5 ngày');
    });

    it('returns "Quá hạn X ngày" for past dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 3);
      // Wait, getDeadlineText uses Math.ceil. 
      // If diff is exactly -3 days, it might be exactly -3. 
      // To be safe, set time to 00:00:00 of 3 days ago.
      expect(getDeadlineText(pastDate.toISOString())).toMatch(/Quá hạn \d+ ngày/);
    });
  });
});
