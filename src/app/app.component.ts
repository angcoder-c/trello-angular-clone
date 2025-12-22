import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DateFormComponent } from './components/date-form/date-form.component';
import { OpenFormButtonComponent } from './components/open-form-button/open-form-button.component';
import { LabelCreateFormComponent } from './components/label-create-form/label-create-form.component';
import { SetLabelFormComponentComponent } from './components/set-label-form-component/set-label-form-component.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ListComponent,
    DateFormComponent,
    OpenFormButtonComponent,
    LabelCreateFormComponent,
    SetLabelFormComponentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trello-angular-clone';
}
