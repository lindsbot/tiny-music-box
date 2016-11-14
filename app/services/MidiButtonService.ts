import { Injectable } from '@angular/core';
import { midiButtons } from '../data/midi-buttons';

@Injectable()
export class MidiButtonService {
  generateButtons() :any[] {
    return midiButtons;
  }
}