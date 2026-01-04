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
  
  // ui
  selectedCardId = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { }

  async loadCardsByList(list_id: string) {
    const cardsByList = await db.getCardsByList(list_id)
    this.cards.update(cards =>{
      let updatedCards = [
        ...cards.filter(
          card => card.list_id !== list_id
        ), 
        ...cardsByList
      ]
      return updatedCards
    })
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
    const card = await db.getCard(cardId)
    if (!card) return undefined

    const listId = card.list_id
    const position = card.position
    
    // eliminar la card de la db
    await db.deleteCard(cardId)

    // actualiza las posiciones de las cards restantes
    const cardsDb = await db.getCardsByList(listId)
    const updatePromises = cardsDb.map(async (card, index) => {
      if (card.position !== index) {
        const updatedCard = {
          ...card,
          position: index
        }
        await db.updateCard(card.id, updatedCard)
      }
    });
    await Promise.all(updatePromises)

    this.loadCardsByList(listId)
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

  async moveCardInList (list_id: string, currentIndex: number, previousIndex: number) {
    const cardsInList = this.cards().filter(card => card.list_id === list_id)

    if (!cardsInList || cardsInList.length === 0) return undefined

    const movedCard = cardsInList.find(card => card.position === previousIndex)
    const targetCard = cardsInList.find(card => card.position === currentIndex)

    if (!movedCard) return undefined

    // direccion del movimiento
    const movingForward = currentIndex > previousIndex
    // actualizar las posiciones
    const updatePromises = cardsInList.map(async (card) => {  
      let newPosition = card.position

      if (card.id === movedCard.id) {
        newPosition = currentIndex
      } else if (movingForward) {
        // desplazar las cards intermedias hacia atras
        if (card.position > previousIndex && card.position <= currentIndex) {
          newPosition = card.position - 1
        }
      } else {
        // desplazar las cards intermedias hacia adelante
        if (card.position >= currentIndex && card.position < previousIndex) {
          newPosition = card.position + 1
        }
      }
      if (newPosition !== card.position) {
        await db.updateCard(card.id, {
          ...card,
          position: newPosition
        })
      }
    });
    await Promise.all(updatePromises)
    
    await this.loadCardsByList(list_id)
  }

  async moveCardToAnotherList (
    from_list_id: string,
    from_position: number,
    to_list_id: string,
    to_position: number
  ) {
    const fromCard = this.cards().find(card => 
      card.list_id === from_list_id && 
      card.position === from_position
    )
    if (!fromCard || !fromCard.id) return undefined
    const updatedCard = {
      ...fromCard,
      list_id: to_list_id,
      position: to_position
    }
    await db.updateCard(fromCard.id, updatedCard)

    // Actualizar posiciones en la lista origen
    const fromCards = this.cards().filter(card => card.list_id === from_list_id)
    const updateFromPromises = fromCards.map(async (card) => {
      if (card.position > from_position) {
        await db.updateCard(card.id, {
          ...card,
          position: card.position - 1
        })
      }
    });

    // Actualizar posiciones en la lista destino
    const toCards = this.cards().filter(card => card.list_id === to_list_id)
    const updateToPromises = toCards.map(async (card) => {
      if (card.position >= to_position) {
        await db.updateCard(card.id, {
          ...card,
          position: card.position + 1
        })
      }
    });

    await Promise.all(updateFromPromises)
    await Promise.all(updateToPromises)
    this.cards.update(cards => cards.map(card =>
      card.id === fromCard.id
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
