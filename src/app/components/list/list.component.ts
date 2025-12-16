import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostListener, inject, input, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'
import { CardStore } from './../../stores/card/card-store.service'; 
import { CardComponent } from './../../components/card/card.component';
import { MatIcon } from '@angular/material/icon'
import { FormControl, FormGroup, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { CreateCardFormComponent } from '../create-card-form/create-card-form.component';
import { Card } from '../../types';

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
  readonly listId = input<string>()
  title = signal<string>('Titulo')
  cardStore = inject(CardStore)
  cards = computed<Card[]>(()=>{
    return this.cardStore.cards()
    .filter(card => 
      card.list_id===this.listId()
    )
  })

  constructor(){}

  async ngOnInit() {
    await this.cardStore.loadCardsByList(this.listId() || '')
  }
}
