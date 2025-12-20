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
  checklists = signal<CheckList[]>([]);
  checklistItems = signal<CheckListItem[]>([]);
  
  // ui
  selectedCardId = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { }

  async loadCardsByList(list_id: string) {
    const cardsByList = await db.getCardsByList(list_id)
    this.cards.update(cards => [...cards, ...cardsByList])
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


  // crear una nueva card
  async getCard(id: string): Promise<Card | undefined> {
    const card = await db.getCard(id)
    return card
  }

  // eliminar una card
  async deleteCard(cardId: string) {
    await db.deleteCard(cardId)
    this.cards.update(cards => cards.filter(card => card.id !== cardId))
  }

  // colocar descripcion
  async updateDescription(card_id: string, description: string) {
    const card = await db.getCard(card_id)
    if (!card) return undefined 
    const updatedCard = {
      ...card,
      description: description
    }
    if (description) {
      await db.updateCard(card_id, updatedCard)
    }
    this.cards.update(cards => cards.map(card =>
      card.id === card_id 
      ? updatedCard 
      : card
    ))
  }

  // completed task
  async completeCard(card_id: string) {
    const card = await db.getCard(card_id)
    if (!card) return undefined

    const updatedCard = {
      ...card,
      completed: !card?.completed 
    }
    await db.updateCard(card_id, updatedCard)
    this.cards.update(cards => cards.map(card =>
      card.id === card_id 
      ? updatedCard 
      : card
    ))
  }

  // completed task
  async updateTitle(card_id: string, title: string) {
    const card = await db.getCard(card_id)
    if (!card) return undefined

    const updatedCard = {
      ...card,
      title: title
    }
    await db.updateCard(card_id, updatedCard)
    this.cards.update(cards => cards.map(card =>
      card.id === card_id 
      ? updatedCard 
      : card
    ))
  }

  async moveUp (card_id: string) {
    const card = await db.getCard(card_id)
    
    if (!card || !card?.id) return undefined

    const newPosition = card.position - 1
    if (newPosition < 0) return undefined

    const updatedCard = {
      ...card,
      position: newPosition 
    }

    await db.updateCard(card.id, updatedCard)

    this.cards.update(cards => cards.map(card =>
      card.id === card_id 
      ? updatedCard 
      : card
    ))
  }

  async moveDown (card_id: string) {
    const card = await db.getCard(card_id)
    
    if (!card || !card?.id) return undefined

    const newPosition = card.position + 1
    if (newPosition < 0) return undefined

    const updatedCard = {
      ...card,
      position: newPosition 
    }

    await db.updateCard(card.id, updatedCard)

    this.cards.update(cards => cards.map(card =>
      card.id === card_id 
      ? updatedCard 
      : card
    ))
  }

  async setMaturity (card_id: string, maturity: string | null) {
    const card = await db.getCard(card_id)
    
    if (!card || !card?.id || (!maturity && maturity !== null)) return undefined

    const updatedCard = {
      ...card,
      maturity: maturity
    }
    await db.updateCard(card.id, updatedCard)
    this.cards.update(cards => cards.map(card =>
      card.id === card_id 
      ? updatedCard 
      : card
    ))
  }
}
