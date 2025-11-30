import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CdkDrag } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CdkDrag
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';
}
