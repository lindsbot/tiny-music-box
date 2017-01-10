// see: https://github.com/teropa/harmonics-explorer/blob/master/src/app/app-state.ts

import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { List } from 'immutable';

export interface AppState {
  playing: {
    '1': boolean,
    '2': boolean,
    '3': boolean,
    '4': boolean,
    '5': boolean,
    '6': boolean,
    '7': boolean,
    '8': boolean,
    '9': boolean,
    '10': boolean,
    '11': boolean,
    '12': boolean,
  },
  weather: any,
  masterGain: number
}

// An Immutable.js Record implementation of the AppState interface.
// This only needs to be imported by reducers, since they produce new versions
// of the state. Components should only ever read the state, never change it,
// so they should only need the interface, not the record.
export interface AppStateRecord extends TypedRecord<AppStateRecord>, AppState { }

// // An Immutable.js record factory for the record.
// export const appStateFactory = makeTypedFactory<AppState, AppStateRecord>({
//   playing: {
//     '1': false,
//     '2': false,
//     '3': false,
//     '4': false,
//     '5': false,
//     '6': false,
//     '7': false,
//     '8': false,
//     '9': false,
//     '10': false,
//     '11': false,
//     '12': false,
//   },
//   // weather: '...'
// });
