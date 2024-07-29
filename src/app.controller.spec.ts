import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the correct delivery info when the endpoint is called', () => {
      const wilhelmineId = '3dfdc5cf-b8ed-40f7-a5ca-5e88ad103b60';
      const result = {
        "title": "Your next delivery for Christina",
        "message": "Hey Wilhelmine! In two days' time, we'll be charging you for your next order for Christina's fresh food.",
        "totalPrice": 66,
        "freeGift": false
      };
      expect(appController.getNextDelivery(wilhelmineId)).toStrictEqual(result);
    });
  });
});
