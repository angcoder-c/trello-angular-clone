import { Injectable, signal } from '@angular/core';
import { db } from '../../db';
import { Comment } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CommentStoreService {
  comments = signal<Comment[]>([])

  // ui
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { }

  async loadCommentsByCard (card_id: string) {
    const commentsByCard = await db.getCommentsByCard(card_id)
    this.comments.update(comments => [...comments, ...commentsByCard])
  }

  async createComment(comment: {
    card_id: string
    content: string
    user?: string | null
  }): Promise<Comment | undefined> {
    const commentId = await db.addComment(comment)
    const newComment = await db.getComment(commentId)
    return newComment
  }

  async getComment(comment_id: string): Promise<Comment | undefined> {
    const comment = await db.getComment(comment_id)
    return comment
  }

  async deleteComment(comment_id: string) {
    await db.deleteComment(comment_id)
    this.comments.update(comments => 
      comments.filter(comment => 
        comment.id !== comment_id
      )
    )
  }

  async setUser(comment_id:string, user: string | null) {
    const comment = await db.getComment(comment_id)
    if (!comment) return undefined

    const newComment = {
      ...comment,
      user
    }

    await db.updateComment(comment_id, newComment)
    this.comments.update(comments => comments.map(comment => 
      comment.id === comment_id 
      ? newComment 
      : comment
    ))
  }

  async updateContent(comment_id: string, content: string) {
    const comment = await db.getComment(comment_id)
    if (!comment && !comment) return undefined

    const newComment = {
      ...comment,
      content
    }

    await db.updateCommentContent(comment_id, content)
    this.comments.update(comments => comments.map(comment => 
      comment.id === comment_id 
      ? newComment 
      : comment
    ))
  }
}