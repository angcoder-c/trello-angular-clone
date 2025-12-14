import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ChangeTextValidator } from '../../validators/change-text.validator';
import { CleanTextValidator } from '../../validators/clean-text.validator';

@Component({
  selector: 'app-description-form',
  imports: [
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './description-form.component.html',
  styleUrl: './description-form.component.css'
})
export class DescriptionFormComponent {
  currentDescription = signal<string>('')
  readonly description = input<string | null>()
  readonly changeDescriptionEvent = output<string>()

  descriptionForm = new FormGroup({
    description: new FormControl(this.currentDescription(), [
      Validators.required,
      ChangeTextValidator(this.currentDescription),
      CleanTextValidator()
    ])
  })

  constructor () {
    effect(()=>{
      const currentDescription = this.description()
      if (currentDescription) {
        this.currentDescription.set(currentDescription);
        this.descriptionForm.get('description')?.setValue(currentDescription)
      }
    })
  }

  ngOnInit() {
    this.currentDescription.set(this.description() || '')
  }

  save() {
    if (!this.descriptionForm.valid) return undefined
  
    const description = this.descriptionForm.value.description
    if (!description) return undefined
    
    const filteredDescription = description.split('').filter(value => value !== '\n').length
    
    if (filteredDescription > 0) {
      this.currentDescription.set(description);
      this.changeDescriptionEvent.emit(description)
    }
  }
}
