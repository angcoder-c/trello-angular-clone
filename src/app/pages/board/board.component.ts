import { Component, computed, inject, input } from '@angular/core';
import { Board } from '../../types';
import { JsonPipe } from '@angular/common';
import { BoardComponent } from '../../components/board/board.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BoardStore } from '../../stores/board/board-store.service';

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