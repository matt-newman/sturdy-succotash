import { Test, TestingModule } from '@nestjs/testing';
import { pluralise } from './app.utils';

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
});
