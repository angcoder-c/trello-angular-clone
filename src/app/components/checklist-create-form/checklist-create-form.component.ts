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
  titleEvent = output<string>()
  labelCloseEvent = output<void>()

  formTitle = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)])
  })

  handleClose() {
    this.labelCloseEvent.emit()
  }
}
