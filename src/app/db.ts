import { Dexie, Table } from 'dexie'
import { Board, Card, CheckList, CheckListItem, Label, List, Comment, Color, LabelOption } from './types';

export class AppDB extends Dexie {
    board!: Table<Board>
    list!: Table<List>
    card!: Table<Card>
    label!: Table<Label>
    labelOption!: Table<LabelOption>
    checklist!: Table<CheckList>
    checklistItem!: Table<CheckListItem>
    comment!: Table<Comment>

    constructor() {
        super('ngdexieliveQuery')
        this.version(3).stores({
            board: 'id, title, isFavorite, isPublic, position, last_visit, edited, synced',
            list: 'id, board_id, name, position, edited, synced',
            card: 'id, list_id, title, position, maturity, edited, synced',
            label: 'id, card_id, name, label_option_id, edited, synced',
            labelOption: 'id, list_id, name, edited, synced',
            checklist: 'id, card_id, title, edited, synced',
            checklistItem: 'id, checklist_id, title, completed, maturity, edited, synced',
            comment: 'id, card_id, created_at, updated_at, edited, synced'
        });
    }

    // board crud
    async addBoard(data: Omit<
            Board, 
            (
                'id' | 
                'created_at' | 
                'updated_at' | 
                'last_visit' | 
                'synced' | 
                'edited'
            )
        >): Promise<string> {
        const now = new Date().toISOString().replace('Z', '');
        const board: Board = {
            id: crypto.randomUUID(),
            ...data,
            created_at: now,
            updated_at: now,
            last_visit: '',
            synced: false,
            edited: false
        };
        await this.board.add(board);
        return board.id;
    }

    async getBoard(id: string): Promise<Board | undefined> {
        return await this.board.get(id);
    }

    async getRecentBoards(limit: number = 4): Promise<Board[]> {
        return await this.board
        .orderBy('last_visit')
        .reverse()
        .limit(limit)
        .toArray();
    }

    async getAllBoards(): Promise<Board[]> {
        return await this.board.toArray();
    }

    async updateBoard(id: string, changes: Partial<Board>): Promise<number> {
        return await this.board.update(id, {
            ...changes,
            updated_at: new Date().toISOString().replace('Z', ''),
            edited: true,
            synced: false
        });
    }

    async deleteBoard(id: string): Promise<void> {
        await this.board.delete(id);
        await this.deleteListsByBoard(id);
    }

    async updateBoardLastVisit(id: string): Promise<number> {
        return await this.board.update(id, {
            last_visit: new Date().toISOString().replace('Z', '')
        });
    }

    // list crud
    async addList(data: Omit<
            List, 
            (
                'id' | 
                'created_at' | 
                'updated_at' | 
                'synced' | 
                'edited'
            )
        >): Promise<string> {
        const now = new Date().toISOString().replace('Z', '');
        const list: List = {
            id: crypto.randomUUID(),
            ...data,
            created_at: now,
            updated_at: now,
            synced: false,
            edited: false
        };
        await this.list.add(list);
        return list.id;
    }

    async getList(id: string): Promise<List | undefined> {
        return await this.list.get(id);
    }

    async getListByPosition(board_id: string, position: number): Promise<List | undefined> {
        return await this.list
        .where({ board_id, position })
        .first();
    }

    async getListsByBoard(board_id: string): Promise<List[]> {
        return await this.list.where('board_id').equals(board_id).sortBy('position');
    }

    async updateList(id: string, changes: Partial<List>): Promise<number> {
        return await this.list.update(id, {
            ...changes,
            updated_at: new Date().toISOString().replace('Z', ''),
            edited: true,
            synced: false
        });
    }

    async deleteList(id: string): Promise<void> {
        await this.list.delete(id);
        await this.deleteCardsByList(id);
    }

    async deleteListsByBoard(board_id: string): Promise<void> {
        const lists = await this.list.where('board_id').equals(board_id).toArray();
        const deletePromises = lists.map(
            list => {
                this.list.delete(list.id)
                this.deleteCardsByList(list.id)
            }
        );
        await Promise.all(deletePromises);
    }

    // card crud
    async addCard(data: Omit<
        Card, 
        (
            'id' | 
            'created_at' | 
            'updated_at' | 
            'completed' |
            'synced' | 
            'edited'
        )
        >): Promise<string> {
        const now = new Date().toISOString().replace('Z', '');
        const card: Card = {
            id: crypto.randomUUID(),
            ...data,
            created_at: now,
            updated_at: now,
            completed: false,
            synced: false,
            edited: false
        };
        await this.card.add(card);
        return card.id;
    }

