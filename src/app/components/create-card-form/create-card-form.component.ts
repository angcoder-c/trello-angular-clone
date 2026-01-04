import { Component, ElementRef, HostListener, inject, input, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardStore } from '../../stores/card/card-store.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-card-form',
  imports: [
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './create-card-form.component.html',
  styleUrl: './create-card-form.component.css'
})
export class CreateCardFormComponent {
  insertCard = signal<boolean>(false)
  formElementRef=viewChild<ElementRef>('insertFormRef')
  cardTitleInputRef = viewChild<ElementRef>('cardFormInput')
  cardStore = inject(CardStore)
  readonly listId = input<string>()

  insertForm = new FormGroup({
    cardTitle: new FormControl('', Validators.required)
  })

  async addCard () {
    let title!: string | undefined
    if(this.insertForm.valid) {
      title = this.insertForm.value.cardTitle?.replaceAll('\n', '')
    }

    if(title) {
      await this.cardStore.createCard({
        position: this.cardStore.cards()
        .filter(
          card => card.list_id === this.listId()
        ).length,
        list_id: this.listId() || '',
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
