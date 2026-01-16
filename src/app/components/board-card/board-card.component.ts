import { Component, input, output } from '@angular/core';
import { Board, Color } from '../../types';
import { backgroundColorToStyle } from '../../colors';
import { RouterLink } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { StarIcon } from '../../icons/star/star.component';
import { StarBorderIcon } from '../../icons/star-border/star-border.component';

@Component({
  selector: 'app-board-card',
  imports: [
    RouterLink,
    StarBorderIcon,
    StarIcon
],
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.css'
})
export class BoardCardComponent {
  board = input.required<Board>()
  isFavoriteEvent = output<string>();

  getBackgroundStyle(backgroundColor: Color[]): string {
    return backgroundColorToStyle(backgroundColor);
  }

  toggleBoardFavorite(event: Event) {
    event.stopPropagation();
    this.isFavoriteEvent.emit(this.board().id);
  }
}
