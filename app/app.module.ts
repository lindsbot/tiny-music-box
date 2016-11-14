import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MidiRainbowComponent } from './components/midi-rainbow.component';
import { MidiButtonComponent } from './components/midi-button.component';

import { MidiButtonReducer } from './reducers/midi-button'

@NgModule({
  imports: [ 
    BrowserModule,
    StoreModule.provideStore({status: MidiButtonReducer})
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
