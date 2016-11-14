"use strict";
exports.START = 'START';
exports.STOP = 'STOP';
exports.MidiButtonReducer = function (state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case exports.START:
            return true;
        case exports.STOP:
            return false;
        default:
            return state;
    }
};
