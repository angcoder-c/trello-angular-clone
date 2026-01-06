import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ListCreateFormComponent } from './components/list-create-form/list-create-form.component';
import { ListStore } from './stores/list/list-store.service';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { List } from './types';
import { DragScrollDirective } from './directives/drag-scroll/drag-scroll.directive';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BoardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';
}
