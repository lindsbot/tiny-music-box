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
var store_1 = require('@ngrx/store');
var midi_button_1 = require('../reducers/midi-button');
var MidiButtonComponent = (function () {
    function MidiButtonComponent(store) {
        this.store = store;
    }
    MidiButtonComponent.prototype.playButton = function () {
        // this is a dumb component, it doesn't need to know about state
        // should just alert reducer it was clicked
        this.store.dispatch({ type: midi_button_1.SUSTAIN, payload: { id: this.id } });
    };
    MidiButtonComponent.prototype.ngOnInit = function () {
        // this.playing = this.store.select('playing').select(this.id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MidiButtonComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MidiButtonComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MidiButtonComponent.prototype, "note", void 0);
    MidiButtonComponent = __decorate([
        core_1.Component({
            selector: 'midi-button',
            styleUrls: ['app/components/midi-button.css'],
            template: "\n    <div class=\"midi-button {{color}}\"\n      (mouseenter)=\"playButton()\"\n    >\n    {{note}}\n    {{playing | async}}\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], MidiButtonComponent);
    return MidiButtonComponent;
}());
exports.MidiButtonComponent = MidiButtonComponent;
;
