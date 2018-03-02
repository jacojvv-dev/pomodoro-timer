const Exceptions = require('../src/Exceptions');

test('value not int error is object', () => {
    expect(typeof Exceptions.ValueNotIntegerException()).toBe('object');
});

test('value not int error name & message is correct', () => {
    expect(Exceptions.ValueNotIntegerException().name).toBe('InvalidInteger');
    expect(Exceptions.ValueNotIntegerException().message).toBe('Value is not a valid integer');
});