import { Component, input, signal, viewChild, ElementRef, HostListener, output } from '@angular/core';
import { DateFormComponent } from '../date-form/date-form.component';
import { SetLabelFormComponentComponent } from '../set-label-form-component/set-label-form-component.component';
import { Color, Label } from '../../types';
import { ChecklistCreateFormComponent } from '../checklist-create-form/checklist-create-form.component';

@Component({
  selector: 'app-open-form-button',
  imports: [
    DateFormComponent, 
    SetLabelFormComponentComponent,
    ChecklistCreateFormComponent
  ],
  templateUrl: './open-form-button.component.html',
  styleUrls: ['./open-form-button.component.css']
})
export class OpenFormButtonComponent {
  type = input<'datetime' | 'label' | 'checklist'>()
  buttonText = input<string>()
  cardId = input<string>()
  listId = input<string>()
  currentDatetime = input<string | undefined | null>()

  labelToggleEvent = output<{ index: number; checked: boolean; option: Partial<Label> }>()
  labelSaveEvent = output<{ index: number | null; name: string | null; color: Color }>()
  labelCloseEvent = output<void>()
  datetimeEvent = output<string | undefined>()
  newChecklistTitleEvent = output<string | undefined>()

  buttonRef = viewChild<ElementRef>('button')
  formRef = viewChild<ElementRef>('form')
  
  open = signal<boolean>(false)

  openForm() {
    this.open.set(true)
  }

  handleDatetimeEvent(datetime: string | undefined) {
    this.datetimeEvent.emit(datetime);
    this.open.set(false)
  }

  handleLabelToggle(event: { index: number; checked: boolean; option: Partial<Label> }) {
    this.labelToggleEvent.emit(event)
  }

  handleLabelSave(event: { index: number | null; name: string | null; color: Color }) {
    this.labelSaveEvent.emit(event)
  }

  handleLabelClose() {
    this.labelCloseEvent.emit()
    this.open.set(false)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.open()) return;

    const formEl = this.formRef()?.nativeElement as HTMLElement | undefined;
    const buttonEl = this.buttonRef()?.nativeElement as HTMLElement | undefined;
    const target = event.target as Node | null;

    if (!target) {
      this.open.set(false);
      return;
    }

    if (formEl?.contains(target) || buttonEl?.contains(target)) {
      return;
    }

    this.open.set(false);
  }

  emitNewChecklistTitle(title: string | undefined) {
    this.newChecklistTitleEvent.emit(title)
  }
}
