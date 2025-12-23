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
  title = input<string | null>()
  colorHex = input<string>()
  index = input.required<number>()
  isChecked = input<boolean | undefined>(false)
  
  onEdit = output<number>()
  onCheckboxChange = output<{index: number, checked: boolean}>()

  handleEdit() {
    this.onEdit.emit(this.index())
  }

  handleCheckboxChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked
    this.onCheckboxChange.emit({ index: this.index(), checked })
  }
}
