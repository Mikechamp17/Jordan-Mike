export interface ToDoListItem {
    name: string;
    description?: string;
    completed?: boolean;
}

export interface ToDoListItemList {
    items: ToDoListItem[]
}