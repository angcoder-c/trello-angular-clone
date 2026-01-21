import { Component, computed, inject } from '@angular/core';
import { BoardStore } from '../../stores/board/board-store.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { backgroundColorToStyle } from '../../colors';
import { Color } from '../../types';
import { BoardCardComponent } from '../../components/board-card/board-card.component';
import { JsonPipe } from '@angular/common';
import { RecentIcon } from '../../icons/recent-icon/recent-icon.component';
import { StarBorderIcon } from '../../icons/star-border/star-border.component';
import { BoardCreateFormComponent } from '../../components/board-create-form/board-create-form.component';
import { MatIcon } from "@angular/material/icon";
import { BoardIcon } from '../../icons/board-icon/board-icon.component';
import { BoardsComponent } from '../boards/boards.component';
import { AboutComponent } from '../about/about.component';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { GoogleIcon } from '../../icons/google-icon/google-icon.component';

@Component({
  selector: 'app-home-view',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    BoardsComponent,
    AboutComponent,
    MatIcon,
    BoardIcon,
    HeaderComponent,
    GoogleIcon
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeViewComponent {
  authService = inject(AuthService);

  login () {
    this.authService.login();
  }

  logout () {
    this.authService.logout();
  }

  get userProfile() {
    return this.authService.getUserProfile;
  }
}
