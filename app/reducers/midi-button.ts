import { ActionReducer, Action } from '@ngrx/store';

export const START = 'START';
export const STOP = 'STOP';

export const MidiButtonReducer :ActionReducer<any> = (state :boolean = false, action :Action) => {
  switch (action.type) {
    case START:
      return true;
    case STOP:
      return false;
    default:
      return state;
  }
}