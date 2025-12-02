import { Injectable, signal, computed } from '@angular/core';
import { 
  Card, 
  Label, 
  CheckList, 
  CheckListItem, 
  Comment 
} from '../../types';
import { db } from '../../db';

@Injectable({
  providedIn: 'root'
})
export class CardStore {
  cards = signal<Card[]>([]);
  labels = signal<Label[]>([]);
  checklists = signal<CheckList[]>([]);
  checklistItems = signal<CheckListItem[]>([]);
  comments = signal<Comment[]>([]);
  
  // ui
  selectedCardId = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { }

  async loadCardsByList(list_id: string) {
    const cards = await db.getCardsByList(list_id)
    this.cards.set(cards)
  }

  // crear una nueva card
  async createCard(card: Omit<Card, (
    'id' |
    'description' |
    'maturity' | 
    'completed' |
    'created_at' |
    'updated_at' |
    'synced' |
    'edited'
  )>): Promise<Card | undefined> {
    const craftCard: Omit<Card, (
      'id' | 
      'created_at' |
      'updated_at' |
      'completed' |
      'synced' |
      'edited'
    )> = {
      description: null,
      maturity: null,
      title: card.title,
      position: card.position,
      list_id: card.list_id
    }
    const cardId: string = await db.addCard(craftCard)
    const newCard = await db.getCard(cardId)
    if (newCard) {
      this.cards.update(value => [...value, newCard])
    }
    return newCard
  }

  // eliminar una card
  async deleteCard(cardId: string) {
    await db.deleteCard(cardId)
    this.cards.update(cards => cards.filter(card => card.id !== cardId))
  }

  // colocar descripcion
  async updateDescription(card_id: string, description: string) {
    const card = await db.getCard(card_id)
    if (description) {
      await db.updateCard(card_id, {
        ...card, description: description 
      })
    }
  }
}
