import { inject } from "@angular/core";
import type { 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    ResolveFn
} from "@angular/router";
import { Router } from "@angular/router";
import { BoardStore } from "../stores/board/board-store.service";
import { Board } from "../types";
import { AuthService } from "../services/auth/auth.service";

export const boardResolver: ResolveFn<Board | null> = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const boardStore = inject(BoardStore);
    const authStore = inject(AuthService)
    const router = inject(Router);
    const boardId = route.params['boardId'];

    // get user session from user store
    const userEmail = authStore.getUserProfile ? 
    authStore.getUserProfile['email'] : 
    null;

    const board = await boardStore.getBoard(boardId);
    if (!board) return null
    if (!board.isPublic) {
        if (board.user_email === userEmail) {
            return board
        } else {
            // navigate to home with router 
            router.navigate(['/']);
            return null
        }
    }
    return board
}