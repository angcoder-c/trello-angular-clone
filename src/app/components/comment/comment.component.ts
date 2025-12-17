import { Component, computed, inject, input } from '@angular/core';
import { CardStore } from '../../stores/card/card-store.service';
import { CommentStore } from '../../stores/comment/comment-store.service';
import { DialogModule } from "@angular/cdk/dialog";
import { Comment } from '../../types';

@Component({
  selector: 'app-comment',
  imports: [DialogModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  readonly id = input<string>() // comment_id
  private cardStore = inject(CardStore)
  private commentStore = inject(CommentStore)

  comment = computed<Comment | undefined>(()=>{
    return this.commentStore
    .comments()
    .filter(comment => 
      comment.id === this.id()
    )[0]
  })

  dateFormat = computed<string | undefined>(()=>{
    return new Date(this.comment()?.created_at || '').toLocaleDateString('en-EN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }) 

  async deleteComment () {
    if (!this.comment()?.id) return undefined

    await this.commentStore.deleteComment(this.comment()?.id as string)
  }
}
