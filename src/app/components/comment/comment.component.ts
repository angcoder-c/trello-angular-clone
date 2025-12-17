import { Component, computed, inject, input, signal } from '@angular/core';
import { CommentStore } from '../../stores/comment/comment-store.service';
import { Comment } from '../../types';
import { DescriptionFormComponent } from '../description-form/description-form.component';

@Component({
  selector: 'app-comment',
  imports: [
    DescriptionFormComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  readonly id = input<string>() // comment_id
  private commentStore = inject(CommentStore)
  edit = signal<boolean>(false)

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

  enabledEdit () {
    this.edit.set(true)
  }

  async changeContent(content: string) {
    if (!this.id()) return undefined
    this.commentStore.updateContent(this.id() as string, content)
  }

  disabledEdit (save: boolean) {
    this.edit.set(!save)
  }
}
