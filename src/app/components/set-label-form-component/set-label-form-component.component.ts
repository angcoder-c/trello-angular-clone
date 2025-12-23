import { Component, inject, input, output, signal } from '@angular/core';
import { LabelFormOptionComponent } from '../label-form-option/label-form-option.component';
import { LabelCreateFormComponent } from '../label-create-form/label-create-form.component';
import { MatIcon } from '@angular/material/icon';
import { LabelStore } from '../../stores/label/label-store.service';
import { Color, Label } from '../../types';

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
  cardId = input<string>()
  labelStore = inject(LabelStore)
  showCreateForm = signal<boolean>(false)
  editingIndex = signal<number | null>(null)
  checkedLabels = signal<Set<number>>(new Set())

  labelToggleEvent = output<{ index: number; checked: boolean; option: Partial<Label> }>()
  labelSaveEvent = output<{ index: number | null; name: string | null; color: Color }>()
  labelCloseEvent = output<void>()

  handleEdit(index: number) {
    this.editingIndex.set(index)
    this.showCreateForm.set(true)
  }

  handleCheckboxChange(event: {index: number, checked: boolean}) {
    const checked = this.checkedLabels()
    const option = this.labelStore.labelOptions()[event.index]

    if (event.checked) {
      checked.add(event.index)
    } else {
      checked.delete(event.index)
    }

    this.checkedLabels.set(new Set(checked))
    this.labelToggleEvent.emit({
      index: event.index,
      checked: event.checked,
      option
    })
  }

  handleSave(data: {name: string | null, color: Color}) {
    const index = this.editingIndex()
    if (index !== null) {
      // Modo edición
      this.labelStore.updateLabelOption(index, data.name, data.color)
    } else {
      // Modo creación
      this.labelStore.createLabelOption(data.name, data.color)
    }
    this.showCreateForm.set(false)
    this.editingIndex.set(null)
    this.labelSaveEvent.emit({
      index,
      name: data.name,
      color: data.color
    })
  }

  handleBack() {
    this.showCreateForm.set(false)
    this.editingIndex.set(null)
  }

  handleClose() {
    this.showCreateForm.set(false)
    this.editingIndex.set(null)
    this.labelCloseEvent.emit()
  }

  openCreateForm() {
    this.editingIndex.set(null)
    this.showCreateForm.set(true)
  }

  getCurrentLabelData(): Partial<Label> | undefined {
    const index = this.editingIndex()
    if (index !== null) {
      return this.labelStore.labelOptions()[index]
    }
    return undefined
  }
}
