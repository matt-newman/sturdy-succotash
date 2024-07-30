import { AppService } from './app.service';
import { wilhelmineId, kayleighId, kayleighDelivery, wilhelmineDetails } from './customer/customer.spec';

describe('AppService', () => {
    const app = new AppService();

    describe('getCustomer', () => {
        it('should return the correct data for the given user Wilhelmine', () => {
            expect(app.getCustomer(wilhelmineId)).toStrictEqual(wilhelmineDetails);
        });
    })

    describe('getNextDelivery', () => {
        it('should return the correct delivery for the given user Kayleigh', () => {
            expect(app.getNextDelivery(kayleighId)).toStrictEqual(kayleighDelivery);
        });
    });
});
