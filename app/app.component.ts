import { Component } from '@angular/core'; 

@Component({
  selector: 'music-box',
  template: `
    <h1>{{title}}</h1>
  `
})

export class AppComponent { 
  title = 'Tiny Music Box';
};
