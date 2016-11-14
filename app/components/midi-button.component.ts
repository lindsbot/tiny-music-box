import { Component, Input } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { START, STOP } from '../reducers/midi-button';

interface AppState {
  status: boolean
}

@Component({
  selector: 'midi-button',
  styleUrls: ['app/components/midi-button.css'],
  template: `
    <div class="midi-button {{color}}"
      (click)="toggle()"
    >
    </div>
  `
})

export class MidiButtonComponent { 
  @Input() color: string;

  status: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.status = store.select('status');
  }

  toggle = function() {

    this.store.dispatch({ type: START });

  }


};
