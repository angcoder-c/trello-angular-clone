import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { CardStore } from '../../stores/card/card-store.service';
import { FormsModule } from '@angular/forms'
import { Card } from '../../types';
import { Dialog, DialogModule } from '@angular/cdk/dialog'
import { CardModalComponent } from '../card-modal/card-modal.component';
import { Subject, takeUntil } from 'rxjs';


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
  readonly cardId = input<string>()

  async ngOnInit() {
    const card = await this.cardStore.getCard(this.cardId() || '')
    if (card) this.cardData.set(card)
  }

  openDialog () {
    const dialogRef = this.dialog.open(CardModalComponent, {
      autoFocus: false,
      data: {
        id: this.cardData()?.id
      }
    })

    const subscriptions: any[] = [];
    subscriptions.push(
      dialogRef.componentInstance?.changeCheckEvent.subscribe((completed: boolean) => {
        this.cardData.update(value => {
          if (!value) return undefined
          return {
            ...value,
            completed: completed
          }
        })
      })
    )

    subscriptions.push(
      dialogRef.componentInstance?.changeTitleEvent.subscribe((newTitle: string) => {
        this.cardData.update(value => {
          if (!value) return undefined
          return {
            ...value,
            title: newTitle
          }
        })
      })
    )


    dialogRef.closed.subscribe(() => {
      subscriptions.forEach(sub => sub?.unsubscribe());
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
