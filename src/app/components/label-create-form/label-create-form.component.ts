import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-label-create-form',
  imports: [
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './label-create-form.component.html',
  styleUrl: './label-create-form.component.css'
})
export class LabelCreateFormComponent {
  

  onSubmit() {
    // 
  }
}