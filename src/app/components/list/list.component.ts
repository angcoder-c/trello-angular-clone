import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostListener, inject, input, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'
import { CardStore } from './../../stores/card/card-store.service'; 
import { CardComponent } from './../../components/card/card.component';
import { MatIcon } from '@angular/material/icon'
import { FormControl, FormGroup, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { CreateCardFormComponent } from '../create-card-form/create-card-form.component';
import { Card } from '../../types';
import { ListStore } from '../../stores/list/list-store.service';

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
  
  listStore = inject(ListStore)
  cardStore = inject(CardStore)

  listData = computed(()=>{
    return this.listStore.lists()
    .find(list => list.id===this.listId())
  })

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

  async onModifyListTitle(newTitle: string) {
    const listId = this.listId()
    if (!listId) return;
    await this.listStore.updateListName(listId, newTitle)
  }
}
