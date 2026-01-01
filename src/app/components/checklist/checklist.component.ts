import { Component, inject, input, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CheckList, CheckListExtended } from '../../types';
import { ChecklistStore } from '../../stores/checklist/checklist-store.service';
import { ChecklistItemComponent } from '../checklist-item/checklist-item.component';
import { ChecklistItemCreateFormComponent } from '../checklist-item-create-form/checklist-item-create-form.component';

@Component({
  selector: 'app-checklist',
  imports: [
    MatIcon,
    ChecklistItemComponent,
    ChecklistItemCreateFormComponent
  ],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent {
  checklist = input<CheckListExtended>();
  completionPercentage = input<number>(0);

  deleteChecklistEvent = output<string>()

  // events from checklist items
  toggleCompletionEvent = output<string>()
  deleteChecklistItemEvent = output<string>()
  addChecklistItemEvent = output<{
      checklistId: string;
      title: string;
      maturity: string | undefined;
  }>()

  
  deleteChecklist(): void {
    this.deleteChecklistEvent.emit(this.checklist()?.id || '');
  }

  toggleCompletion(itemId: string): void {
    this.toggleCompletionEvent.emit(itemId);
  }

  deleteItem(itemId: string): void {
    this.deleteChecklistItemEvent.emit(itemId);
  }

  addItem (item: {
      checklistId: string;
      title: string;
      maturity: string | undefined;
  }): void {
    this.addChecklistItemEvent.emit(item);
  } 
}