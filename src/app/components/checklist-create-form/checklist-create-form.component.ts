import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-checklist-create-form',
  imports: [
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './checklist-create-form.component.html',
  styleUrl: './checklist-create-form.component.css'
})
export class ChecklistCreateFormComponent {
  titleEvent = output<string | undefined>()
  labelCloseEvent = output<void>()

  formTitle = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)])
  })

  onSubmit() {
    if (this.formTitle.valid) {
      this.titleEvent.emit(this.formTitle.value.title as string)
      this.labelCloseEvent.emit()
      this.formTitle.reset()
    }
  }

  handleClose() {
    this.labelCloseEvent.emit()
    this.formTitle.reset()
    this.titleEvent.emit(undefined)
  }
}
