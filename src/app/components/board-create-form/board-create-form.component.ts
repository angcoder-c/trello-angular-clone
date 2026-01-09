import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BoardStore } from '../../stores/board/board-store.service';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { BoardColorPickerComponent } from '../board-color-picker/board-color-picker.component';
import { Color } from '../../types';

@Component({
  selector: 'app-board-create-form',
  imports: [
    ReactiveFormsModule,
    CdkConnectedOverlay,
    MatIconModule,
    BoardColorPickerComponent
  ],
  templateUrl: './board-create-form.component.html',
  styleUrl: './board-create-form.component.css'
})
export class BoardCreateFormComponent {
  private boardStore = inject(BoardStore);
  testColor = signal<Color[] | null>(null);
  isOpen = false;
  
  boardForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.maxLength(200)
    ]),
    color: new FormControl(this.testColor),
    isPublic: new FormControl(true)
  });
  
  async onSubmit() {
    if (this.boardForm.valid && this.testColor()) {
      console.log('Form Submitted!', this.boardForm.value);
      await this.boardStore.createBoard({
        title: this.boardForm.value.title as string,
        description: this.boardForm.value.description,
        backgroundColor: this.testColor() as Color[],
        isPublic: this.boardForm.value.isPublic || false,
        user_id: null
      });
    }
  }
  
  close () {
    this.isOpen = false;
    this.boardForm.reset();
  }
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onColorSelected(color: Color[] | null) {
    console.log('Color selected in form:', color);
    this.testColor.set(color);
  }
}
