import { ActionReducer, Action } from '@ngrx/store';
export const RECEIVED_WEATHER_DATA = 'RECEIVED_WEATHER_DATA';

export const WeatherReducer :ActionReducer<any> = (state :string = '', action :Action) => {
  switch (action.type) {
    case RECEIVED_WEATHER_DATA:
      return Object.assign({}, state, {
        windDirection: action.payload.wind_dir,
        tempF: action.payload.temp_f
      });

    default:
      return state;
  }
}