import { MidiButtonService } from './MidiButtonService';
// https://github.com/teropa/harmonics-explorer/blob/master/src/app/services/audio.service.ts

import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Actions, Effect, mergeEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { TOGGLE, SUSTAIN } from '../reducers/midi-button';

import { AppState } from '../app-state';

import { midiButtons } from '../data/midi-buttons';

interface OscillatorBankItem {
  oscillator: OscillatorNode;
  gain: GainNode;
  id: String;
}

@Injectable()
export class AudioService implements OnDestroy {
  subscription: Subscription; // Our subscription(s) to @ngrx/effects

  audioCtx = new AudioContext(); // Web Audio AudioContext
  masterGain = this.audioCtx.createGain(); // Master GainNode

  oscillatorBank: Array<OscillatorBankItem>;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {

    this.subscription = mergeEffects(this).subscribe(store);
    this.masterGain.connect(this.audioCtx.destination);

    console.log('hey im in the AudioService');
  }

  // We listen to actions dispatched to @ngrx/store through @ngrx/effects,
  // and act accordingly. For each @Effect in this service we use {dispatch: false}
  // because we're never dispatching any further actions to the store. This service
  // is purely for side effects (= playing sounds)

  // @Effect({dispatch: false}) play$ = this.actions$
  //   .ofType(TOGGLE)
  //   .withLatestFrom(this.store)
  //   .do(([action, state]) => {
  //     console.log('state on effect: ');
  //     console.dir(state);
  //     console.log('handling toggle for ' + action.payload.id)
  //     if (state.playing[action.payload.id]) {
  //       this.play(action.payload.id, state);
  //     } else {
  //       this.pause(action.payload.id, state);
  //     }
  //   })

  @Effect({dispatch: false}) play$ = this.actions$
    .ofType(SUSTAIN)
    .withLatestFrom(this.store)
    .do(([action, state]) => {
      this.playSustain(action.payload.id);
    });

  private playSustain(id: string) {
    const button = midiButtons.filter((button) => { return button.id === id })[0];
    const oscillator = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    oscillator.frequency.value = button.frequency;
    oscillator.type = 'sine';

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    oscillator.start(this.audioCtx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(button.amplitude, this.audioCtx.currentTime + 2);
    
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 5);
  }

  private play(id :string, state :AppState) {
    // Ramp master volume up over 30ms.
    // (Using ramp to prevent "pops", http://teropa.info/blog/2016/08/30/amplitude-and-loudness.html)
    this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.5, this.audioCtx.currentTime + 0.03);

    this.oscillatorBank = <Array<OscillatorBankItem>>midiButtons.map(button => {
      const oscillator = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const id = button.id;

      oscillator.frequency.value = button.frequency;
      gain.gain.value = button.amplitude;

      return {oscillator, gain, id};
    })

    this.oscillatorBank.forEach(item => {
      if (id === item.id) {
        item.oscillator.connect(item.gain);
        item.gain.connect(this.masterGain);

        // Start playing immediately
        item.oscillator.start();

      }
    })

    console.log('playing: ' + id);
  }

  private pause(id :string, state :AppState) {
    let context = this.audioCtx;

    this.oscillatorBank.forEach(item => {
      if (id === item.id) {
        console.log('pausing: ' + id);
        console.log(context);
        item.gain.gain.linearRampToValueAtTime(0, item.gain.context.currentTime + 0.03);
        item.oscillator.disconnect();
        item.gain.disconnect();
      }
    });

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