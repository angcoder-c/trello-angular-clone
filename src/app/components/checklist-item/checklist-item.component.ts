import { Component, input, output } from '@angular/core';
import { CheckListItem } from '../../types';
import { JsonPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-checklist-item',
  imports: [
    DatePipe,
    MatIcon
  ],
  templateUrl: './checklist-item.component.html',
  styleUrl: './checklist-item.component.css'
})
export class ChecklistItemComponent {
  item = input<CheckListItem>()

  checkEvent = output<string>()
  deleteEvent = output<string>()

  toggleCompletion (){
    this.checkEvent.emit(this.item()?.id || '')
  }

  deleteChecklistItem(){
    this.deleteEvent.emit(this.item()?.id || '')
  }
}
