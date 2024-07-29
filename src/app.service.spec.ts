import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
    const app = new AppService();
    //   beforeEach(async () => {
    //   });

    const kayleighId = 'ff535484-6880-4653-b06e-89983ecf4ed5';
    const wilhelmineId = '3dfdc5cf-b8ed-40f7-a5ca-5e88ad103b60';
    
    const wilhelmineUserResult = {
        "id": "3dfdc5cf-b8ed-40f7-a5ca-5e88ad103b60",
        "firstName": "Wilhelmine",
        "lastName": "Senger",
        "email": "Wilhelmine.Senger52@hotmail.com",
        "cats": [
            {
                "name": "Christina",
                "subscriptionActive": true,
                "breed": "Scottish Fold",
                "pouchSize": "D"
            }
        ]
    };
    const kayleighDelivery = {
        "title": "Your next delivery for Dorian and Ocie",
        "message": "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
        "totalPrice": 134.00,
        "freeGift": true
    }

    describe('getUser', () => {
        it('should return the correct data for the given user Wilhelmine', () => {
            expect(app.getUser(wilhelmineId)).toStrictEqual(wilhelmineUserResult);
        });
    })

    describe('getNextDelivery', () => {
        it('should return the correct delivery for the given user Kayleigh', () => {
            expect(app.getNextDelivery(kayleighId)).toStrictEqual(kayleighDelivery);
        });
    });
});
