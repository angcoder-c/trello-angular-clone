import { Component, inject } from '@angular/core';

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
    TitleEditableComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  listStore = inject(ListStore)

  lists = this.listStore.lists

  ngOnInit() {
    this.listStore.loadListsByBoard('board-uuid-1234')
  }

  createList(name: string) {
    this.listStore.createList('board-uuid-1234', name)
  }

  drop(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.lists(), event.previousIndex, event.currentIndex)
    this.listStore.updateListPosition(
      'board-uuid-1234',
      event.currentIndex,
      event.previousIndex
    )
  }
}
