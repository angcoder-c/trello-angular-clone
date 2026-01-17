import { Component, computed, inject, input, signal } from '@angular/core';

// list 
import { ListStore } from '../../stores/list/list-store.service';
import { ListComponent } from '../list/list.component';
import { ListCreateFormComponent } from '../list-create-form/list-create-form.component';
import { Board, Color, List } from '../../types';

// drag and drop
import { 
  CdkDrag, 
  CdkDropList, 
  CdkDragDrop, 
  moveItemInArray, 
  CdkDropListGroup 
} from '@angular/cdk/drag-drop';
import { DragScrollDirective } from '../../directives/drag-scroll/drag-scroll.directive';
import { MatIcon } from '@angular/material/icon';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BoardStore } from '../../stores/board/board-store.service';
import { BoardMenuComponent } from '../board-menu/board-menu.component';
import { backgroundColorToStyle } from '../../colors';
import { StarBorderIcon } from '../../icons/star-border/star-border.component';
import { StarIcon } from '../../icons/star/star.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [
    ListComponent,
    ListCreateFormComponent,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    DragScrollDirective,
    MatIcon,
    MatButtonModule,
    MatMenuModule,
    TitleEditableComponent,
    BoardMenuComponent,
    StarIcon,
    StarBorderIcon,
    JsonPipe
],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  listStore = inject(ListStore)
  boardStore = inject(BoardStore)
  readonly boardId = input.required<string | undefined>()
  readonly boardInput = input.required<Board | null>()

  lists = this.listStore.lists
  board = computed<Board | null | undefined>(() => {
    const boardFromStore = this.boardStore.boards()
      .find(board => board.id === this.boardId())
    
    // Si existe en el store, úsalo; si no, usa el del input
    return boardFromStore ?? this.boardInput()
  })

  boardBgColor = computed(()=>{
    const board = this.board()
    const backgroundColor = board?.backgroundColor
    if (!backgroundColor) return '#083b82'
    return backgroundColorToStyle(backgroundColor)
  })

  constructor() {}

  async ngOnInit() {
    const boardId = this.boardId()
    if (!boardId) return

    await Promise.all([
      this.listStore.loadListsByBoard(boardId),
      this.boardStore.markBoardAsVisited(boardId),
      this.boardStore.loadBoards()
    ])
  }

  createList(name: string) {
    this.listStore.createList(this.boardId() ?? '', name)
  }

  drop(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.lists(), event.previousIndex, event.currentIndex)
    this.listStore.updateListPosition(
      this.boardId() ?? '',
      event.currentIndex,
      event.previousIndex
    )
  }

  async toggleBoardFavorite() {
    const board = this.board()
    if (!board) return
    await this.boardStore.updateBoardFavorite(
      board.id
    )
  }

  async onModifyBoardTitle(newTitle: string) {
    const board = this.board()
    if (!board) return
    await this.boardStore.updateBoardTitle(
      board.id,
      newTitle
    )
  }

  // change background
  async onBackgroundChange(newBackground: Color[]) {
    const board = this.board()
    if (!board) return
    await this.boardStore.updateBoardBackgroundColor(
      board.id,
      newBackground
    )
  }

  // change visibility
  async onVisibilityChange(isPublic: boolean) {
    const board = this.board()
    if (!board) return
    await this.boardStore.updateBoardPublicStatus(
      board.id,
      isPublic
    )
  }

  // change description
  async onDescriptionChange(newDescription: string) {
    const board = this.board()
    if (!board) return
    await this.boardStore.updateBoardDescription(
      board.id,
      newDescription
    )
  }
}
