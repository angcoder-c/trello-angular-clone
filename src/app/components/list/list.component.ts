import { Component, inject } from '@angular/core';
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
  cardStore = inject(CardStore)

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
}
