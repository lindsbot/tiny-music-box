import { Component, Inject, Injectable } from '@angular/core'; 

import { MidiButtonService } from '../services/MidiButtonService';

@Component({
  selector: 'midi-rainbow',
  styleUrls: ['app/components/midi-rainbow.css'],
  providers: [ MidiButtonService ],
  template: `
    <h1>i'm a rainbow</h1>
    <div class="midi-rainbow">
      <midi-button 
        *ngFor="let button of buttonData"
        [color]="button.color"
      ></midi-button>
    </div>
  `
})

@Injectable()
export class MidiRainbowComponent { 
  private buttonData :Array<any>;

  constructor(@Inject(MidiButtonService) private MidiButtonService) {
    this.buttonData = MidiButtonService.generateButtons();
  }
};
