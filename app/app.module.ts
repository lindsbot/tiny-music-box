import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MidiRainbowComponent } from './components/midi-rainbow.component';
import { MidiButtonComponent } from './components/midi-button.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ 
    AppComponent,
    MidiRainbowComponent,
    MidiButtonComponent,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
