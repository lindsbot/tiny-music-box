// https://github.com/teropa/harmonics-explorer/blob/master/src/app/services/audio.service.ts
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
var core_1 = require('@angular/core');
var effects_1 = require('@ngrx/effects');
var store_1 = require('@ngrx/store');
var midi_button_1 = require('../reducers/midi-button');
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
        this.play$ = this.actions$
            .ofType(midi_button_1.TOGGLE)
            .withLatestFrom(this.store)
            .do(function (_a) {
            var action = _a[0], state = _a[1];
            // debugger;
            console.log('playing: ' + action['id']);
            _this.play(action['id']);
        });
        this.subscription = effects_1.mergeEffects(this).subscribe(store);
        this.masterGain.connect(this.audioCtx.destination);
        console.log('hey im in the AudioService');
    }
    AudioService.prototype.play = function (id) {
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
