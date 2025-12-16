import { Component, computed, inject, input, output, signal } from '@angular/core';
import { Card } from '../../types';
import { CardStore } from '../../stores/card/card-store.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { DescriptionFormComponent } from '../description-form/description-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-modal',
  imports: [
    MatIconModule,
    TitleEditableComponent,
    DescriptionFormComponent
  ],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  private cardStore = inject(CardStore)
  readonly data = inject(DIALOG_DATA)

  card = computed<Card | undefined>(()=>{
    return this.cardStore.cards()
    .filter(
      card => card.id === this.data.id
    )[0]
  })

  async checkCard() {
    await this.cardStore.completeCard(this.card()?.id || '')
  }

  async getNewTitle (title: string) {
    if (!title) return undefined
    await this.cardStore.updateTitle(this.card()?.id as string, title)
  }

  async changeDescription (description: string) {
    if (!description) return undefined
    await this.cardStore.updateDescription(this.card()?.id as string, description)
  }
}
