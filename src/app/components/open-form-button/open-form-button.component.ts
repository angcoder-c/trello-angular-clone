import { Component, input, signal, viewChild, ElementRef, HostListener, output } from '@angular/core';
import { DateFormComponent } from '../date-form/date-form.component';
import { SetLabelFormComponentComponent } from '../set-label-form-component/set-label-form-component.component';
import { Color, Label } from '../../types';

@Component({
  selector: 'app-open-form-button',
  imports: [
    DateFormComponent, 
    SetLabelFormComponentComponent
  ],
  templateUrl: './open-form-button.component.html',
  styleUrls: ['./open-form-button.component.css']
})
export class OpenFormButtonComponent {
  type = input<'datetime' | 'label' | 'checklist'>()
  buttonText = input<string>()
  cardId = input<string>()
  open = signal<boolean>(false)
  buttonRef = viewChild<ElementRef>('button')
  formRef = viewChild<ElementRef>('form')
  datetimeEvent = output<string | undefined>();
  labelToggleEvent = output<{ index: number; checked: boolean; option: Partial<Label> }>();
  labelSaveEvent = output<{ index: number | null; name: string | null; color: Color }>();
  labelCloseEvent = output<void>();

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
}
