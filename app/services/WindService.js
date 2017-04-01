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
require('rxjs/Rx');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var store_1 = require('@ngrx/store');
var weather_1 = require('../reducers/weather');
var WindService = (function () {
    function WindService(http, store) {
        this.http = http;
        this.store = store;
    }
    WindService.prototype.getWeatherData = function () {
        var _this = this;
        console.log('running getWeatherData');
        return this.http.get('http://api.wunderground.com/api/17b7007bbc2deb8b/conditions/q/CA/San_Francisco.json')
            .map(function (res) { return res.json(); })
            .withLatestFrom(this.store)
            .do(function (_a) {
            var data = _a[0], store = _a[1];
            _this.store.dispatch({ type: weather_1.RECEIVED_WEATHER_DATA, payload: data.current_observation });
            console.log(data);
        })
            .catch(function (error) {
            return Rx_1.Observable.throw(error.json().error || 'error from wunderground');
        });
    };
    WindService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, store_1.Store])
    ], WindService);
    return WindService;
}());
exports.WindService = WindService;
