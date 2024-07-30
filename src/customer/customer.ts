import { calculatePrice, pluralise } from '../app.utils';
import { Cat, Delivery } from '../types';
import { FREE_GIFT_PRICE_POINT } from '../constants';
import * as customerData from '../../data.json';

export interface CustomerDetails {
    id: string;
    firstName: string
    lastName: string;
    email: string;
    cats: Array<Cat>;
};

export class Customer {
    private id: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private cats: Array<Cat>;

    constructor(customerId: string) {
        let customer = customerData.find(({ id }) => id === customerId);

        if (!customer) {
            // something went wrong, return early, could throw error and log
            // console.error('customer not found', { customerId });
            throw new Error( `Customer not found for id: ${customerId}` );
        }

        this.id = customer.id;
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.email = customer.email;
        this.cats = customer.cats as Array<Cat>;
    }

    getDetails = ():CustomerDetails => {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            cats: this.cats,
        }
    }

    getActiveSubscriptions = (): Array<Cat> => {
        return this.cats.filter(cat => cat.subscriptionActive === true);
    };

    getDeliveryInfo = (): Delivery => {
        const activeSubscriptions = this.getActiveSubscriptions();

        const catNames = pluralise(activeSubscriptions.map(cat => cat.name));
        const totalPrice = calculatePrice(activeSubscriptions.map(cat => cat.pouchSize));
        const freeGift = totalPrice > FREE_GIFT_PRICE_POINT; // could move this to pricing as by its current mechanism it directly relates

        const delivery = {
            title: `Your next delivery for ${catNames}`,
            message: `Hey ${this.firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
            totalPrice: totalPrice,
            freeGift: freeGift,
        }

        return delivery;
    }
}
