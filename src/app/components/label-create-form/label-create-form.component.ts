import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { Color } from '../../types';
import { Title } from '@angular/platform-browser';

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
  currentColor = signal<Color>({ hex: '#CECED912', opacity: null });
  formTitle = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  onSubmit() {
    
  }

  setColor(color: Color) {
    this.currentColor.set(color);
  }
}