import { Component, inject } from '@angular/core';
import { BoardStore } from '../../stores/board/board-store.service';
import { RouterLink } from "@angular/router";
import { backgroundColorToStyle } from '../../colors';
import { Color } from '../../types';

@Component({
  selector: 'app-home-view',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeViewComponent {
  private boardStore = inject(BoardStore)

  boards = this.boardStore.boards;

  async ngOnInit() {
    await this.boardStore.loadBoards();
  }

  getBackgroundStyle(backgroundColor: Color[]): string {
    return backgroundColorToStyle(backgroundColor);
  }
}
