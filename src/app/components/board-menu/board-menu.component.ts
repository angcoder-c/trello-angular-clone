import { Component, input, output } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuItem } from "@angular/material/menu";
import { Color } from '../../types';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-board-menu',
  imports: [
    CdkConnectedOverlay,
    MatIconModule,
    MatMenuItem,
    MatMenuModule
],
  templateUrl: './board-menu.component.html',
  styleUrl: './board-menu.component.css'
})
export class BoardMenuComponent {
  readonly currentBackground = input.required<string>();

  selectedBackgroundEvent = output<Color[]>();
  isOpen = false;
  isVisibilitySubmenuOpen = false;

  close () {
    this.isOpen = false;
    this.isVisibilitySubmenuOpen = false;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleVisibilitySubmenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isVisibilitySubmenuOpen = !this.isVisibilitySubmenuOpen;
  }
}