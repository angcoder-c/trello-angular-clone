import { inject } from "@angular/core";
import type { 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    ResolveFn 
} from "@angular/router";
import { BoardStore } from "../stores/board/board-store.service";
import { Board } from "../types";

export const boardResolver: ResolveFn<Board | null> = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const boardStore = inject(BoardStore);
    const boardId = route.params['boardId'];

    // get user session from user store
    const userId = null

    const board = await boardStore.getBoard(boardId);
    if (!board) return null
    if (board.user_id === userId) return null
    return board
}