import { Component, ElementRef, HostListener, output, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-list-create-form',
  imports: [
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './list-create-form.component.html',
  styleUrl: './list-create-form.component.css'
})
export class ListCreateFormComponent {
  openForm = signal<boolean>(false)
  formRef = viewChild<ElementRef>('form')
  buttonRef = viewChild<ElementRef>('button')

  readonly createListEvent = output<string>()

  titleGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  submit() {
    if (this.titleGroup.invalid) return
    this.createListEvent.emit(this.titleGroup.value.title!)
    this.titleGroup.reset()
  }

  cancel() {
    this.openForm.set(false)
    this.titleGroup.reset()
  }

  open() {
    this.openForm.set(true)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.openForm()) return

    const formEl = this.formRef()?.nativeElement as HTMLElement | undefined
    const buttonEl = this.buttonRef()?.nativeElement as HTMLElement | undefined
    const target = event.target as Node | null

    if (!target) {
      this.openForm.set(false)
      this.titleGroup.reset()
      return
    }

    if (formEl?.contains(target) || buttonEl?.contains(target)) {
      return
    }

    this.openForm.set(false)
    this.titleGroup.reset()
  }
}
