"use strict";
exports.TOGGLE = 'TOGGLE';
exports.VOLUME_UP = 'VOLUME_UP:';
exports.MidiButtonReducer = function (state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case exports.TOGGLE:
            if (state === true) {
                return false;
            }
            else {
                return true;
            }
        default:
            return state;
    }
};
