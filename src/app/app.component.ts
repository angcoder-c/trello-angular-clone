import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BoardCreateFormComponent } from './components/board-create-form/board-create-form.component';
import { TrelloLogo } from './icons/trello-logo/trello-logo.component';
import { MoreIcon } from './icons/more-icon/more-icon.component';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    BoardCreateFormComponent,
    TrelloLogo,
    MoreIcon,
    MatMenuModule,
    HeaderComponent,
    JsonPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';
  authService = inject(AuthService);
  
  get userProfile() {
    return this.authService.getUserProfile;
  }
}
