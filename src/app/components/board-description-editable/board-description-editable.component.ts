import { Component, computed, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside/click-outside.directive';

@Component({
  selector: 'app-board-description-editable',
  imports: [
    FormsModule,
    ClickOutsideDirective
  ],
  templateUrl: './board-description-editable.component.html',
  styleUrl: './board-description-editable.component.css'
})
export class BoardDescriptionEditableComponent {
  description = input.required<string | null>();
  descriptionChanged = output<string>();
  
  currentDescription = signal('');
  originalDescription = signal('');
  isEditing = signal(false);

  descriptionComputed = computed(() => 
    this.currentDescription().trim().length > 0
      ? this.currentDescription().trim()
      : 'Add a more detailed description...'
  );

  constructor() {
    effect(() => {
      const desc = this.description() ?? '';
      this.currentDescription.set(desc);
      this.originalDescription.set(desc);
    });
  }

  enableEditing() {
    this.isEditing.set(true);
  }

  saveDescription() {
    const trimmedDescription = this.currentDescription().trim();
    this.currentDescription.set(trimmedDescription);
    this.originalDescription.set(trimmedDescription);
    this.isEditing.set(false);
    this.descriptionChanged.emit(trimmedDescription);
  }

  cancelEditing() {
    this.currentDescription.set(this.originalDescription());
    this.isEditing.set(false);
  }

  onClickOutside() {
    if (this.isEditing()) {
      this.saveDescription();
    }
  }
}