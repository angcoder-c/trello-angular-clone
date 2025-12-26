import { Component, input, output } from '@angular/core';
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
  optionId = input.required<string>()
  title = input<string | null>()
  colorHex = input<string>()
  isChecked = input<boolean>(false)
  
  onEdit = output<string>()
  onToggle = output<string>() 

  handleEdit() {
    this.onEdit.emit(this.optionId());
  }

  handleCheckboxChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.onToggle.emit(this.optionId());
  }
}
