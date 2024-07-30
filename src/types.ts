export interface Cat {
    name: string;
    subscriptionActive: boolean;
    breed: string;
    pouchSize: string;
}

export interface Delivery {
    title: string;
    message: string;
    totalPrice: number;
    freeGift: boolean;
};

export interface Prices {
    A: number,
    B: number,
    C: number,
    D: number,
    E: number,
    F: number
};