    async getCard(id: string): Promise<Card | undefined> {
        return await this.card.get(id);
    }

    async getCardsByList(list_id: string): Promise<Card[]> {
        return await this.card.where('list_id').equals(list_id).sortBy('position');
    }

    async updateCard(id: string, changes: Partial<Card>): Promise<number> {
        return await this.card.update(id, {
            ...changes,
            updated_at: new Date().toISOString().replace('Z', ''),
            edited: true,
            synced: false
        });
    }

    async deleteCard(id: string): Promise<void> {
        await this.card.delete(id);
        await this.deleteCommentsByCard(id);
        await this.deleteChecklistsByCard(id);
        await this.deleteLabelsByCard(id);
        await this.deleteLabelOptionsByCard(id);
    }

    async deleteCardsByList(list_id: string): Promise<void> {
        const cards = await this.card.where('list_id').equals(list_id).toArray();
        const deletePromises = cards.map(
            card => {
                this.card.delete(card.id)
                this.deleteCommentsByCard(card.id);
                this.deleteChecklistsByCard(card.id);
                this.deleteLabelsByCard(card.id);
                this.deleteLabelOptionsByCard(card.id);
            });
        await Promise.all(deletePromises);
    }

    // label crud
    async addLabel(data: Omit<
            Label, 
            (
                'id' | 
                'created_at' | 
                'synced' | 
                'edited'
            )
        >): Promise<string> {
        const label: Label = {
            id: crypto.randomUUID(),
            ...data,
            created_at: new Date().toISOString().replace('Z', ''),
            synced: false,
            edited: false
        };
        await this.label.add(label);
        return label.id;
    }

    async getLabel(id: string): Promise<Label | undefined> {
        return await this.label.get(id);
    }

    async getLabelsByCard(card_id: string): Promise<Label[]> {
        return await this.label.where('card_id').equals(card_id).toArray();
    }

    async updateLabel(id: string, changes: Partial<Label>): Promise<number> {
        return await this.label.update(id, {
            ...changes,
            edited: true,
            synced: false
        });
    }

    async deleteLabel(id: string): Promise<void> {
        await this.label.delete(id);
    }

    async deleteLabelsByCard(card_id: string): Promise<void> {
        const labels = await this.label.where('card_id').equals(card_id).toArray();
        const deletePromises = labels.map(label => this.label.delete(label.id));
        await Promise.all(deletePromises);
    }

    // label option crud
    async addLabelOption(data: Omit<
            LabelOption, 
            (
                'id' | 
                'created_at' | 
                'synced' | 
                'edited'
            )
        >): Promise<string> {
        const label: LabelOption = {
            id: crypto.randomUUID(),
            ...data,
            created_at: new Date().toISOString().replace('Z', ''),
            synced: false,
            edited: false
        };
        await this.labelOption.add(label);
        return label.id;
    }

    async getLabelOption(id: string): Promise<LabelOption | undefined> {
        return await this.labelOption.get(id);
    }

    async getLabelOptionsByList(list_id: string): Promise<LabelOption[]> {
        return await this.labelOption.where('list_id').equals(list_id).toArray();
    }

    async updateLabelOption(id: string, changes: Partial<LabelOption>): Promise<number> {
        return await this.labelOption.update(id, {
            ...changes,
            edited: true,
            synced: false
        });
    }

    async deleteLabelOption(id: string): Promise<void> {
        await this.labelOption.delete(id);
    }

    async deleteLabelOptionsByCard(card_id: string): Promise<void> {
        const labels = await this.label.where('card_id').equals(card_id).toArray();
        const labelOptionIds = labels.map(label => label.label_option_id);
        const deletePromises = labelOptionIds.map(id => this.labelOption.delete(id));
        await Promise.all(deletePromises);
    }

    // checklist crud
    async addChecklist(data: Omit<
            CheckList, 
            (
                'id' | 
                'created_at' | 
                'updated_at' | 
                'synced' | 
                'edited'
            )
        >): Promise<string> {
        const now = new Date().toISOString().replace('Z', '');
        const checklist: CheckList = {
            id: crypto.randomUUID(),
            ...data,
            created_at: now,
            updated_at: now,
            synced: false,
            edited: false
        };
        await this.checklist.add(checklist);
        return checklist.id;
    }

