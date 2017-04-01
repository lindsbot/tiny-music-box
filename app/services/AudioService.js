"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// https://github.com/teropa/harmonics-explorer/blob/master/src/app/services/audio.service.ts
var core_1 = require('@angular/core');
var effects_1 = require('@ngrx/effects');
var store_1 = require('@ngrx/store');
var midi_button_1 = require('../reducers/midi-button');
var midi_buttons_1 = require('../data/midi-buttons');
var AudioService = (function () {
    function AudioService(actions$, store) {
        var _this = this;
        this.actions$ = actions$;
        this.store = store;
        this.audioCtx = new AudioContext(); // Web Audio AudioContext
        this.masterGain = this.audioCtx.createGain(); // Master GainNode
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
        this.play$ = this.actions$
            .ofType(midi_button_1.SUSTAIN)
            .withLatestFrom(this.store)
            .do(function (_a) {
            var action = _a[0], state = _a[1];
            _this.playSustain(action.payload.id);
        });
        this.subscription = effects_1.mergeEffects(this).subscribe(store);
        this.masterGain.connect(this.audioCtx.destination);
        console.log('hey im in the AudioService');
    }
    AudioService.prototype.playSustain = function (id) {
        var button = midi_buttons_1.midiButtons.filter(function (button) { return button.id === id; })[0];
        var oscillator = this.audioCtx.createOscillator();
        var gain = this.audioCtx.createGain();
        oscillator.frequency.value = button.frequency;
        oscillator.type = 'sine';
        oscillator.connect(gain);
        gain.connect(this.masterGain);
        oscillator.start(this.audioCtx.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(button.amplitude, this.audioCtx.currentTime + 2);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 5);
    };
    AudioService.prototype.play = function (id, state) {
        var _this = this;
        // Ramp master volume up over 30ms.
        // (Using ramp to prevent "pops", http://teropa.info/blog/2016/08/30/amplitude-and-loudness.html)
        this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.5, this.audioCtx.currentTime + 0.03);
        this.oscillatorBank = midi_buttons_1.midiButtons.map(function (button) {
            var oscillator = _this.audioCtx.createOscillator();
            var gain = _this.audioCtx.createGain();
            var id = button.id;
            oscillator.frequency.value = button.frequency;
            gain.gain.value = button.amplitude;
            return { oscillator: oscillator, gain: gain, id: id };
        });
        this.oscillatorBank.forEach(function (item) {
            if (id === item.id) {
                item.oscillator.connect(item.gain);
                item.gain.connect(_this.masterGain);
                // Start playing immediately
                item.oscillator.start();
            }
        });
        console.log('playing: ' + id);
    };
    AudioService.prototype.pause = function (id, state) {
        var context = this.audioCtx;
        this.oscillatorBank.forEach(function (item) {
            if (id === item.id) {
                console.log('pausing: ' + id);
                console.log(context);
                item.gain.gain.linearRampToValueAtTime(0, item.gain.context.currentTime + 0.03);
                item.oscillator.disconnect();
                item.gain.disconnect();
            }
        });
    };
    // Unsubscribe from @ngrx/effects when destroyed, and also destroy
    // the Web Audio AudioContext.
    // This happens when the app is destroyed during hot reload.
    // The presence of this function will also cause Angular to eagerly
    // initialize this service, so that the subscriptions made in the
    // constructor are made when the application starts.
    AudioService.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.audioCtx.close();
    };
    __decorate([
        effects_1.Effect({ dispatch: false }), 
        __metadata('design:type', Object)
    ], AudioService.prototype, "play$", void 0);
    AudioService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [effects_1.Actions, store_1.Store])
    ], AudioService);
    return AudioService;
}());
exports.AudioService = AudioService;
