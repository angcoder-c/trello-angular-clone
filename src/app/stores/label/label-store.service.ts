import { Injectable, signal } from '@angular/core';
import { db } from '../../db';
import { Color, Label } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LabelStore {
  labels = signal<Label[]>([]);
  labelOptions = signal<Partial<Label>[]>([
    {
      name: null,
      color: { 
        hex: '#216e4e', 
        opacity: null 
      }
    },
    {
      name: null,
      color: { 
        hex: '#7f5f01', 
        opacity: null 
      }
    },
    {
      name: null,
      color: { 
        hex: '#803fa5', 
        opacity: null 
      }
    },
    {
      name: null,
      color: { 
        hex: '#1558bc', 
        opacity: null 
      }
    }
  ]);

  constructor() { }

  async loadLabelsForCard(cardId: string) {
    const newLabels = await db.getLabelsByCard(cardId)
    this.labels.update((labels) => [...labels, ...newLabels])
  }

  createLabelOption(name: string | null, color: Color) {
    const newOption: Partial<Label> = {
      name,
      color
    }
    this.labelOptions.update(options => [...options, newOption])
  }

  updateLabelOption(index: number, name: string | null, color: Color) {
    this.labelOptions.update(options => {
      const updated = [...options]
      if (index >= 0 && index < updated.length) {
        updated[index] = {
          ...updated[index],
          name,
          color
        }
      }
      return updated
    })
  }

  async createLabel(label: Omit<
    Label, 
    'id' | 
    'created_at' | 
    'synced' | 
    'edited'
    >): Promise<Label | undefined> {
      const labelId = await db.addLabel(label)
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
