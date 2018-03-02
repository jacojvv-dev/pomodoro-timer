var Util = require('./Util');
var Exceptions = require('./Exceptions');
var PomodoroEvents = require('./PomodoroEvents');

class Pomodoro {
    constructor(options = {}) {
        this._options = {
            duration: 1500,
            shortBreakDuration: 300,
            longBreakDuration: 900,
            totalRounds: 4,
            currentRound: 0
        };

        this._timer = null;
        this._phases = null;

        this._internalData = {
            isPaused: false,
            currentRunTime: 0,
            currentRunTimeInSeconds: 0,
            currentPhase: 'work',
            currentPhaseProgress: 0
        };

        this._options = { ...this._options, ...options };
    }

    get options() {
        return this._options;
    }

    get duration() {
        return Util.secondsToMinutes(this._options.duration);
    }

    set duration(val) {
        this._options.duration = Util.minutesToSeconds(val);
    }

    get shortBreakDuration() {
        return Util.secondsToMinutes(this._options.shortBreakDuration);
    }

    set shortBreakDuration(val) {
        this._options.shortBreakDuration = Util.minutesToSeconds(val);
    }

    get longBreakDuration() {
        return Util.secondsToMinutes(this._options.longBreakDuration);
    }

    set longBreakDuration(val) {
        this._options.longBreakDuration = Util.minutesToSeconds(val);
    }

    get rounds() {
        return this._options.totalRounds;
    }

    set rounds(val) {
        if (Util.isInteger(val))
            this._options.totalRounds = val;
        else
            throw new Exceptions.ValueNotIntegerException();
    }

    get currentRound() {
        return this._options.currentRound;
    }

    set currentRound(val) {
        if (Util.isInteger(val))
            this._options.currentRound = val;
        else
            throw new Exceptions.ValueNotIntegerException();
    }

    /** 
     * Generates the time slots for the timer
    */
    generateTimeSlots() {
        var slots = [];
        var inPosition = 0;
        for (let i = 0; i < this._options.totalRounds; i++) {
            slots.push({
                name: "work",
                start: inPosition,
                end: inPosition + this._options.duration
            });

            slots.push({
                name: "short_break",
                start: inPosition + this._options.duration,
                end: inPosition + this._options.duration + this._options.shortBreakDuration
            });

            inPosition = inPosition + this._options.duration + this._options.shortBreakDuration;
        }

        slots.push({
            name: "long_break",
            start: slots[slots.length - 1].end,
            end: slots[slots.length - 1].end + this._options.longBreakDuration
        });

        console.log(slots);

        return slots;
    }


    startTimer() {
        if (!this._timer) {
            this._phases = this.generateTimeSlots();
            this._timer = setInterval(() => {
                if (!this._internalData.isPaused) {
                    this._internalData.currentPhase = '';
                    this._internalData.currentRunTime += 500;
                    this._internalData.currentRunTimeInSeconds = (this._internalData.currentRunTime / 1000);

                    var currentPhase = this._phases.filter((e) => {
                        return this._internalData.currentRunTimeInSeconds >= e.start && this._internalData.currentRunTimeInSeconds <= e.end;
                    })[0];

                    console.log(this._phases);
                    console.log(this._internalData.currentRunTimeInSeconds);
                    console.log(currentPhase);

                    this._internalData.currentPhase = currentPhase.name;
                    this._internalData.currentPhaseProgress = (this._internalData.currentRunTimeInSeconds - currentPhase.start) / (currentPhase.end  - currentPhase.start )* 100;
                }
                document.dispatchEvent(PomodoroEvents.pomodoroTick(this._internalData));
            }, 500);
        }
    }
}

window.Pomodoro = Pomodoro;
module.exports = Pomodoro;