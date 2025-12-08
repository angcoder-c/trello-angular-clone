import { Component, inject, input, signal } from '@angular/core';
import { CardStore } from '../../stores/card/card-store.service';
import { FormsModule } from '@angular/forms'
import { Card } from '../../types';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cardStore = inject(CardStore)
  cardData = signal<Card | undefined>(undefined)
  readonly data = input<Card>()

  ngOnInit() {
    this.cardData.set(this.data())
  }

  async deleteCard(){
    await this.cardStore.deleteCard(this.cardData()?.id || '')
  }

  async checkCard() {
    await this.cardStore.completeCard(this.cardData()?.id || '')
    this.cardData.update(value => {
      if (!value) return undefined
      return {
        ...value,
        completed: !value.completed
      }
    })
  }
}
