import { Injectable, signal } from '@angular/core';
import { db } from '../../db';
import { Color, Label, LabelOption } from '../../types';
import { defaultLabelOptions } from '../../colors';
@Injectable({
  providedIn: 'root'
})
export class LabelStore {
  labels = signal<Label[]>([]);
  labelOptions = signal<Partial<Label>[]>([]);

  constructor() { }

  // ============ LABEL OPTIONS ============
  
  async loadLabelOptionsForList(listId: string) {
    const options = await db.getLabelOptionsByList(listId);

    if (options.length === 0) {
      const colors = defaultLabelOptions.map(color => ({
        list_id: listId,
        name: color.name,
        color: color.color
      }));
      
      for (const color of colors) {
        await db.addLabelOption(color);
      }
      
      const optionsFromDb = await db.getLabelOptionsByList(listId);
      this.labelOptions.set(optionsFromDb);
      return;
    }

    if (options.length === this.labelOptions().length && 
        options.every((option, index) => option.id === this.labelOptions()[index]?.id)) {
      return;
    }

    this.labelOptions.set(options);
  }

  async createLabelOption(
    listId: string, 
    name: string | null,
    color: Color
  ): Promise<LabelOption | undefined> {
    const optionId = await db.addLabelOption({
      list_id: listId,
      name,
      color
    });
    
    const newOption = await db.getLabelOption(optionId);
    if (newOption) {
      this.labelOptions.update(options => [...options, newOption]);
      return newOption;
    }
    return undefined;
  }

  async updateLabelOption(
    optionId: string,
    updates: { name?: string | null; color?: Color }
  ): Promise<LabelOption | undefined> {
    const option = await db.getLabelOption(optionId);
    if (!option) return undefined;

    const updatedOption = {
      ...option,
      ...updates
    };

    await db.updateLabelOption(optionId, updatedOption);
    
    this.labelOptions.update(options => 
      options.map(opt => opt.id === optionId ? updatedOption : opt)
    );

    return updatedOption;
  }

  async deleteLabelOption(optionId: string) {
    const labelsToDelete = this.labels().filter(
      label => label.label_option_id === optionId
    );
    
    for (const label of labelsToDelete) {
      await db.deleteLabel(label.id);
    }
    
    await db.deleteLabelOption(optionId);
    
    this.labelOptions.update(options => 
      options.filter(opt => opt.id !== optionId)
    );
    
    this.labels.update(labels =>
      labels.filter(label => label.label_option_id !== optionId)
    );
  }

  isLabelAssignedToCard(cardId: string, optionId: string): boolean {
    return this.labels().some(
      label => 
        label.card_id === cardId && 
        label.label_option_id === optionId
    );
  }

  async toggleLabel(cardId: string, optionId: string) {
    const existingLabel = this.labels().find(
      label => 
        label.card_id === cardId && 
        label.label_option_id === optionId
    );
    if (existingLabel) {
      await this.deleteLabel(existingLabel.id);
    } else {
      await this.createLabel({
        card_id: cardId,
        label_option_id: optionId
      });
    }
  }

  // ============ LABELS ============
  
  async loadLabelsForCard(cardId: string) {
    const newLabels = await db.getLabelsByCard(cardId)
    if (newLabels.length === this.labels().length) return undefined

    if(
      newLabels
      .every(
        (label, index) => 
          label.id === this.labels()[index]?.id
      )
    ) return 
    this.labels.update((labels) => [...labels, ...newLabels])
  }

  async createLabel(label: Omit<
    Label, 
    'id' | 
    'created_at' | 
    'synced' | 
    'edited' |
    'name' |
    'color'
    >): Promise<Label | undefined> {
      const option = await db.getLabelOption(label.label_option_id)
      
      if (!option) return undefined

      const labelId = await db.addLabel({
        ...label,
        name: option.name,
        color: option.color
      })
      const newLabel = await db.getLabel(labelId)
      if (newLabel) {
        this.labels.update(value => [...value, newLabel])
        return newLabel
      }
      return undefined
    }

    async updateName(
      labelId: string, 
      name: string | null
    ) {
      const label = await db.getLabel(labelId)
      if (!label) return undefined

      const newLabel = {
        ...label, 
        name
      }

      await db.updateLabel(labelId, newLabel) 
      this.labels.update(labels => {
        return labels.map(label => 
          label.id === labelId 
          ? newLabel 
          : label)
      })
      return newLabel
    }

    async updateColor(
      labelId: string, 
      color: Color
    ) {
      const label = await db.getLabel(labelId)
      if (!label) return undefined

      const newLabel = {
        ...label, 
        color
      }

      await db.updateLabel(labelId, newLabel)
      this.labels.update(labels => {
        return labels.map(label => 
          label.id === labelId 
          ? newLabel 
          : label)
      })
      return newLabel
    }

    async deleteLabel(labelId: string) {
      await db.deleteLabel(labelId)
      this.labels.update(labels => 
        labels.filter(label => label.id !== labelId)
      )
    }
}
