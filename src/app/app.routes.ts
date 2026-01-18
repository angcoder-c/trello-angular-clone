import { Routes } from '@angular/router';
import { HomeViewComponent } from './pages/home/home.component';
import { BoardViewComponent } from './pages/board/board.component';
import { boardResolver } from './routing/resolvers';
import { BoardsComponent } from './pages/boards/boards.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home | Trello Angular Clone',
        component: HomeViewComponent,
        children: [
            { 
                path: '', 
                redirectTo: 'boards', 
                pathMatch: 'full' 
            },
            { 
                path: 'boards', 
                component: BoardsComponent 
            },
            { 
                path: 'about', 
                component: AboutComponent 
            }
        ]
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