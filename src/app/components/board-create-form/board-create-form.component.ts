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
  color = signal<Color[] | null>(null);
  isPublic = signal<boolean>(true);
  onError = signal(false);
  isOpen = false;
  
  boardForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.maxLength(200)
    ])
  });
  
  async onSubmit() {
    if (this.boardForm.valid && this.color()) {
      await this.boardStore.createBoard({
        title: this.boardForm.value.title as string,
        description: this.boardForm.value.description,
        backgroundColor: this.color() as Color[],
        isPublic: this.isPublic(),
        user_id: null
      });
      this.close()
    } else {
      this.onError.set(true);
    }
  }
  
  close () {
    this.isOpen = false;
    this.boardForm.reset();
    this.color.set(null);
    this.onError.set(false);
  }
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onColorSelected(color: Color[] | null) {
    this.color.set(color);
  }

  togglePublic() {
    this.isPublic.set(!this.isPublic());
  }

  showError(detectTouch = true){
    this.onError.set(
      (
        this.boardForm.get('title')?.invalid && 
        (
          detectTouch ? this.boardForm.get('title')?.touched : true
        )
      ) || 
      false
    );
  }
}
