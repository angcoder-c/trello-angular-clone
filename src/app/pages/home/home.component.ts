import { Component, inject } from '@angular/core';
import { BoardStore } from '../../stores/board/board-store.service';

@Component({
  selector: 'app-home-view',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeViewComponent {
  private boardStore = inject(BoardStore)
}
