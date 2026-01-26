import { Component, inject, input } from '@angular/core';
import { Board } from '../../types';
import { BoardComponent } from '../../components/board/board.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-view',
  imports: [
    BoardComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardViewComponent {
  board = input.required<Board | null>();
  router = inject(Router);

  ngOnInit() {
    if (!this.board()) {
      this.router.navigate(['/not-found']);
    }
  }
}