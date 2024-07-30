import { calculatePrice, pluralise } from './utils';

describe('Utils', () => {
    describe('pluralise', () => {
        let cats: string[] = [];
        let seperator = ', ';
        let joiner = ' and ';

        beforeEach(() => {
            cats = ['bob'];
            seperator = ', ';
            joiner = ' and ';
        });

        it('should return only "bob" for 1 cat', () => {
            expect(pluralise(cats)).toBe('bob');
        });

        it('should return only "bob and sue" for 2 cats', () => {
            cats = ['bob', 'sue'];
            expect(pluralise(cats)).toBe('bob and sue');
        });

        it('should return "bob, sue and tom" for 3 cats', () => {
            cats = ['bob', 'sue', 'tom'];
            expect(pluralise(cats)).toBe('bob, sue and tom');
        });

        it('should return "bob, sue, felix and tom" for 4 cats', () => {
            cats = ['bob', 'sue', 'felix', 'tom'];
            expect(pluralise(cats)).toBe('bob, sue, felix and tom');
        });
    })

    describe('calculatePrice', () => {
        let pouchSizes: string[];
        const prices = {
            "A": 55.5,
            "B": 59.5,
            "C": 62.75,
            "D": 66.0,
            "E": 69.0,
            "F": 71.25,
        }

        // A -> 55.50 GBP
        // B -> 59.50 GBP
        // C -> 62.75 GBP
        // D -> 66.00 GBP
        // E -> 69.00 GBP
        // F -> 71.25 GBP

        beforeEach(() => {
            pouchSizes = [];
        });

        it('should return zero for no pouches', () => {
            expect(calculatePrice(pouchSizes)).toBe(0);
        });

        it('should return 55.50 for 1 type A pouch', () => {
            pouchSizes = ['A'];
            expect(calculatePrice(pouchSizes)).toBe(prices.A);
        });

        it('should return 59.50 for 1 type B pouch', () => {
            pouchSizes = ['B'];
            expect(calculatePrice(pouchSizes)).toBe(prices.B);
        });

        it('should return 62.75 for 1 type C pouch', () => {
            pouchSizes = ['C'];
            expect(calculatePrice(pouchSizes)).toBe(prices.C);
        });

        it('should return 66.00 for 1 type D pouch', () => {
            pouchSizes = ['D'];
            expect(calculatePrice(pouchSizes)).toBe(prices.D);
        });

        it('should return 69.00 for 1 type E pouch', () => {
            pouchSizes = ['E'];
            expect(calculatePrice(pouchSizes)).toBe(prices.E);
        });

        it('should return 71.25 for 1 type F pouch', () => {
            pouchSizes = ['F'];
            expect(calculatePrice(pouchSizes)).toBe(prices.F);
        });

        it('should return 115.00 for pouches A and B', () => {
            pouchSizes = 'AB'.split('');
            expect(calculatePrice(pouchSizes)).toBe(115);
        });

        it('should return 188.25 for all the pouches together', () => {
            pouchSizes = 'CCC'.split('');
            expect(calculatePrice(pouchSizes)).toBe(3 * prices.C);
        });

        it('should return 384 for all the pouches together', () => {
            pouchSizes = 'ABCDEF'.split('');
            expect(calculatePrice(pouchSizes)).toBe(384);
        });
    })
});
