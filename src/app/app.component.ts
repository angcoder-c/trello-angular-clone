import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DateFormComponent } from './components/date-form/date-form.component';
import { OpenFormButtonComponent } from './components/open-form-button/open-form-button.component';
import { LabelCreateFormComponent } from './components/label-create-form/label-create-form.component';
import { SetLabelFormComponentComponent } from './components/set-label-form-component/set-label-form-component.component';
import { ListCreateFormComponent } from './components/list-create-form/list-create-form.component';
import { ListStore } from './stores/list/list-store.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListComponent,
    ListCreateFormComponent
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
}
