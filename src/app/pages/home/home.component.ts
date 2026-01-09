import { Component, inject } from '@angular/core';
import { BoardStore } from '../../stores/board/board-store.service';
import { RouterLink } from "@angular/router";

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
}
