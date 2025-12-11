import { ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'
import { CardStore } from './../../stores/card/card-store.service'; 
import { CardComponent } from './../../components/card/card.component';
import { MatIcon } from '@angular/material/icon'
import { FormControl, FormGroup, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleEditableComponent } from '../title-editable/title-editable.component';

@Component({
  selector: 'app-list',
  imports: [
    MatIcon,
    CardComponent,
    ReactiveFormsModule,
    TitleEditableComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  insertCard = signal<boolean>(false)
  formElementRef=viewChild<ElementRef>('insertFormRef')
  cardTitleInputRef = viewChild<ElementRef>('cardFormInput')
  title = signal<string>('Titulo')
  cardStore = inject(CardStore)

  insertForm = new FormGroup({
    cardTitle: new FormControl('', Validators.required)
  })

  constructor(){}

  async ngOnInit() {
    await this.cardStore.loadCardsByList('8c4fc7c8-dfdf-4c35-8503-b521ecdb137a')
  }
  
  async addCard () {
    let title!: string | undefined
    if(this.insertForm.valid) {
      title = this.insertForm.value.cardTitle?.replaceAll('\n', '')
    }

    if(title) {
      await this.cardStore.createCard({
        position: this.cardStore.cards().length,
        list_id: '8c4fc7c8-dfdf-4c35-8503-b521ecdb137a',
        title: title
      })
    }
    this.insertForm.reset()
  }

  changeInsertCard() {
    this.insertCard.set(true);

    setTimeout(() => {
      const input = this.cardTitleInputRef()?.nativeElement;
      if (input) {
        input.focus();
      }
    });
  }
  
  onInsertBlur() {
    this.insertCard.set(false);
    this.insertForm.reset();
  }

  onInsertCardKeydown(event: KeyboardEvent) {
    console.log(event.key)
    if (event.key === 'Enter') {
      if (this.insertForm.valid) this.addCard()
      this.insertForm.reset();
    } else if (event.key === 'Escape') {
      this.onInsertBlur()
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const formElement = this.formElementRef()?.nativeElement;
    if (!formElement) return;
    if (!formElement.contains(event.target as Node)) {
      this.onInsertBlur();
    }
  }
}
