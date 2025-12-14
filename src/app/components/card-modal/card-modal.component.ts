import { Component, inject, input, output, signal } from '@angular/core';
import { Card } from '../../types';
import { CardStore } from '../../stores/card/card-store.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { DescriptionFormComponent } from '../description-form/description-form.component';

@Component({
  selector: 'app-card-modal',
  imports: [
    TitleEditableComponent,
    DescriptionFormComponent
  ],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  private cardStore = inject(CardStore)
  readonly data = inject(DIALOG_DATA)
  readonly changeCheckEvent = output<boolean>()
  readonly changeTitleEvent = output<string>()
  card = signal<Card | undefined>(undefined)

  async ngOnInit() {
    const card = await this.cardStore.getCard(this.data.id || '')
    if (card) this.card.set(card)
  }

  async checkCard() {
    await this.cardStore.completeCard(this.card()?.id || '')
    this.card.update(value => {
      if (!value) return undefined
      this.changeCheckEvent.emit(!value.completed)
      return {
        ...value,
        completed: !value.completed
      }
    })
  }

  async getNewTitle (title: string) {
    if (!title) return undefined
    await this.cardStore.updateTitle(this.card()?.id as string, title)
    this.card.update(value => {
      if (!value) return undefined
      this.changeTitleEvent.emit(title)
      return {
        ...value, 
        title: title
      }
    })
  }

  async changeDescription (description: string) {
    if (!description) return undefined
    await this.cardStore.updateDescription(this.card()?.id as string, description)
    this.card.update(value=>{
      if (!value) return undefined
      return {
        ...value, 
        description
      }
    })
  }
}
