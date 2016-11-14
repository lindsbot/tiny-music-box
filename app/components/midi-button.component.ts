import { Component, Input } from '@angular/core'; 

@Component({
  selector: 'midi-button',
  styleUrls: ['app/components/midi-button.css'],
  template: `
    <div class="midi-button {{color}}">
    </div>
  `
})

export class MidiButtonComponent { 
  @Input() color: string;
};
