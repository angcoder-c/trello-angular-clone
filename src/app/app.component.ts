import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TitleEditableComponent } from './components/title-editable/title-editable.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';
}
