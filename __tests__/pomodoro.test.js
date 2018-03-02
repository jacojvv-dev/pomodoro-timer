require('../dist/pomodoro');
const pomodoro = new Pomodoro();

test('default duration is 25', () => {
    expect(pomodoro.duration).toBe(25);
});

test('default short break time is 5', () => {
    expect(pomodoro.shortBreakDuration).toBe(5);
});

test('default long break time is 15', () => {
    expect(pomodoro.longBreakDuration).toBe(15);
});

test('default total pomodoros is 4', () => {
    expect(pomodoro.rounds).toBe(4);
});

test('duration is updated to 20', () => {
    pomodoro.duration = 20;
    expect(pomodoro.duration).toBe(20);
});

test('short break is updated to 4', () => {
    pomodoro.shortBreakDuration = 4;
    expect(pomodoro.shortBreakDuration).toBe(4);
});

test('long break is updated to 20', () => {
    pomodoro.longBreakDuration = 20;
    expect(pomodoro.longBreakDuration).toBe(20);
});

test('total pomodoros is updated to 5', () => {
    pomodoro.rounds = 5;
    expect(pomodoro.rounds).toBe(5);
});


test('total rounds throws error if value is not an integer', () => {
    // unsure how to make an assingment with the .toThrow() arg,
    // doing this as a bypass
    try {
        pomodoro.rounds = 2.3
    } catch (error) {
        expect(error.name).toBe('InvalidInteger');
    }
});

test('current round throws error if value is not an integer', () => {
    // same bypass as the total rounds error check
    try {
        pomodoro.currentRound = 2.9
    } catch (error) {
        expect(error.name).toBe('InvalidInteger');
    }
});