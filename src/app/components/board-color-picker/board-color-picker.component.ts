import { Component, computed, output, signal } from '@angular/core';
import { 
  defaultBoardBackgroundColors, 
  defaultBoardBackgroundGradientColors 
} from '../../colors';
import { MatIconModule } from '@angular/material/icon';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Color } from '../../types';
import { BoardPreviewIcon } from '../../icons/board-preview/board-preview.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-board-color-picker',
  imports: [
    MatIconModule,
    CdkConnectedOverlay,
    BoardPreviewIcon,
    CdkOverlayOrigin
],
  templateUrl: './board-color-picker.component.html',
  styleUrl: './board-color-picker.component.css'
})
export class BoardColorPickerComponent {
  isOpen = false;
  solidColors = defaultBoardBackgroundColors;
  gradientColors = defaultBoardBackgroundGradientColors;

  defaultBackgroundOptions = computed(() => {
    return [
      ...this.gradientColors.slice(0, 5).map(colors => {
        return { 
          id: colors.map(c => c.hex).join('-'), 
          colors 
        };
      }),
    ]
  });

  allBackgroundOptions = computed(() => {
    return [
      ...this.solidColors.map(colors => {
        return { 
          id: colors.map(c => c.hex).join('-'), 
          colors
        };
      }),
      ...this.gradientColors.map(colors => {
        return { 
          id: colors.map(c => c.hex).join('-'), 
          colors 
        };
      }),
    ];
  });

  colorSelected = signal<Color[] | null>(null);
  colorSelectedEvent= output<Color[] | null>();

  ngOnInit() {
    this.colorSelected.set(this.defaultBackgroundOptions()[0].colors);
    this.colorSelectedEvent.emit(this.colorSelected());
  }

  selectColorOption(colors: Color[]) {
    this.colorSelected.set(colors);
    this.colorSelectedEvent.emit(colors);
  }

  styleForColorOption(colors: Color[]) {
    if (!colors || colors.length===0) return '#083b82'
    const initPorcentageGradient = 100 / colors.length

    const bgColorsGradient = colors.map((color, index) => {
      if (!color.hex) return '#083b82'
      return `${color.hex} ${initPorcentageGradient * (index)}%`
    })
    
    return `linear-gradient(135deg, ${bgColorsGradient.join(', ')})`
  }

  isColorOptionSelected(colors: Color[]) {
    if (this.colorSelected()?.length !== colors.length) {
      return false;
    }

    const compareArrs = this.colorSelected()?.map((color, i) => {
      return color.hex === colors[i].hex
    });

    if (compareArrs?.filter(comp => !comp).length) {
      return false;
    }
    return true;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closePicker() {
    this.isOpen = false;
  }
}