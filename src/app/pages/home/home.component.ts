import { Component, computed, inject } from '@angular/core';
import { BoardStore } from '../../stores/board/board-store.service';
import { RouterLink } from "@angular/router";
import { backgroundColorToStyle } from '../../colors';
import { Color } from '../../types';
import { BoardCardComponent } from '../../components/board-card/board-card.component';
import { JsonPipe } from '@angular/common';
import { RecentIcon } from '../../icons/recent-icon/recent-icon.component';
import { StarBorderIcon } from '../../icons/star-border/star-border.component';
import { BoardCreateFormComponent } from '../../components/board-create-form/board-create-form.component';

@Component({
  selector: 'app-home-view',
  imports: [
    RouterLink,
    BoardCardComponent,
    RecentIcon,
    StarBorderIcon,
    BoardCreateFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeViewComponent {
  private boardStore = inject(BoardStore)

  boards = computed(() => {
      const currentBoards = this.boardStore.boards()
      return [...currentBoards]
      .sort((a, b) => 
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
      )
    }
  );

  recentBoards = computed(()=>{
    const currentBoards = this.boardStore.boards()
    console.log('Current Boards:', currentBoards); // Debug
    return [...currentBoards]
    .filter(board => board.last_visit)
    .sort((a, b) => 
      new Date(b.last_visit).getTime() - 
      new Date(a.last_visit).getTime()
    )
    .slice(0, 5);
  })

  favoriteBoards = computed(() =>
    this.boards().filter(board => board.isFavorite)
  );

  async ngOnInit() {
    await this.boardStore.loadBoards();
  }

  getBackgroundStyle(backgroundColor: Color[]): string {
    return backgroundColorToStyle(backgroundColor);
  }

  async toggleBoardFavorite(boardId: string) {
    const board = await this.boardStore.getBoard(boardId);
    if (!board) return
    await this.boardStore.updateBoardFavorite(
      board.id
    )
  }
}
