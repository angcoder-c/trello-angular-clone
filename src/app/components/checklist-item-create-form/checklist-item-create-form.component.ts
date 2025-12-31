import { Component, ElementRef, HostListener, input, output, signal, viewChild } from '@angular/core';
import { OpenFormButtonComponent } from "../open-form-button/open-form-button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-checklist-item-create-form',
  imports: [
    ReactiveFormsModule,
    OpenFormButtonComponent
  ],
  templateUrl: './checklist-item-create-form.component.html',
  styleUrl: './checklist-item-create-form.component.css'
})
export class ChecklistItemCreateFormComponent {
  id = input<string>()
  openForm = signal<boolean>(false)
  formRef = viewChild<ElementRef>('form')
  buttonRef = viewChild<ElementRef>('button')
  maturity = signal<string | undefined>(undefined)

  createItemEvent = output<{
    checklistId: string,
    title: string
    maturity: string | undefined
  }>()

  titleGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  submit() {
    if (this.titleGroup.invalid) return

    this.createItemEvent.emit({
      checklistId: this.id() || '',
      title: this.titleGroup.value.title!,
      maturity: this.maturity()
    })

    this.titleGroup.reset()
    this.maturity.set(undefined)
  }

  cancel() {
    this.openForm.set(false)
    this.titleGroup.reset()
    this.maturity.set(undefined)
  }

  setMaturity(datetime: string | undefined) {
    this.maturity.set(datetime)
  }

  open() {
    this.openForm.set(true)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.openForm()) return;

    const formEl = this.formRef()?.nativeElement as HTMLElement | undefined;
    const buttonEl = this.buttonRef()?.nativeElement as HTMLElement | undefined;
    const target = event.target as Node | null;

    if (!target) {
      this.openForm.set(false);
      return;
    }

    if (formEl?.contains(target) || buttonEl?.contains(target)) {
      return;
    }

    this.openForm.set(false);
  }
}
