import { Component, Inject, Injectable } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MidiButtonService } from '../services/MidiButtonService';

interface AppState {
  status: boolean
}

@Component({
  selector: 'midi-rainbow',
  styleUrls: ['app/components/midi-rainbow.css'],
  providers: [ MidiButtonService ],
  template: `
    <h1>i'm a rainbow</h1>
    <h1>{{status | async}}</h1>
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
  status: Observable<boolean>;

  constructor(
    @Inject(MidiButtonService) private MidiButtonService, 
    private store: Store<AppState>
  ){
    this.status = store.select('status');
    this.buttonData = MidiButtonService.generateButtons();
  }
};
