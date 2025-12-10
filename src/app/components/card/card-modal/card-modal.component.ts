import { Component, inject, input, signal } from '@angular/core';
import { Card } from '../../../types';
import { CardStore } from '../../../stores/card/card-store.service';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-card-modal',
  imports: [],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  private cardStore = inject(CardStore)
  readonly data = inject(DIALOG_DATA)
  card = signal<Card | undefined>(undefined)

  async ngOnInit() {
    const card = await this.cardStore.getCard(this.data.id || '')
    if (card) this.card.set(card)
  }
}
