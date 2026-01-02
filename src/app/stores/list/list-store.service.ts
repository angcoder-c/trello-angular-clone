import { Injectable, signal } from '@angular/core';
import { List } from '../../types';
import { db } from '../../db';

@Injectable({
  providedIn: 'root'
})
export class ListStore {
  lists = signal<List[]>([]);

  constructor() { }

  async loadListsByBoard(board_id: string) {
    const listsByBoard = await db.getListsByBoard(board_id);
    this.lists.set(listsByBoard);
  }

  async createList(board_id: string, name: string) {
    if (!name.trim() && !board_id) return undefined
    const listId: string = await db.addList({
      name,
      board_id,
      position: this.lists().length
    })
    if (!listId) return undefined

    const newList = await db.getList(listId)
    if (newList) {
      this.lists.update(value => [...value, newList]);
    }
    return newList;
  }

  async getList(id: string) {
    const list = await db.getList(id);
    return list;
  }

  async deleteCard(id: string) {
    await db.deleteList(id);
    this.lists.update(lists => lists.filter(list => list.id !== id));
  }

  async updateListName(id: string, name: string) {
    const list = await db.getList(id);
    if (!list) return;

    await db.updateList(id, {
      ...list,
      name    
    });
  }

  async updateListPosition(id: string, position: number) {
    const list = await db.getList(id);
    if (!list) return;

    await db.updateList(id, {
      ...list,
      position    
    });
  }
}
