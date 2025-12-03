import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'
import { CardStore } from './../../stores/card/card-store.service'; 
import { CardComponent } from './../../components/card/card.component';
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'app-list',
  imports: [
    MatIcon,
    CardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  modifyTitle = signal<boolean>(false)
  titleInputRef = viewChild<ElementRef>('titleInput')
  title = signal<string>('Titulo')
  tempTitle = signal<string>('')
  cardStore = inject(CardStore)

  constructor(){
    effect(() => {
      if (this.modifyTitle() && this.titleInputRef()) {
        setTimeout(() => {
          const input = this.titleInputRef()?.nativeElement;
          if (input) {
            input.focus();
            input.value = this.title();
            this.tempTitle.set(this.title());
          }
        });
      }
    });
  }

  async ngOnInit() {
    await this.cardStore.loadCardsByList('8c4fc7c8-dfdf-4c35-8503-b521ecdb137a')
  }
  
  async addCard () {
    const res = await this.cardStore.createCard({
      position: this.cardStore.cards().length,
      list_id: '8c4fc7c8-dfdf-4c35-8503-b521ecdb137a',
      title: 'Test'
    })
  }

  changeModifyState() {
    this.modifyTitle.set(true);
  }
  
  onTitleBlur() {
    this.modifyTitle.set(false);
    this.tempTitle.set('');
  }
  
  onTitleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      this.title.set(input.value);
      this.modifyTitle.set(false);
    } else if (event.key === 'Escape') {
      this.modifyTitle.set(false);
    }
  }
}
