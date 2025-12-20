import { Injectable, signal } from '@angular/core';
import { db } from '../../db';
import { Color, Label } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LabelStore {
  labels = signal<Label[]>([]);

  constructor() { }

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
