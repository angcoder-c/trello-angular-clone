import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TitleEditableComponent } from './components/title-editable/title-editable.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListComponent,
    TitleEditableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';

  changeTitle(title: string){
    console.log(`DESDE APP: ${title}`)
  }
}
