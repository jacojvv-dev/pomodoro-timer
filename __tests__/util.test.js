const Util = require('../src/Util');

test('1 minute is 60 seconds', () => {
    expect(Util.minutesToSeconds(1)).toBe(60);
});

test('60 seconds is 1 minute', () => {
    expect(Util.secondsToMinutes(60)).toBe(1);
});

test('1 is an integer', () => {
    expect(Util.isInteger(1)).toBe(true);
});

test('1.23 is not an integer', () => {
    expect(Util.isInteger(1.23)).toBe(false);
});

test('a is not an integer', () => {
    expect(Util.isInteger("a")).toBe(false);
});