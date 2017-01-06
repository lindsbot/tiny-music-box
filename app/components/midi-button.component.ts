import { Component, Input } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app-state'

import { TOGGLE } from '../reducers/midi-button';

@Component({
  selector: 'midi-button',
  styleUrls: ['app/components/midi-button.css'],
  template: `
    <div class="midi-button {{color}}"
      (click)="toggle()"
    >
    {{id}}
    </div>
  `
})

export class MidiButtonComponent { 
  @Input() color: string;
  @Input() id: number;

  playing: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.playing = store.select('playing');
  }

  toggle = function() {
    this.store.dispatch({ type: TOGGLE, id: this.id });
  }

};
