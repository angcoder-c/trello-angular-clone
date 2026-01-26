import { Component, inject, computed } from '@angular/core';
import { BoardStore } from '../../stores/board/board-store.service';
import { StarIcon } from '../../icons/star/star.component';
import { StarBorderIcon } from '../../icons/star-border/star-border.component';
import { BoardCardComponent } from '../../components/board-card/board-card.component';
import { RecentIcon } from '../../icons/recent-icon/recent-icon.component';
import { BoardCreateFormComponent } from '../../components/board-create-form/board-create-form.component';
import { backgroundColorToStyle } from '../../colors';
import { Color } from '../../types';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-boards',
  imports: [
    StarBorderIcon,
    RecentIcon,
    BoardCardComponent,
    BoardCreateFormComponent
  ],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})
export class BoardsComponent {
  private boardStore = inject(BoardStore)
  private authStore = inject(AuthService)

  boards = computed(() => {
      const currentBoards = [...this.boardStore.boards()]
      const user = this.authStore.user()
      
      return user ? 
      currentBoards
      .filter(
        board => board.user_email === user['email']
      ) : 
      currentBoards.filter(
        board => board.user_email === null
      ) 
      .sort((a, b) => 
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
      )
    }
  );

  recentBoards = computed(()=>{
    const currentBoards = [...this.boardStore.boards()]
    const user = this.authStore.user()
    return user ? 
      currentBoards
      .filter(
        board => board.user_email === user['email']
      ) : 
      currentBoards.filter(
        board => board.user_email === null
      ) 
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
