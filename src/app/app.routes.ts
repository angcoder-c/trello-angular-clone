import { Routes } from '@angular/router';
import { HomeViewComponent } from './pages/home/home.component';
import { BoardViewComponent } from './pages/board/board.component';
import { boardResolver } from './routing/resolvers';

export const routes: Routes = [
    {
        path: '',
        title: 'Home | Trello Angular Clone',
        component: HomeViewComponent
    },
    {
        path: 'board/:boardId',
        title: 'Board | Trello Angular Clone',
        component: BoardViewComponent,
        resolve: {
            board: boardResolver
        }
    }
];