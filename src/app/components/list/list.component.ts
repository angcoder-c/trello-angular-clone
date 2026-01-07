import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostListener, inject, input, signal, viewChild } from '@angular/core';
import { CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { CardStore } from './../../stores/card/card-store.service'; 
import { CardComponent } from './../../components/card/card.component';
import { MatIcon } from '@angular/material/icon'
import { FormControl, FormGroup, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { CreateCardFormComponent } from '../create-card-form/create-card-form.component';
import { Card } from '../../types';
import { ListStore } from '../../stores/list/list-store.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-list',
  imports: [
    CardComponent,
    CreateCardFormComponent,
    TitleEditableComponent,
    CdkDrag, 
    CdkDropList,
    MatIcon,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  insertCard = signal<boolean>(false)
  cardTitleInputRef = viewChild<ElementRef>('cardFormInput')
  scrollContainer=viewChild<ElementRef>('scrollContainer')
  readonly listId = input<string>()
  
  listStore = inject(ListStore)
  cardStore = inject(CardStore)

  listsId = computed(()=>{
    return this.listStore.lists()
    .map(list => list.id)
  })

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

  changeInsertCard() {
    this.insertCard.set(true);

    setTimeout(() => {
      const input = this.cardTitleInputRef()?.nativeElement;

      if (input) {
        input.focus();
      }
    }, 0);

    setTimeout(() => {
      const scrollContainer = this.scrollContainer()?.nativeElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = 
          scrollContainer.scrollHeight;
      }
    }, 0);
  }

  closeInsertCard() {
    console.log('cerrando insert card');
    this.insertCard.set(false);
  }

  drop(event: any) {
    const previousIndex = event.previousIndex
    const currentIndex = event.currentIndex

    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.cards(), 
        previousIndex, 
        currentIndex
      )
      this.cardStore.moveCardInList(
        this.listId() || '',
        currentIndex, 
        previousIndex
      )
    } else {
      const originListId = event.previousContainer.id
      const targetListId = event.container.id
      const card: Card = event.previousContainer.data[previousIndex]

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.cardStore.moveCardToAnotherList(
        originListId,
        previousIndex,
        targetListId,
        currentIndex
      )
    }
  }

  async deleteList() {
    const listId = this.listId()
    if (!listId) return;
    await this.listStore.deleteList(listId)
  }
}
