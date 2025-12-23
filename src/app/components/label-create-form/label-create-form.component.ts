import { Component, input, output, signal, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { Color, Label } from '../../types';

@Component({
  selector: 'app-label-create-form',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    ColorPickerComponent
  ],
  templateUrl: './label-create-form.component.html',
  styleUrl: './label-create-form.component.css'
})
export class LabelCreateFormComponent {
  editMode = input<boolean>(false)
  labelData = input<Partial<Label>>()
  
  currentColor = signal<Color>({ hex: '#CECED912', opacity: null });
  formTitle = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  onBack = output<void>()
  onClose = output<void>()
  onSave = output<{name: string | null, color: Color}>()

  constructor() {
    effect(() => {
      const data = this.labelData()
      if (data && this.editMode()) {
        this.formTitle.patchValue({ title: data.name || '' })
        if (data.color) {
          this.currentColor.set(data.color)
        }
      }
    })
  }

  onSubmit() {
    const titleValue = this.formTitle.value.title?.trim()
    this.onSave.emit({
      name: titleValue || null,
      color: this.currentColor()
    })
  }

  setColor(color: Color) {
    this.currentColor.set(color);
  }

  handleBack() {
    this.onBack.emit()
  }

  handleClose() {
    this.onClose.emit()
  }
}