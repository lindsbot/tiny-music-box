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
var Observable_1 = require('rxjs/Observable');
var store_1 = require('@ngrx/store');
var WindService_1 = require('./services/WindService');
var AppComponent = (function () {
    function AppComponent(store, WindService) {
        this.store = store;
        this.WindService = WindService;
        this.title = 'Tiny Music Box';
        this.playing$ = store.select('playing');
        this.weather$ = store.select('weather');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var clicks = Observable_1.Observable.fromEvent(document.getElementById('refresh-btn'), 'click');
        var timer = Observable_1.Observable.timer(0, 10000);
        var clicksOrTimer = Observable_1.Observable.merge(clicks, timer);
        clicksOrTimer
            .flatMap(function () {
            return _this.WindService.getWeatherData();
        })
            .subscribe();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'music-box',
            styleUrls: ['app/app.css'],
            template: "\n    <h1>{{title}}</h1>\n    <h1>wind is coming from the {{weather$.select('windDirection') | async}}</h1>\n    <h1>current temp is {{weather$.select('tempF') | async}}</h1>\n    <div id=\"refresh-btn\">Click me to refresh weather data</div>\n    <midi-rainbow></midi-rainbow>\n  ",
        }), 
        __metadata('design:paramtypes', [store_1.Store, WindService_1.WindService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
;
