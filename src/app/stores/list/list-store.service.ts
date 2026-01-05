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

  async deleteList(id: string) {
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

  async updateListPosition(board_id: string, currentPosition: number, previousPosition: number) {
    const listsDB = await db.getListsByBoard(board_id);
    
    if (!listsDB || listsDB.length === 0) return undefined;

    const movedList = listsDB.find(list => list.position === previousPosition);
    const targetList = listsDB.find(list => list.position === currentPosition);
    
    if (!movedList) return undefined;

    // direccion del movimiento
    const movingForward = currentPosition > previousPosition;
    
    // actualizar las posiciones
    const updatePromises = listsDB.map(async (list) => {
      let newPosition = list.position;
      
      if (list.id === movedList.id) {
        newPosition = currentPosition;
      } else if (movingForward) {
        // desplazar las listas intermedias hacia atras
        if (list.position > previousPosition && list.position <= currentPosition) {
          newPosition = list.position - 1;
        }
      } else {
        // desplazar las listas intermedias hacia adelante
        if (list.position >= currentPosition && list.position < previousPosition) {
          newPosition = list.position + 1;
        }
      }
      
      if (newPosition !== list.position) {
        await db.updateList(list.id, {
          ...list,
          position: newPosition
        });
      }
    });

    await Promise.all(updatePromises);
    
    await this.loadListsByBoard(board_id);
  }
}
