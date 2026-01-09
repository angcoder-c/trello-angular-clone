import { inject } from "@angular/core";
import type { 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    ResolveFn
} from "@angular/router";
import { Router } from "@angular/router";
import { BoardStore } from "../stores/board/board-store.service";
import { Board } from "../types";

export const boardResolver: ResolveFn<Board | null> = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const boardStore = inject(BoardStore);
    const router = inject(Router);
    const boardId = route.params['boardId'];

    // get user session from user store
    const userId = null

    const board = await boardStore.getBoard(boardId);
    if (!board) return null
    if (!board.isPublic) {
        if (board.user_id === userId) {
            return board
        } else {
            // navigate to home with router 
            router.navigate(['/']);
            return null
        }
    }
    return board
}