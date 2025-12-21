import { Component, computed, signal } from '@angular/core';
import { colors } from '../../colors';
import { Color } from '../../types';

@Component({
  selector: 'app-color-picker',
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css'
})
export class ColorPickerComponent {
  colors = signal<Color[]>(colors)
  currentColor = signal<Color | null>(null)
  defaultColor = computed<Color>(()=>{
    if (this.currentColor()) {
      return this.currentColor() as Color
    } 
    return { 
      hex: '#CECED912', 
      opacity: null 
    }
  })

  selectColor(color: Color) {
    this.currentColor.set(color)
  }

  removeColor() {
    this.currentColor.set(null)
  }

  toRgba(color: Color): string {
    if (color) {
      if (color.opacity !== null && color.hex.length === 7) {
        const r = parseInt(color.hex.slice(1, 3), 16)
        const g = parseInt(color.hex.slice(3, 5), 16)
        const b = parseInt(color.hex.slice(5, 7), 16)
        console.log(`rgba(${r}, ${g}, ${b}, ${color.opacity})`)
        return `rgba(${r}, ${g}, ${b}, ${color.opacity})`
      } else {
        return color.hex
      }
    } else {
      return 'transparent'
    }
  }
}
