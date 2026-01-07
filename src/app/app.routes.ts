import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './pages/board/board.component';
import { boardResolver } from './routing/resolvers';

export const routes: Routes = [
    {
        path: '',
        title: 'Home | Trello Angular Clone',
        component: HomeComponent
    },
    {
        path: 'board/:boardId',
        title: 'Board | Trello Angular Clone',
        component: BoardComponent,
        resolve: {
            board: boardResolver
        }
    }
];