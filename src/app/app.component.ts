import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DateFormComponent } from './components/date-form/date-form.component';
import { OpenFormButtonComponent } from './components/open-form-button/open-form-button.component';
import { LabelCreateFormComponent } from './components/label-create-form/label-create-form.component';
import { SetLabelFormComponentComponent } from './components/set-label-form-component/set-label-form-component.component';
import { ListCreateFormComponent } from './components/list-create-form/list-create-form.component';
import { ListStore } from './stores/list/list-store.service';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { List } from './types';
import { DragScrollDirective } from './directives/drag-scroll/drag-scroll.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListComponent,
    ListCreateFormComponent,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    DragScrollDirective
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';

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
