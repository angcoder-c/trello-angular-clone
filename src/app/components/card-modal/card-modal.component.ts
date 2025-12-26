import { Component, computed, inject, input, output, signal } from '@angular/core';
import { Card, Color, Comment, Label } from '../../types';
import { CardStore } from '../../stores/card/card-store.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { DescriptionFormComponent } from '../description-form/description-form.component';
import { MatIconModule } from '@angular/material/icon';
import { CommentComponent } from '../comment/comment.component';
import { CommentStore } from '../../stores/comment/comment-store.service';
import { OpenFormButtonComponent } from '../open-form-button/open-form-button.component';
import { DatePipe } from '@angular/common';
import { LabelStore } from '../../stores/label/label-store.service';
@Component({
  selector: 'app-card-modal',
  imports: [
    MatIconModule,
    TitleEditableComponent,
    DescriptionFormComponent,
    CommentComponent,
    OpenFormButtonComponent,
    DatePipe
  ],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  private cardStore = inject(CardStore)
  private commentStore = inject(CommentStore)
  private labelStore = inject(LabelStore)
  readonly data = inject(DIALOG_DATA)
  private dialogRef = inject(DialogRef)

  labelAssignments = signal<Map<number, string>>(new Map())

  card = computed<Card | undefined>(()=>{
    return this.cardStore.cards()
    .filter(
      card => card.id === this.data.id
    )[0]
  })

  comments = computed<Comment[]>(()=>{
    return this.commentStore.comments()
    .filter(
      comment => comment.card_id === this.data.id
    )
  })

  labels = computed<Label[]>(()=>{
    return this.labelStore.labels()
    .filter(
      label => label.card_id === this.data.id
    )
  })

  async ngOnInit () {
    await this.commentStore.loadCommentsByCard(this.data.id)
    await this.labelStore.loadLabelsForCard(this.data.id)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async checkCard() {
    await this.cardStore.completeCard(this.card()?.id || '')
  }

  async deleteCard() {
    await this.cardStore.deleteCard(this.card()?.id || '')
    this.dialogRef.close()
  }

  async getNewTitle (title: string) {
    if (!title) return undefined
    await this.cardStore.updateTitle(this.card()?.id as string, title)
  }

  async changeDescription (description: string) {
    if (!description) return undefined
    await this.cardStore.updateDescription(this.card()?.id as string, description)
  }

  async createComment (content: string) {
    if (!this.card() || !content) return undefined

    await this.commentStore.createComment({
      card_id: this.card()?.id as string,
      content: content,
      user: null
    })
  }

  async setMaturity(datetime: string | undefined) {
    if (!datetime || !this.card()) return;
    await this.cardStore.setMaturity(this.card()?.id as string, datetime);
  }

  async removeMaturity() {
    await this.cardStore.setMaturity(this.card()?.id as string, null);
  }

  /*
  async handleLabelToggle(event: { index: number; checked: boolean; option: Partial<Label> }) {
    if (!this.card()) return

    const currentMap = new Map(this.labelAssignments())

    if (event.checked) {
      const created = await this.labelStore.createLabel({
        card_id: this.card()?.id as string,
        name: event.option.name ?? null,
        color: event.option.color ?? { hex: '#000000', opacity: null }
      })
      if (created?.id) {
        currentMap.set(event.index, created.id)
      }
    } else {
      const labelId = currentMap.get(event.index)
      if (labelId) {
        await this.labelStore.deleteLabel(labelId)
        currentMap.delete(event.index)
      }
    }

    this.labelAssignments.set(currentMap)
  }
  */

  handleLabelSave(_event: { index: number | null; name: string | null; color: Color }) {}

  handleLabelClose() {}
}
