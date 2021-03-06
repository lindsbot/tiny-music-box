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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var MidiButtonService_1 = require('../services/MidiButtonService');
var AudioService_1 = require('../services/AudioService');
var MidiRainbowComponent = (function () {
    function MidiRainbowComponent(MidiButtonService, AudioService, store) {
        this.MidiButtonService = MidiButtonService;
        this.AudioService = AudioService;
        this.store = store;
        this.playing = store.select('playing');
        this.buttonData = MidiButtonService.generateButtons();
    }
    MidiRainbowComponent = __decorate([
        core_1.Component({
            selector: 'midi-rainbow',
            styleUrls: ['app/components/midi-rainbow.css'],
            providers: [MidiButtonService_1.MidiButtonService, AudioService_1.AudioService],
            template: "\n    <div class=\"midi-rainbow\">\n      <midi-button\n        *ngFor=\"let button of buttonData\"\n        [color]=\"button.color\"\n        [id]=\"button.id\"\n        [note]=\"button.note\"\n      ></midi-button>\n    </div>\n  "
        }),
        core_1.Injectable(),
        __param(0, core_1.Inject(MidiButtonService_1.MidiButtonService)),
        __param(1, core_1.Inject(AudioService_1.AudioService)), 
        __metadata('design:paramtypes', [Object, Object, store_1.Store])
    ], MidiRainbowComponent);
    return MidiRainbowComponent;
}());
exports.MidiRainbowComponent = MidiRainbowComponent;
;
