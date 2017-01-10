import { Component, Input, OnInit } from '@angular/core';
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
    {{playing | async}}
    </div>
  `
})

export class MidiButtonComponent implements OnInit {
  @Input() color :string;
  @Input() id :number;

  playing: Observable<boolean>;

  constructor(private store: Store<AppState>) {
  }

  toggle = function() {
    // this is a dumb component, it doesn't need to know about state
    // should just alert reducer it was clicked
    this.store.dispatch({ type: TOGGLE, payload: { id: this.id } });
  }

  ngOnInit () {
    this.playing = this.store.select('playing').select(this.id);
  }

};