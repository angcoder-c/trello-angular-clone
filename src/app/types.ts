// ============== BOARD =============
// remote board type
export interface Board {
    id: string | null
    title: string
    description: string | null
    lists: List[]
    isFavorite: boolean
    isPublic: boolean
    backgrounsColors: Color[]
    created_at: string
    last_visit: string
}

// ============= COLOR ============
export interface Color {
    hex: string
    opacity: number | null
}

// ============= LIST =============
// remote list type
export interface List {
    id: string | null
    name: string
    collapse: boolean
    color: Color
    created_at: string
}

// ============ CARD =============
// remote
export interface Card {
    id: string | null
    title: string
    description: string | null
    labels: Label[]
    checklists: CheckList[]
    comments: Comment[]
    created_at: string
    maturity: string | null
}

// ============ LABEL =============

export interface Label {
    name: string | null
    color: Color
}

export interface CheckList {
    title: string
    items: CheckListItem[]
}

export interface CheckListItem {
    title: string
    completed: boolean
    maturity: string
}

export interface Comment {
    user: string
    content: string
    created_at: string
}