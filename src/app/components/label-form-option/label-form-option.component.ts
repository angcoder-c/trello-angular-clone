import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-label-form-option',
  imports: [
    MatIcon
  ],
  templateUrl: './label-form-option.component.html',
  styleUrl: './label-form-option.component.css'
})
export class LabelFormOptionComponent {
  title = signal<string | null>(null)
}
