import 'rxjs/Rx'
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store'
import { AppState } from '../app-state'

import { RECEIVED_WEATHER_DATA } from '../reducers/weather'

@Injectable()
export class WindService {
  constructor (private http: Http, private store: Store<AppState>) {}

  getWeatherData() : Observable<any[]> {
    console.log('running getWeatherData')
    return this.http.get('http://api.wunderground.com/api/17b7007bbc2deb8b/conditions/q/CA/San_Francisco.json')
      .map((res:Response) => res.json())
      .withLatestFrom(this.store)
      .do(([data, store]) => {
        this.store.dispatch({type: RECEIVED_WEATHER_DATA, payload: data.current_observation})
        console.log(data);
      })
      .catch((error:any) => {
        return Observable.throw(error.json().error || 'error from wunderground');
      });
  }

}
