"use strict";
exports.TOGGLE = 'TOGGLE';
exports.VOLUME_UP = 'VOLUME_UP:';
exports.MidiButtonReducer = function (state, action) {
    if (state === void 0) { state = makeInitialState(); }
    switch (action.type) {
        case exports.TOGGLE:
            return Object.assign({}, state, (_a = {},
                _a[action.payload.id] = !state[action.payload.id],
                _a));
        default:
            return state;
    }
    var _a;
};
function makeInitialState() {
    return {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '10': false,
        '11': false,
        '12': false,
    };
}
