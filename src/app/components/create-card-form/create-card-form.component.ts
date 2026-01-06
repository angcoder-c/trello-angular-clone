import { Component, ElementRef, HostListener, inject, input, output, signal, viewChild } from '@angular/core';
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
  cardStore = inject(CardStore)
  onCloseEvent = output<void>()
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

  
  onInsertBlur() {
    this.onCloseEvent.emit();
    this.insertForm.reset();
  }

  onInsertCardKeydown(event: KeyboardEvent) {
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
