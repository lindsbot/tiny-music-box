import 'rxjs/Rx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MidiRainbowComponent } from './components/midi-rainbow.component';
import { MidiButtonComponent } from './components/midi-button.component';

import { MidiButtonReducer } from './reducers/midi-button';
import { WeatherReducer } from './reducers/weather'

import { AudioService } from './services/AudioService';
import { WindService } from './services/WindService';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    StoreModule.provideStore({
      playing: MidiButtonReducer,
      weather: WeatherReducer,
    }),
    EffectsModule
  ],
  providers: [
    WindService
  ],
  declarations: [ 
    AppComponent,
    MidiRainbowComponent,
    MidiButtonComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

 }
