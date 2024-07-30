import { Cat } from 'src/types';
import { Customer } from './customer';

export const kayleighId = 'ff535484-6880-4653-b06e-89983ecf4ed5';
export const wilhelmineId = '3dfdc5cf-b8ed-40f7-a5ca-5e88ad103b60';

export const wilhelmineDetails = {
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

export const kayleighDelivery = {
    "title": "Your next delivery for Dorian and Ocie",
    "message": "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
    "totalPrice": 134.00,
    "freeGift": true
};

export const kayleighSubscriptions: Array<Cat> = [
    {
        "breed": "Thai",
        "name": "Dorian",
        "pouchSize": "C",
        "subscriptionActive": true,
    },
    {
        "breed": "Somali",
        "name": "Ocie",
        "pouchSize": "F",
        "subscriptionActive": true,
    },
];

describe('Customer', () => {
    let kayleigh: Customer, wilhelmine: Customer;

    beforeAll(() => {
        kayleigh = new Customer(kayleighId);
        wilhelmine = new Customer(wilhelmineId);
    });

    describe('instantiating', () => {
        it('should error if there is no matching user', () => {
            expect(() => { new Customer('abc') }).toThrow(Error);
        });
    })

    describe('getDetails', () => {
        it('should return the correct data for the given user Wilhelmine', () => {
            expect(wilhelmine.getDetails()).toStrictEqual(wilhelmineDetails);
        });
    })

    describe('getDeliveryInfo', () => {
        it('should return the correct delivery for the given user Kayleigh', () => {
            expect(kayleigh.getDeliveryInfo()).toStrictEqual(kayleighDelivery);
        });
    });

    describe('getDeliveryInfo', () => {
        it('should return the correct delivery for the given user Kayleigh', () => {
            expect(kayleigh.getActiveSubscriptions()).toStrictEqual(kayleighSubscriptions);
        });
    });
});
