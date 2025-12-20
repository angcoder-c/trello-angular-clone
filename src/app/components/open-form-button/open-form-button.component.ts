import { Component, input, signal, viewChild, ElementRef, HostListener, output } from '@angular/core';
import { DateFormComponent } from '../date-form/date-form.component';

@Component({
  selector: 'app-open-form-button',
  imports: [
    DateFormComponent
  ],
  templateUrl: './open-form-button.component.html',
  styleUrls: ['./open-form-button.component.css']
})
export class OpenFormButtonComponent {
  type = input<'datetime' | 'label' | 'checklist'>()
  buttonText = input<string>()
  open = signal<boolean>(false)
  buttonRef = viewChild<ElementRef>('button')
  formRef = viewChild<ElementRef>('form')
  datetimeEvent = output<string | undefined>();

  openForm() {
    this.open.set(true)
  }

  handleDatetimeEvent(datetime: string | undefined) {
    this.datetimeEvent.emit(datetime);
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