    async getChecklist(id: string): Promise<CheckList | undefined> {
        return await this.checklist.get(id);
    }

    async getChecklistsByCard(card_id: string): Promise<CheckList[]> {
        return await this.checklist.where('card_id').equals(card_id).sortBy('created_at');
    }

    async updateChecklist(id: string, changes: Partial<CheckList>): Promise<number> {
        return await this.checklist.update(id, {
            ...changes,
            updated_at: new Date().toISOString().replace('Z', ''),
            edited: true,
            synced: false
        });
    }

    async deleteChecklist(id: string): Promise<void> {
        await this.checklist.delete(id);
        await this.deleteChecklistItemsByChecklist(id);
    }

    async deleteChecklistsByCard(card_id: string): Promise<void> {
        const checklists = await this.checklist.where('card_id').equals(card_id).toArray();
        const deletePromises = checklists.map(
            checklist =>{
                this.checklist.delete(checklist.id);
                this.deleteChecklistItemsByChecklist(checklist.id);
            });
        await Promise.all(deletePromises);
    }

    // checklist item crud
    async addChecklistItem(data: Omit<
            CheckListItem, 
            (
                'id' | 
                'created_at' | 
                'updated_at' | 
                'synced' | 
                'edited'
            )
        >): Promise<string> {
        const now = new Date().toISOString().replace('Z', '');
        const item: CheckListItem = {
            id: crypto.randomUUID(),
            ...data,
            created_at: now,
            updated_at: now,
            synced: false,
            edited: false
        };
        await this.checklistItem.add(item);
        return item.id;
    }

    async getChecklistItem(id: string): Promise<CheckListItem | undefined> {
        return await this.checklistItem.get(id);
    }

    async getChecklistItemsByChecklist(checklist_id: string): Promise<CheckListItem[]> {
        return await this.checklistItem.where('checklist_id').equals(checklist_id).sortBy('created_at');
    }

    async updateChecklistItem(id: string, changes: Partial<CheckListItem>): Promise<number> {
        return await this.checklistItem.update(id, {
            ...changes,
            updated_at: new Date().toISOString().replace('Z', ''),
            edited: true,
            synced: false
        });
    }

    async deleteChecklistItem(id: string): Promise<void> {
        await this.checklistItem.delete(id);
    }

    async deleteChecklistItemsByChecklist(checklist_id: string): Promise<void> {
        const items = await this.checklistItem.where('checklist_id').equals(checklist_id).toArray();
        const deletePromises = items.map(item => this.checklistItem.delete(item.id));
        await Promise.all(deletePromises);
    }

    async toggleChecklistItem(id: string): Promise<number> {
        const item = await this.getChecklistItem(id);
        if (!item) return 0;
        return await this.updateChecklistItem(id, { completed: !item.completed });
    }

    // comment crud
    async addComment(data: { 
        card_id: string; 
        content: string; 
        user?: string | null 
    }): Promise<string> {
        const now = new Date().toISOString().replace('Z', '');
        const comment: Comment = {
            id: crypto.randomUUID(),
            card_id: data.card_id,
            user: data.user || null,
            content: data.content,
            created_at: now,
            updated_at: null,
            synced: false,
            edited: false
        };
        await this.comment.add(comment);
        return comment.id;
    }

    async getComment(id: string): Promise<Comment | undefined> {
        return await this.comment.get(id);
    }

    async getCommentsByCard(card_id: string): Promise<Comment[]> {
        return await this.comment.where('card_id').equals(card_id).sortBy('created_at');
    }

    async updateCommentContent(id: string, content: string): Promise<number> {
        return await this.comment.update(id, {
            content,
            updated_at: new Date().toISOString().replace('Z', ''),
            edited: true,
            synced: false
        });
    }

    async updateComment(id: string, changes: Partial<Comment>): Promise<number> {
        return await this.comment.update(id, {
            ...changes,
            updated_at: new Date().toISOString().replace('Z', ''),
            edited: true,
            synced: false
        });
    }

    async deleteComment(id: string): Promise<void> {
        await this.comment.delete(id);
    }

    async deleteCommentsByCard(card_id: string): Promise<void> {
        const comments = await this.comment.where('card_id').equals(card_id).toArray();
        const deletePromises = comments.map(comment => this.comment.delete(comment.id));
        await Promise.all(deletePromises);
    }
}

export const db = new AppDB();