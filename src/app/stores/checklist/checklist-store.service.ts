import { Injectable, signal } from '@angular/core';
import { CheckList, CheckListItem } from '../../types';
import { db } from '../../db';

@Injectable({
  providedIn: 'root'
})
export class ChecklistStoreService {
  checklists = signal<CheckList[]>([]);
  checklistItems = signal<CheckListItem[]>([]);

  constructor() { }

  async loadChecklistsByCard(card_id: string) {
    const checklistsByCard = await db.getChecklistsByCard(card_id)
    this.checklists.set(checklistsByCard)
    this.checklistItems.set([])
    checklistsByCard.forEach(async checklist => {
      const checklistItems = await db.getChecklistItemsByChecklist(checklist.id)
      this.checklistItems.update(items => [...items, ...checklistItems])
    })
  }

  async createChecklist(
    card_id: string, 
    title: string
  ): Promise<CheckList | undefined> {
    const checklistId =  await db.addChecklist({
      card_id,
      title
    })
    const newChecklist = await db.getChecklist(checklistId)
    if (newChecklist) {
      this.checklists.update(checklists => [...checklists, newChecklist])
      return newChecklist
    }
    return undefined
  }

  async updateChecklistTitle(checklist_id: string, title: string) {
    const checklist = await db.getChecklist(checklist_id)
    if (!checklist) return undefined
    const newChecklist = {
      ...checklist,
      title
    }
    await db.updateChecklist(checklist_id, newChecklist)
    this.checklists.update(checklists => checklists.map(cl => 
      cl.id === checklist_id ? newChecklist : cl
    ))
    return newChecklist
  }
  

  async deleteChecklist(checklist_id: string) {
    await db.deleteChecklist(checklist_id)
    this.checklists.update(checklists => checklists.filter(cl => cl.id !== checklist_id))
  }

  async addChecklistItem(
    checklist_id: string, 
    title: string
  ): Promise<CheckListItem | undefined> {
    const checklistItemId = await db.addChecklistItem({
      checklist_id,
      title,
      completed: false,
      maturity: null
    })
    const newChecklistItem = await db.getChecklistItem(checklistItemId)
    if (newChecklistItem) {
      this.checklistItems.update(items => [...items, newChecklistItem])
      return newChecklistItem
    }
    return undefined
  }

  async updateChecklistItemTitle(
    checklist_item_id: string, 
    title: string
  ) {
    const item = await db.getChecklistItem(checklist_item_id)
    if (!item) return undefined
    const newItem = {
      ...item,
      title
    }
    await db.updateChecklistItem(checklist_item_id, newItem)
    this.checklistItems.update(items => items.map(i => 
      i.id === checklist_item_id ? newItem : i
    ))
    return newItem
  }

  async updateChecklistItemMaturity(
    checklist_item_id: string, 
    maturity: string | null
  ) {
    const item = await db.getChecklistItem(checklist_item_id)
    if (!item) return undefined
    const newItem = {
      ...item,
      maturity
    }
    await db.updateChecklistItem(checklist_item_id, newItem)
    this.checklistItems.update(items => items.map(i => 
      i.id === checklist_item_id ? newItem : i
    ))
    return newItem
  }

  async toggleChecklistItemCompletion(checklist_item_id: string) {
    const item = await db.getChecklistItem(checklist_item_id)
    if (!item) return undefined
    const newItem = {
      ...item,
      completed: !item.completed
    }
    await db.updateChecklistItem(checklist_item_id, newItem)
    this.checklistItems.update(items => items.map(i => 
      i.id === checklist_item_id ? newItem : i
    ))
    return newItem
  }

  async deleteChecklistItem(checklist_item_id: string) {
    await db.deleteChecklistItem(checklist_item_id)
    this.checklistItems.update(items => items.filter(i => i.id !== checklist_item_id))
  }
}