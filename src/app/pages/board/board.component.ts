import { Component, computed, inject, input } from '@angular/core';
import { Board } from '../../types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [
    JsonPipe
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  board = input.required<Board | null>();
}
