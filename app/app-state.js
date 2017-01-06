// see: https://github.com/teropa/harmonics-explorer/blob/master/src/app/app-state.ts 
"use strict";
var typed_immutable_record_1 = require('typed-immutable-record');
// An Immutable.js record factory for the record.
exports.appStateFactory = typed_immutable_record_1.makeTypedFactory({
    playing: false,
    weather: '...'
});
