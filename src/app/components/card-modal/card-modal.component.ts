import { Component, computed, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { Card, Color, Comment, Label, CheckList, CheckListItem, CheckListExtended } from '../../types';
import { CardStore } from '../../stores/card/card-store.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TitleEditableComponent } from '../title-editable/title-editable.component';
import { DescriptionFormComponent } from '../description-form/description-form.component';
import { MatIconModule } from '@angular/material/icon';
import { CommentComponent } from '../comment/comment.component';
import { CommentStore } from '../../stores/comment/comment-store.service';
import { OpenFormButtonComponent } from '../open-form-button/open-form-button.component';
import { DatePipe, NgIf } from '@angular/common';
import { LabelStore } from '../../stores/label/label-store.service';
import { ChecklistStore } from '../../stores/checklist/checklist-store.service';
import { ChecklistItemCreateFormComponent } from '../checklist-item-create-form/checklist-item-create-form.component';

@Component({
  selector: 'app-card-modal',
  imports: [
    MatIconModule,
    TitleEditableComponent,
    DescriptionFormComponent,
    CommentComponent,
    OpenFormButtonComponent,
    DatePipe,
    ChecklistItemCreateFormComponent,
    NgIf
],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  private cardStore = inject(CardStore)
  private commentStore = inject(CommentStore)
  private labelStore = inject(LabelStore)
  private checklistStore = inject(ChecklistStore)
  readonly data = inject(DIALOG_DATA)
  private dialogRef = inject(DialogRef)

  labelAssignments = signal<Map<number, string>>(new Map())

  // checklist card scroll refs
  checklistSectionRef = viewChild<ElementRef>('checklistSection')
  contentContainerRef = viewChild<ElementRef>('contentContainer')
  parentContentContainerRef = viewChild<ElementRef>('parentContentContainer')

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

  checklists = computed<CheckListExtended[]>(()=>{
    const cls = this.checklistStore.checklists()
    return cls.map(cl => ({
      ...cl,
      items: this.checklistStore.checklistItems()
      .filter(item => item.checklist_id === cl.id)
    }))
  })

  async ngOnInit () {
    await this.commentStore.loadCommentsByCard(this.data.id)
    await this.labelStore.loadLabelsForCard(this.data.id)
    await this.checklistStore.loadChecklistsByCard(this.data.id)
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

  async createNewChecklist(title: string | undefined) {
    if (!title || !this.card()) return undefined;

    const newChecklist = await this.checklistStore.createChecklist(
      this.card()?.id as string,
      title
    )
     setTimeout(() => this.scrollToLastChecklist(), 0);
  }

  async deleteChecklist(checklistId: string) {
    await this.checklistStore.deleteChecklist(checklistId);
  }

  scrollToLastChecklist() {
      const checklistSection = this.checklistSectionRef()?.nativeElement;
      if (!checklistSection) return;

      const checklistItems = checklistSection.querySelectorAll('[data-checklist-item]');
      const lastChecklist = checklistItems[checklistItems.length - 1];

      if (!lastChecklist) return;

      const isLargeScreen = window.innerWidth >= 1024; // lg de Tailwind
      
      if (isLargeScreen) {
          const containerEl = this.contentContainerRef()?.nativeElement;
          if (containerEl) {
              const offsetTop = lastChecklist.offsetTop - containerEl.offsetTop;
              containerEl.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
      } else {
          const parentEl = this.parentContentContainerRef()?.nativeElement;
          if (parentEl) {
              const offsetTop = lastChecklist.offsetTop - parentEl.offsetTop;
              parentEl.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
      }
  }

  async addItemToChecklist(event: { 
    checklistId: string,
    title: string, 
    maturity: string | undefined 
  }) {
    if (!event.title) return;
    const checklist = await this.checklistStore.addChecklistItem(event.checklistId, event.title);
    if (checklist && event.maturity) {
      await this.checklistStore.updateChecklistItemMaturity(
        checklist.id, 
        event.maturity
      );
    }
  }

  async deleteChecklistItem(itemId: string) {
    await this.checklistStore.deleteChecklistItem(itemId);
  }

  async toggleChecklistItemCompletion(itemId: string) {
    await this.checklistStore.toggleChecklistItemCompletion(itemId);
  }

  calculateChecklistProgress(checklist: CheckListExtended): number {
    return this.checklistStore.calculateChecklistCompletion(checklist.id);
  }

  handleLabelSave(_event: { index: number | null; name: string | null; color: Color }) {}

  handleLabelClose() {}
}
