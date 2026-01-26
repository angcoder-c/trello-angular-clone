import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { CardStore } from '../../stores/card/card-store.service';
import { Card, Label, Comment } from '../../types';
import { Dialog, DialogModule } from '@angular/cdk/dialog'
import { CardModalComponent } from '../card-modal/card-modal.component';
import { LabelStore } from '../../stores/label/label-store.service';
import { CommentStore } from '../../stores/comment/comment-store.service';


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
  labelStore = inject(LabelStore)
  commentStore = inject(CommentStore)

  readonly cardId = input<string>()

  cardData = computed<Card | undefined>(()=>{
    return this.cardStore.cards()
    .filter(
      card => card.id === this.cardId()
    )[0]
  })

  labels = computed<Label[]>(()=>{
      return this.labelStore.labels()
      .filter(
        label => label.card_id === this.cardData()?.id
      )
    })

  comments = computed<Comment[]>(()=>{
    return this.commentStore.comments()
    .filter(
      comment => comment.card_id === this.cardData()?.id
    )
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
