import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from './app-state';
// import { WindService } from './services/WindService';

@Component({
  selector: 'music-box',
  styleUrls: ['app/app.css'],
  template: `
    <h1>{{title}}</h1>
    <!-- <h1>wind is coming from the {{weather$.select('windDirection') | async}}</h1> -->
    <!-- <h1>current temp is {{weather$.select('tempF') | async}}</h1> -->
    <!-- <div id="refresh-btn">Click me to refresh weather data</div> -->
    <midi-rainbow></midi-rainbow>
  `,
})

export class AppComponent implements OnInit {
  title = 'Tiny Music Box';
  playing$: Observable<boolean>;
  weather$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    // private WindService: WindService
  ) {
    this.playing$ = <Observable<boolean>>store.select('playing');
    this.weather$ = <Observable<string>>store.select('weather');
  }

  ngOnInit() {



    // let clicks = Observable.fromEvent(document.getElementById('refresh-btn'), 'click');
    // let timer = Observable.timer(0, 60000);
    // let clicksOrTimer = Observable.merge(clicks, timer);
    // clicksOrTimer
    //   .flatMap(() => {
    //     return this.WindService.getWeatherData();
    //   })
    //   .subscribe()
  }
};
