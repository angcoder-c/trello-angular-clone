import { computed, Injectable, signal } from '@angular/core';
import { Board, Color } from '../../types';
import { db } from '../../db';

@Injectable({
  providedIn: 'root'
})
export class BoardStore {
  boards = signal<Board[]>([]);
  
  constructor() { }

  async loadBoards() {
    const allBoards = await db.getAllBoards();
    this.boards.set(allBoards);
  }

  async getBoard(id: string) {
    const board = await db.getBoard(id);
    return board;
  }

  async createBoard(board : {
    title: string,
    description?: string | null,
    backgroundColor?: Color[],
    isPublic?: boolean,
    user_id?: string | null
  }) {
    if (!board.title.trim()) return undefined
    const boardId: string = await db.addBoard({ 
      title: board.title,
      user_id: board.user_id ?? null,
      description: board.description ?? null,
      backgroundColor: board.backgroundColor ?? [],
      isFavorite: false,
      isPublic: board.isPublic ?? false,
    })

    if (!boardId) return undefined

    const newBoard = await db.getBoard(boardId)
    if (newBoard) {
      this.boards.update(value => [...value, newBoard]);
    }
    return newBoard;
  }

  async deleteBoard(id: string) {
    const board = await db.getBoard(id)
    if (!board) return undefined
    await db.deleteBoard(id)
    this.boards.update(
      boards => boards.filter(
        board => board.id !== id
      )
    );
  }

  async updateBoardFavorite(id: string) {
    const board = await db.getBoard(id)
    if (!board) return undefined
    
    const updatedBoard = {
      ...board,
      isFavorite: !board.isFavorite
    }
    await db.updateBoard(id, updatedBoard)
    this.boards.update(
      boards => boards
      .map(
        board => board.id === id ?
        updatedBoard : 
        board
      ));
  }

  async updateBoardDescription(
    id: string, 
    description: string | null
  ) {
    const board = await db.getBoard(id)
    if (!board) return undefined
    const updatedBoard = {
      ...board,
      description
    }
    
    await db.updateBoard(id, updatedBoard)
    this.boards.update(
      boards => boards
      .map(
        board => board.id === id ? 
        updatedBoard : 
        board
      ));
    }

    async updateBoardTitle(
      id: string, 
      title: string
    ) {
      const board = await db.getBoard(id)
      if (!board) return undefined
      const updatedBoard = {
        ...board,
        title
      }
      await db.updateBoard(id, updatedBoard)
      this.boards.update(
        boards => boards
        .map(
          board => board.id === id ? 
          updatedBoard : 
          board
      ));
    }

    async toggleBoardFavorite(id: string) {
      const board = await db.getBoard(id)
      if (!board) return undefined

      const updatedBoard = {
        ...board,
        isFavorite: !board.isFavorite
      }
      await db.updateBoard(id, updatedBoard)
      this.boards.update(
        boards => boards
        .map(
          board => board.id === id ? 
          updatedBoard : 
          board
      ));
    }

    async updateBoardBackgroundColor(
      id: string, 
      backgroundColor: Color[]
    ) {
      const board = await db.getBoard(id)
      if (!board) return undefined
      const updatedBoard = {
        ...board,
        backgroundColor
      }
      await db.updateBoard(id, updatedBoard)
      this.boards.update(
        boards => boards
        .map(
          board => board.id === id ? 
          updatedBoard : 
          board
      ));
    }

    async updateBoardPublicStatus(
      id: string, 
      isPublic: boolean
    ) {
      const board = await db.getBoard(id)
      if (!board) return undefined

      const updatedBoard = {
        ...board,
        isPublic
      }
      await db.updateBoard(id, updatedBoard)
      this.boards.update(
        boards => boards
        .map(
          board => board.id === id ? 
          updatedBoard : 
          board
      ));
    }

    async getAllBoards() {
      const allBoards = await db.getAllBoards();
      return allBoards;
    }

    async getRecentBoards () {
      const recentBoards = await db.getRecentBoards();
      return recentBoards;
    }

    async markBoardAsVisited(id: string) {
      const board = await db.getBoard(id)
      if (!board) return undefined
      board.last_visit = new Date().toISOString();
      await db.updateBoard(id, board);
    }
  }