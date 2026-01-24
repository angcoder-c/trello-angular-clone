import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { CardStore } from '../../stores/card/card-store.service';
import { FormsModule } from '@angular/forms'
import { Card } from '../../types';
import { Dialog, DialogModule } from '@angular/cdk/dialog'
import { CardModalComponent } from '../card-modal/card-modal.component';
import { Subject, takeUntil } from 'rxjs';
import { ListStore } from '../../stores/list/list-store.service';
import { Title } from '@angular/platform-browser';


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
  readonly cardId = input<string>()
  cardData = computed<Card | undefined>(()=>{
    return this.cardStore.cards()
    .filter(
      card => card.id === this.cardId()
    )[0]
  })

  openDialog () {
    this.dialog.open(CardModalComponent, {
      autoFocus: false,
      data: {
        id: this.cardData()?.id
      }
    })
  }

  async deleteCard(){
    await this.cardStore.deleteCard(this.cardData()?.id || '')
  }

  async checkCard() {
    await this.cardStore.completeCard(this.cardData()?.id || '')
  }
}
