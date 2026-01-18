import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BoardCreateFormComponent } from './components/board-create-form/board-create-form.component';
import { TrelloLogo } from './icons/trello-logo/trello-logo.component';
import { MoreIcon } from './icons/more-icon/more-icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    BoardCreateFormComponent,
    TrelloLogo,
    MoreIcon,
    MatMenuModule,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';
}
