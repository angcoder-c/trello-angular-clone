import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { CardStore } from '../../stores/card/card-store.service';
import { FormsModule } from '@angular/forms'
import { Card } from '../../types';
import { Dialog, DialogModule } from '@angular/cdk/dialog'
import { CardModalComponent } from '../card/card-modal/card-modal.component';


@Component({
  selector: 'app-card',
  imports: [
    DialogModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  dialog = inject(Dialog)
  cardStore = inject(CardStore)
  cardData = signal<Card | undefined>(undefined)
  readonly data = input<Card>()

  ngOnInit() {
    this.cardData.set(this.data())
  }

  openDialog () {
    this.dialog.open(CardModalComponent, {
      autoFocus: false
    })
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
