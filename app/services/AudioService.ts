// https://github.com/teropa/harmonics-explorer/blob/master/src/app/services/audio.service.ts

import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Actions, Effect, mergeEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { TOGGLE } from '../reducers/midi-button';
// import { playSample } from '../sampler' 

import { AppState } from '../app-state';

@Injectable()
export class AudioService implements OnDestroy {
  subscription: Subscription; // Our subscription(s) to @ngrx/effects

  audioCtx = new AudioContext(); // Web Audio AudioContext
  masterGain = this.audioCtx.createGain(); // Master GainNode
  
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {
    this.subscription = mergeEffects(this).subscribe(store);
    this.masterGain.connect(this.audioCtx.destination)
    console.log('hey im in the AudioService')
  }

  // We listen to actions dispatched to @ngrx/store through @ngrx/effects,
  // and act accordingly. For each @Effect in this service we use {dispatch: false}
  // because we're never dispatching any further actions to the store. This service
  // is purely for side effects (= playing sounds)

  @Effect({dispatch: false}) play$ = this.actions$
    .ofType(TOGGLE)
    .withLatestFrom(this.store)
    .do(([action, state]) => {
      // debugger;
      console.log('playing: ' + action['id']);
      this.play(action['id']);
    })
    
  private play(id) {

  }

  // Unsubscribe from @ngrx/effects when destroyed, and also destroy
  // the Web Audio AudioContext.
  // This happens when the app is destroyed during hot reload.
  // The presence of this function will also cause Angular to eagerly
  // initialize this service, so that the subscriptions made in the
  // constructor are made when the application starts.
  ngOnDestroy() {
    this.subscription.unsubscribe();
    (<any>this.audioCtx).close();
  }

}