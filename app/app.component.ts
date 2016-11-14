import { Component } from '@angular/core';
import { MidiRainbowComponent } from './components/midi-rainbow.component';

@Component({
  selector: 'music-box',
  styleUrls: ['app/app.css'],
  template: `
    <h1>{{title}}</h1>
    <midi-rainbow></midi-rainbow>
  `,
})

export class AppComponent { 
  title = 'Tiny Music Box';
};
