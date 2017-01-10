import { Component, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app-state'
import { MidiButtonService } from '../services/MidiButtonService';
import { AudioService } from '../services/AudioService';

@Component({
  selector: 'midi-rainbow',
  styleUrls: ['app/components/midi-rainbow.css'],
  providers: [ MidiButtonService, AudioService ],
  template: `
    <div class="midi-rainbow">
      <midi-button
        *ngFor="let button of buttonData"
        [color]="button.color"
        [id]="button.id"
      ></midi-button>
    </div>
  `
})

@Injectable()
export class MidiRainbowComponent {
  private buttonData :Array<any>;
  playing: Observable<boolean>;

  constructor(
    @Inject(MidiButtonService) private MidiButtonService,
    @Inject(AudioService) private AudioService,
    private store: Store<AppState>
  ){
    this.playing = store.select('playing');
    this.buttonData = MidiButtonService.generateButtons();
  }
};
