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
require("rxjs/Rx");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var app_component_1 = require("./app.component");
var midi_rainbow_component_1 = require("./components/midi-rainbow.component");
var midi_button_component_1 = require("./components/midi-button.component");
var midi_button_1 = require("./reducers/midi-button");
var weather_1 = require("./reducers/weather");
var WindService_1 = require("./services/WindService");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            store_1.StoreModule.provideStore({
                playing: midi_button_1.MidiButtonReducer,
                weather: weather_1.WeatherReducer,
            }),
            effects_1.EffectsModule
        ],
        providers: [
            WindService_1.WindService
        ],
        declarations: [
            app_component_1.AppComponent,
            midi_rainbow_component_1.MidiRainbowComponent,
            midi_button_component_1.MidiButtonComponent,
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
