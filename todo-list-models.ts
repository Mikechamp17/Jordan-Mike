export interface ToDoListItem {
    id: number;
    name: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

export interface ToDoListItemList {
    items: ToDoListItem[];
    addItem(item: ToDoListItem): void;
    removeItem(id: number): void;
    updateItem(id: number, updates: Partial<ToDoListItem>): void;
    getItems(): ToDoListItem[];
} 