import { ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'
import { CardStore } from './../../stores/card/card-store.service'; 
import { CardComponent } from './../../components/card/card.component';
import { MatIcon } from '@angular/material/icon'
import { FormControl, FormGroup, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { CreateCardFormComponent } from '../create-card-form/create-card-form.component';

@Component({
  selector: 'app-list',
  imports: [
    CardComponent,
    CreateCardFormComponent,
    TitleEditableComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  title = signal<string>('Titulo')
  cardStore = inject(CardStore)

  constructor(){}

  async ngOnInit() {
    await this.cardStore.loadCardsByList('8c4fc7c8-dfdf-4c35-8503-b521ecdb137a')
  }
}
