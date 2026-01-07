import { Component, computed, inject, input } from '@angular/core';
import { Board } from '../../types';
import { JsonPipe } from '@angular/common';
import { BoardComponent } from '../../components/board/board.component';

@Component({
  selector: 'app-board-view',
  imports: [
    JsonPipe,
    BoardComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardViewComponent {
  board = input.required<Board | null>();
}
