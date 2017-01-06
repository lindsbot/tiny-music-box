// http://teropa.info/blog/2016/07/28/javascript-systems-music.html
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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var SAMPLE_LIBRARY = {
    'Grand Piano': [
        { note: 'A', octave: 4, file: 'assets/audio/Samples/Grand Piano/piano-f-a4.wav' },
        { note: 'A', octave: 5, file: 'assets/audio/Samples/Grand Piano/piano-f-a5.wav' },
        { note: 'A', octave: 6, file: 'assets/audio/Samples/Grand Piano/piano-f-a6.wav' },
        { note: 'C', octave: 4, file: 'assets/audio/Samples/Grand Piano/piano-f-c4.wav' },
        { note: 'C', octave: 5, file: 'assets/audio/Samples/Grand Piano/piano-f-c5.wav' },
        { note: 'C', octave: 6, file: 'assets/audio/Samples/Grand Piano/piano-f-c6.wav' },
        { note: 'D#', octave: 4, file: 'assets/audio/Samples/Grand Piano/piano-f-d#4.wav' },
        { note: 'D#', octave: 5, file: 'assets/audio/Samples/Grand Piano/piano-f-d#5.wav' },
        { note: 'D#', octave: 6, file: 'assets/audio/Samples/Grand Piano/piano-f-d#6.wav' },
        { note: 'F#', octave: 4, file: 'assets/audio/Samples/Grand Piano/piano-f-f#4.wav' },
        { note: 'F#', octave: 5, file: 'assets/audio/Samples/Grand Piano/piano-f-f#5.wav' },
        { note: 'F#', octave: 6, file: 'assets/audio/Samples/Grand Piano/piano-f-f#6.wav' }
    ]
};
var Sampler = (function () {
    function Sampler(http) {
    }
    Sampler = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Sampler);
    return Sampler;
}());
var audioContext = new AudioContext();
exports.audioContext = audioContext;
// Sonatina library only supports sharps
function flatToSharp(note) {
    switch (note) {
        case 'Bb': return 'A#';
        case 'Db': return 'C#';
        case 'Eb': return 'D#';
        case 'Gb': return 'F#';
        case 'Ab': return 'G#';
        default: return note;
    }
}
// unique integer for each note
function noteValue(note, octave) {
    return octave * 12 + OCTAVE.indexOf(note);
}
// calculate distance between any two notes
function getNoteDistance(note1, octave1, note2, octave2) {
    return noteValue(note1, octave1) - noteValue(note2, octave2);
}
// use getNoteDistance() to find the nearest sample to requested note
function getNearestSample(sampleBank, note, octave) {
    var sortedBank = sampleBank.slice().sort(function (sampleA, sampleB) {
        var distanceToA = Math.abs(getNoteDistance(note, octave, sampleA.note, sampleA.octave));
        var distanceToB = Math.abs(getNoteDistance(note, octave, sampleB.note, sampleB.octave));
        return distanceToA - distanceToB;
    });
    return sortedBank[0];
}
function fetchSample(path) {
    path = path.replace('#', encodeURIComponent('#'));
    return fetch(path)
        .then(function (response) {
        return response.arrayBuffer();
    })
        .then(function (arrayBuffer) {
        return audioContext.decodeAudioData(arrayBuffer);
    });
}
exports.fetchSample = fetchSample;
function getSample(instrument, noteAndOctave) {
    var regex = /^(\w[b#]?)(\d)$/;
    var inputError = "Nope, your second argument isn't valid. Needs note and octave";
    if (!regex.test(noteAndOctave)) {
        throw inputError;
    }
    var _a = regex.exec(noteAndOctave), requestedNote = _a[1], requestedOctave = _a[2];
    requestedOctave = parseInt(requestedOctave, 10);
    requestedNote = flatToSharp(requestedNote);
    var sampleBank = SAMPLE_LIBRARY[instrument];
    var sample = getNearestSample(sampleBank, requestedNote, requestedOctave);
    var distance = getNoteDistance(requestedNote, requestedOctave, sample.note, sample.octave);
    return fetchSample(sample.file).then(function (audioBuffer) { return ({
        audioBuffer: audioBuffer,
        distance: distance
    }); });
}
function playSample(instrument, note, delaySeconds, pitchShift) {
    if (delaySeconds === void 0) { delaySeconds = 0; }
    if (pitchShift === void 0) { pitchShift = 1; }
    fetchSample('assets/audio/AirportTerminal.wav').then(function (convolverBuffer) {
        getSample(instrument, note).then(function (_a) {
            var audioBuffer = _a.audioBuffer, distance = _a.distance;
            var convolver = audioContext.createConvolver();
            convolver.buffer = convolverBuffer;
            convolver.connect(audioContext.destination);
            // adjust playback rate to achieve pitch shift to correct note
            var playbackRate = Math.pow(2, distance / 12);
            // adjust playback rate of correct note to desired speed
            playbackRate = playbackRate * pitchShift;
            var bufferSource = audioContext.createBufferSource();
            bufferSource.buffer = audioBuffer;
            bufferSource.playbackRate.value = playbackRate;
            bufferSource.connect(convolver);
            bufferSource.start(audioContext.currentTime + delaySeconds);
        });
    });
}
exports.playSample = playSample;
function startLoop(instrument, note, loopLengthSeconds, delaySeconds, pitchShift) {
    playSample(instrument, note, delaySeconds, pitchShift);
    setInterval(function () { return playSample(instrument, note, delaySeconds, pitchShift); }, loopLengthSeconds * 1000);
}
exports.startLoop = startLoop;
function roundToTenths(n) {
    return Math.round(n * 10) / 10;
}
function randomInRange(min, max) {
    return roundToTenths(Math.random() * (max - min) + min);
}
// use ConvolverNode to get reverb!
// wav file is our impulse response sample
// fetchSample('assets/audio/AirportTerminal.wav').then(convolverBuffer => {
//   let convolver = audioContext.createConvolver();
//   convolver.buffer = convolverBuffer;
//   convolver.connect(audioContext.destination)
//   startLoop('Grand Piano', 'F4',  convolver, randomInRange(12, 22), randomInRange(0, 1), 1/3);
//   startLoop('Grand Piano', 'Ab4', convolver, randomInRange(12, 22), randomInRange(0, 5), 1/3);
//   startLoop('Grand Piano', 'C5',  convolver, randomInRange(12, 22), randomInRange(0, 8), 1/3);
//   startLoop('Grand Piano', 'Db5', convolver, randomInRange(12, 22), randomInRange(0, 11), 1/3);
//   startLoop('Grand Piano', 'Eb5', convolver, randomInRange(12, 22), randomInRange(0, 13), 1/3);
//   startLoop('Grand Piano', 'F5',  convolver, randomInRange(12, 22), randomInRange(0, 15), 1/3);
//   startLoop('Grand Piano', 'Ab5', convolver, randomInRange(12, 22), randomInRange(0, 17), 1/3);
// })
