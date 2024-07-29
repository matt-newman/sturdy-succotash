import { Test, TestingModule } from '@nestjs/testing';
import { calculatePrice, pluralise } from './app.utils';

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
            "C": 62.7,
            "D": 66.0,
            "E": 69.0,
            "F": 71.2,
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
            expect(calculatePrice(pouchSizes)).toBe(55.5);
        });

        it('should return 59.50 for 1 type B pouch', () => {
            pouchSizes = ['B'];
            expect(calculatePrice(pouchSizes)).toBe(59.5);
        });
    })
});
