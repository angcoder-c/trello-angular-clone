import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BoardStore } from '../../stores/board/board-store.service';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-board-create-form',
  imports: [
    ReactiveFormsModule,
    CdkConnectedOverlay,
    MatIconModule
  ],
  templateUrl: './board-create-form.component.html',
  styleUrl: './board-create-form.component.css'
})
export class BoardCreateFormComponent {
  private boardStore = inject(BoardStore);
  isOpen = false;
  testColor = '#040a29';
  
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
    if (this.boardForm.valid) {
      console.log('Form Submitted!', this.boardForm.value);
      await this.boardStore.createBoard({
        title: this.boardForm.value.title as string,
        description: this.boardForm.value.description,
        backgroundColor: [
          {
            hex: this.boardForm.value.color as string
          }
        ],
        isPublic: this.boardForm.value.isPublic as boolean,
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
}
