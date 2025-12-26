import { Component, inject, input, output, signal } from '@angular/core';
import { LabelFormOptionComponent } from '../label-form-option/label-form-option.component';
import { LabelCreateFormComponent } from '../label-create-form/label-create-form.component';
import { MatIcon } from '@angular/material/icon';
import { LabelStore } from '../../stores/label/label-store.service';
import { Color, Label, LabelOption } from '../../types';

@Component({
  selector: 'app-set-label-form-component',
  imports: [
    MatIcon,
    LabelFormOptionComponent,
    LabelCreateFormComponent
  ],
  templateUrl: './set-label-form-component.component.html',
  styleUrl: './set-label-form-component.component.css'
})
export class SetLabelFormComponentComponent {
  cardId = input.required<string>()
  listId = input.required<string>()
  
  labelStore = inject(LabelStore)
  labels = this.labelStore.labels
  labelOptions = this.labelStore.labelOptions

  showCreateForm = signal<boolean>(false)
  labelCloseEvent = output<void>()

  editMode = signal<boolean>(false)
  currentEditingOptionId = signal<string | null>(null)
  
  ngOnInit() {
    this.labelStore.loadLabelOptionsForList(this.listId())
    this.labelStore.loadLabelsForCard(this.cardId())
  }

  isLabelSelected(optionId: string): boolean {
    return this.labelStore.isLabelAssignedToCard(
      this.cardId(), 
      optionId
    )
  }

  async handleToggleLabel(optionId: string) {
    await this.labelStore.toggleLabel(this.cardId(), optionId)
  }

  handleEdit(optionId: string) {
    this.currentEditingOptionId.set(optionId)
    this.editMode.set(true)
    this.showCreateForm.set(true)
  }

  handleClose() {
    this.showCreateForm.set(false)
    this.editMode.set(false)
    this.currentEditingOptionId.set(null)
    this.labelCloseEvent.emit()
  }

  openCreateForm() {
    this.editMode.set(false)
    this.currentEditingOptionId.set(null)
    this.showCreateForm.set(true)
  }

  handleBack() {
    this.showCreateForm.set(false)
    this.editMode.set(false)
    this.currentEditingOptionId.set(null)
  }

  getCurrentLabelData(): Partial<LabelOption> | undefined {
    if (!this.editMode() || !this.currentEditingOptionId()) return undefined
    
    return this.labelOptions().find(
      opt => opt.id === this.currentEditingOptionId()
    )
  }

  async handleSave(data: { name: string | null, color: Color }) {
    if (this.editMode() && this.currentEditingOptionId()) {
      await this.labelStore.updateLabelOption(
        this.currentEditingOptionId()!,
        {
          name: data.name,
          color: data.color
        }
      )
    } else {
      await this.labelStore.createLabelOption(
        this.listId(),
        data.name,
        data.color
      )
    }
    
    this.handleBack()
  }
}
