import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
    const app = new AppService();
//   beforeEach(async () => {
//   });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(app.getUser('a')).toBe('Hello World!');
    });
  });
});
