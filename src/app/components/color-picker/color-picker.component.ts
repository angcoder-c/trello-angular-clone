import { Component, computed, output, signal } from '@angular/core';
import { colors } from '../../colors';
import { Color } from '../../types';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-color-picker',
  imports: [MatIcon],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css'
})
export class ColorPickerComponent {
  selectColorEvent = output<Color>();
  colors = signal<Color[]>(colors)
  currentColor = signal<Color | null>(null)
  defaultColor = computed<Color>(()=>{
    if (this.currentColor()) {
      return this.currentColor() as Color
    } 
    return { 
      hex: '#CECED912'
    }
  })

  selectColor(color: Color) {
    this.currentColor.set(color)
    this.selectColorEvent.emit(this.defaultColor())
  }

  removeColor() {
    this.currentColor.set(null)
    this.selectColorEvent.emit(this.defaultColor())
  }

  toRgba(color: Color): string {
    if (color) {
      return color.hex
    } else {
      return 'transparent'
    }
  }
}
