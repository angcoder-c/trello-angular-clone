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
export class CardStoreService {
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
}
