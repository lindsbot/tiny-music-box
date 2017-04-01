"use strict";
exports.RECEIVED_WEATHER_DATA = 'RECEIVED_WEATHER_DATA';
exports.WeatherReducer = function (state, action) {
    if (state === void 0) { state = ''; }
    switch (action.type) {
        case exports.RECEIVED_WEATHER_DATA:
            return Object.assign({}, state, {
                windDirection: action.payload.wind_dir,
                tempF: action.payload.temp_f
            });
        default:
            return state;
    }
};
