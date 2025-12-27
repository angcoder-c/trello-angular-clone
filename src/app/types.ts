// ============== BOARD =============
export interface Board {
    id: string  // UUID 
    title: string
    description: string | null
    backgroundColor: Color[]
    isFavorite: boolean
    isPublic: boolean
    position: number 
    created_at: string
    updated_at: string
    last_visit: string
    synced: boolean
    edited: boolean
}

// ============= LIST =============
export interface List {
    id: string  // UUID
    board_id: string 
    name: string
    collapse: boolean
    color: Color
    position: number
    created_at: string
    updated_at: string
    synced: boolean
    edited: boolean
}

// ============ CARD =============
export interface Card {
    id: string  // UUID
    list_id: string 
    title: string
    description: string | null
    position: number  
    maturity: string | null
    created_at: string
    updated_at: string
    completed: boolean
    synced: boolean
    edited: boolean
}

// ============ LABEL =============
export interface Label {
    id: string  // UUID
    label_option_id: string
    card_id: string
    name: string | null
    color: Color
    created_at: string
    synced: boolean
    edited: boolean
}

// ============ LABEL OPTION =============
export interface LabelOption {
    id: string  // UUID
    list_id: string
    name: string | null
    color: Color
    created_at: string
    synced: boolean
    edited: boolean
}

// ============ CHECKLIST =============
export interface CheckList {
    id: string  // UUID
    card_id: string
    title: string
    created_at: string
    updated_at: string
    synced: boolean
    edited: boolean
}

export interface CheckListItem {
    id: string 
    checklist_id: string
    title: string
    completed: boolean
    maturity: string | null
    created_at: string
    updated_at: string
    synced: boolean
    edited: boolean
}

// ============ COMMENT =============
export interface Comment {
    id: string
    card_id: string
    user: string | null
    content: string
    created_at: string
    updated_at: string | null
    synced: boolean
    edited: boolean
}

// ============ COLOR =============
export interface Color {
    hex: string
    opacity: number | null
}