/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(2);
var Exceptions = __webpack_require__(3);
var PomodoroEvents = __webpack_require__(4);

var Pomodoro = function () {
    function Pomodoro() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Pomodoro);

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

        this._options = _extends({}, this._options, options);
    }

    _createClass(Pomodoro, [{
        key: 'generateTimeSlots',


        /** 
         * Generates the time slots for the timer
        */
        value: function generateTimeSlots() {
            var slots = [];
            var inPosition = 0;
            for (var i = 0; i < this._options.totalRounds; i++) {
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
    }, {
        key: 'startTimer',
        value: function startTimer() {
            var _this = this;

            if (!this._timer) {
                this._phases = this.generateTimeSlots();
                this._timer = setInterval(function () {
                    if (!_this._internalData.isPaused) {
                        _this._internalData.currentPhase = '';
                        _this._internalData.currentRunTime += 500;
                        _this._internalData.currentRunTimeInSeconds = _this._internalData.currentRunTime / 1000;

                        var currentPhase = _this._phases.filter(function (e) {
                            return _this._internalData.currentRunTimeInSeconds >= e.start && _this._internalData.currentRunTimeInSeconds <= e.end;
                        })[0];

                        console.log(_this._phases);
                        console.log(_this._internalData.currentRunTimeInSeconds);
                        console.log(currentPhase);

                        _this._internalData.currentPhase = currentPhase.name;
                        _this._internalData.currentPhaseProgress = (_this._internalData.currentRunTimeInSeconds - currentPhase.start) / (currentPhase.end - currentPhase.start) * 100;
                    }
                    document.dispatchEvent(PomodoroEvents.pomodoroTick(_this._internalData));
                }, 500);
            }
        }
    }, {
        key: 'options',
        get: function get() {
            return this._options;
        }
    }, {
        key: 'duration',
        get: function get() {
            return Util.secondsToMinutes(this._options.duration);
        },
        set: function set(val) {
            this._options.duration = Util.minutesToSeconds(val);
        }
    }, {
        key: 'shortBreakDuration',
        get: function get() {
            return Util.secondsToMinutes(this._options.shortBreakDuration);
        },
        set: function set(val) {
            this._options.shortBreakDuration = Util.minutesToSeconds(val);
        }
    }, {
        key: 'longBreakDuration',
        get: function get() {
            return Util.secondsToMinutes(this._options.longBreakDuration);
        },
        set: function set(val) {
            this._options.longBreakDuration = Util.minutesToSeconds(val);
        }
    }, {
        key: 'rounds',
        get: function get() {
            return this._options.totalRounds;
        },
        set: function set(val) {
            if (Util.isInteger(val)) this._options.totalRounds = val;else throw new Exceptions.ValueNotIntegerException();
        }
    }, {
        key: 'currentRound',
        get: function get() {
            return this._options.currentRound;
        },
        set: function set(val) {
            if (Util.isInteger(val)) this._options.currentRound = val;else throw new Exceptions.ValueNotIntegerException();
        }
    }]);

    return Pomodoro;
}();

window.Pomodoro = Pomodoro;
module.exports = Pomodoro;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'minutesToSeconds',
        value: function minutesToSeconds(minutes) {
            return minutes * 60;
        }
    }, {
        key: 'secondsToMinutes',
        value: function secondsToMinutes(seconds) {
            return seconds / 60;
        }
    }, {
        key: 'isInteger',
        value: function isInteger(i) {
            return typeof i === 'number' && i % 1 === 0;
        }
    }]);

    return Util;
}();

module.exports = Util;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Exceptions = function () {
    function Exceptions() {
        _classCallCheck(this, Exceptions);
    }

    _createClass(Exceptions, null, [{
        key: "ValueNotIntegerException",
        value: function ValueNotIntegerException() {
            return { name: "InvalidInteger", message: "Value is not a valid integer" };
        }
    }]);

    return Exceptions;
}();

module.exports = Exceptions;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PomodoroEvents = function () {
    function PomodoroEvents() {
        _classCallCheck(this, PomodoroEvents);
    }

    _createClass(PomodoroEvents, null, [{
        key: "pomodoroTick",
        value: function pomodoroTick() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


            detail = {};

            return new CustomEvent("pomodoroTick", {
                detail: _extends({
                    message: "PomodoroTicked",
                    time: new Date()
                }, data),
                bubbles: false,
                cancelable: true
            });
        }
    }]);

    return PomodoroEvents;
}();

module.exports = PomodoroEvents;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);