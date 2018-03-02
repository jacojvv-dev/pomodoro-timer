class Util {
    static minutesToSeconds(minutes) {
        return minutes * 60;
    }

    static secondsToMinutes(seconds) {
        return seconds / 60;
    }

    static isInteger(i) {
        return (typeof i === 'number' && (i % 1) === 0);
    }
}

module.exports = Util;