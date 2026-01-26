import { Routes } from '@angular/router';
import { HomeViewComponent } from './pages/home/home.component';
import { BoardViewComponent } from './pages/board/board.component';
import { boardResolver } from './routing/resolvers';
import { BoardsComponent } from './pages/boards/boards.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
    path: 'auth/callback',
    component: AuthCallbackComponent,
    title: 'Authenticating...'
    },
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
    },
    {
        path: '**',
        title: '404 | Page not found',
        component: NotFoundComponent
    }
];