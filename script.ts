import { ToDoListItem, ToDoListItemList } from './todo-list-models';

class TodoList implements ToDoListItemList {
    public items: ToDoListItem[] = [];
    private static nextId = 1;

    constructor() {
        this.loadExistingItems();
    }

    private loadExistingItems(): void {
        const myNodelist = document.getElementsByTagName("li") as HTMLCollectionOf<HTMLLIElement>;
        for (let i = 0; i < myNodelist.length; i++) {
            const li = myNodelist[i];
            const todoItem: ToDoListItem = {
                id: TodoList.nextId++,
                name: li.childNodes[0].textContent?.trim() || '',
                completed: li.classList.contains('checked'),
                createdAt: new Date()
            };
            this.items.push(todoItem);
            this.addCloseButton(li, todoItem.id);
        }
    }

    addItem(item: ToDoListItem): void {
        this.items.push(item);
        this.renderItem(item);
    }

    removeItem(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    updateItem(id: number, updates: Partial<ToDoListItem>): void {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updates };
        }
    }

    getItems(): ToDoListItem[] {
        return [...this.items];
    }

    private renderItem(item: ToDoListItem): void {
        const li: HTMLLIElement = document.createElement("li");
        const textNode: Text = document.createTextNode(item.name + ' ');
        li.appendChild(textNode);
        
        if (item.completed) {
            li.classList.add('checked');
            li.style.backgroundColor = "#d4edda";
        }

        // Create and add update button
        const updateButton: HTMLButtonElement = document.createElement("button");
        updateButton.className = "Update";
        updateButton.textContent = "Update";
        li.appendChild(updateButton);

        // Start with 0 opacity for fade-in effect
        li.style.opacity = "0";
        const ul = document.getElementById("myUL");
        if (ul) {
            ul.appendChild(li);
        }

        this.addCloseButton(li, item.id);
        this.addUpdateListeners();

        // Fade in the new item
        setTimeout(() => li.style.opacity = "1", 10);
    }

    private addCloseButton(li: HTMLLIElement, itemId: number): void {
        const span: HTMLSpanElement = document.createElement("SPAN");
        const txt: Text = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        span.onclick = () => {
            const div = span.parentElement;
            if (div) {
                div.style.opacity = "0";
                setTimeout(() => {
                    div.remove();
                    this.removeItem(itemId);
                }, 300);
            }
        };
    }

    private handleUpdate(event: MouseEvent, itemId: number): void {
        const button = event.target as HTMLButtonElement;
        const listItem = button.parentElement as HTMLLIElement;
        const currentText = listItem.childNodes[0].textContent?.trim() || '';

        if (listItem.querySelector('.edit-input')) {
            const input = listItem.querySelector('.edit-input') as HTMLInputElement;
            const newText = input.value.trim();

            if (newText) {
                input.remove();
                listItem.childNodes[0].textContent = newText + ' ';
                button.textContent = 'Update';
                this.updateItem(itemId, { name: newText });
            }
        } else {
            const input: HTMLInputElement = document.createElement('input');
            input.type = 'text';
            input.className = 'edit-input';
            input.value = currentText;

            listItem.insertBefore(input, button);
            input.focus();
            button.textContent = 'Save';
        }
    }

    private addUpdateListeners(): void {
        const updateButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('Update');
        for (const button of updateButtons) {
            const typedButton = button as HTMLButtonElement & { hasListener?: boolean };
            if (!typedButton.hasListener) {
                const listItem = typedButton.parentElement as HTMLLIElement;
                const itemId = this.items.find(item => item.name === listItem.childNodes[0].textContent?.trim())?.id;
                if (itemId) {
                    typedButton.addEventListener('click', (e) => this.handleUpdate(e, itemId));
                    typedButton.hasListener = true;
                }
            }
        }
    }

    public static getNextId(): number {
        return TodoList.nextId++;
    }
}

// Initialize the TodoList
const todoList = new TodoList();

// Add click listener for checking/unchecking items
const list: HTMLUListElement | null = document.querySelector('ul');
list?.addEventListener('click', function(ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    if (target.tagName === 'LI') {
        target.classList.toggle('checked');
        const completed = target.classList.contains('checked');
        target.style.backgroundColor = completed ? "#d4edda" : "";
        
        const itemName = target.childNodes[0].textContent?.trim();
        const item = todoList.getItems().find(item => item.name === itemName);
        if (item) {
            todoList.updateItem(item.id, { completed });
        }
    }
});

// Function to add new todo item
function newElement(): void {
    const input = document.getElementById("myInput") as HTMLInputElement;
    const inputValue = input.value;
    if (inputValue === '') {
        alert("BRO YOU HAVE TO ADD SOMETHING ??");
        return;
    }
    const newItem: ToDoListItem = {
        id: TodoList.getNextId(),
        name: inputValue,
        completed: false,
        createdAt: new Date()
    };

    todoList.addItem(newItem);
    input.value = "";
}

// Initialize styles
const style: HTMLStyleElement = document.createElement('style');
style.textContent = `
    .edit-input {
        margin: 0 5px;
        padding: 3px;
    }
    .Update {
        margin-left: 8px;
        cursor: pointer;
    }
`;
document.head.appendChild(style); 