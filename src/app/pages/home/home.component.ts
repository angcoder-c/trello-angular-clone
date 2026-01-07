import { Component, inject } from '@angular/core';
import { BoardStore } from '../../stores/board/board-store.service';
import { db } from '../../db';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private boardStore = inject(BoardStore)
}
