import { Component, computed, inject, input } from '@angular/core';

// list 
import { ListStore } from '../../stores/list/list-store.service';
import { ListComponent } from '../list/list.component';
import { ListCreateFormComponent } from '../list-create-form/list-create-form.component';
import { List } from '../../types';

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
],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  listStore = inject(ListStore)
  boardStore = inject(BoardStore)
  readonly boardId = input<string>()

  lists = this.listStore.lists
  board = computed(()=>{
    return this.boardStore.boards()
    .find(board => board.id===this.boardId())
  })

  boardBgColor = computed(()=>{
    const board = this.board()
    const backgroundColor = board?.backgroundColor
    if (!backgroundColor || backgroundColor.length===0) return '#083b82'
    const initPorcentageGradient = 100 / backgroundColor.length

    const bgColorsGradient = backgroundColor.map((color, index) => {
      if (!color.hex) return '#083b82'
      return `${color.hex} ${initPorcentageGradient * (index)}%`
    })
    
    return `linear-gradient(135deg, ${bgColorsGradient.join(', ')})`
  })

  constructor() {}

  ngOnInit() {
    this.listStore.loadListsByBoard(this.boardId() ?? '')
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
}
