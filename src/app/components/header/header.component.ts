import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { BoardIcon } from '../../icons/board-icon/board-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    BoardIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
