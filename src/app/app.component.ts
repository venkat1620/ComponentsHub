import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    onClick(event) {
      console.log(JSON.stringify(event.target.id) + 'clicked');
    }
}
