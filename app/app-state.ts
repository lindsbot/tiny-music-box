// see: https://github.com/teropa/harmonics-explorer/blob/master/src/app/app-state.ts 

import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { List } from 'immutable';

export interface AppState {
  playing: boolean,
  weather: any,
}

// An Immutable.js Record implementation of the AppState interface.
// This only needs to be imported by reducers, since they produce new versions
// of the state. Components should only ever read the state, never change it,
// so they should only need the interface, not the record. 
export interface AppStateRecord extends TypedRecord<AppStateRecord>, AppState { }

// An Immutable.js record factory for the record.
export const appStateFactory = makeTypedFactory<AppState, AppStateRecord>({
  playing: false,
  weather: '...'
});
