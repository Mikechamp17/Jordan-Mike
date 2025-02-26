import { ToDoListItem } from "./todo-list-models";

const item: ToDoListItem = {
    name: "test",
    completed: false,

}
const InitializeItems: ToDoListItem[] = [
    {
        name: "Feed the cat",
        completed: false
    },
    {
        name: "Walk the dog",
        completed: true
      
    },
    {
    name: "Train cat",
    completed: true
    }, 
    {
      name: "Go to gym",
      completed: false
    },
    {
      name:"Jordan is a legend",
      completed: true
    }
]

// Add a close button to each existing list item
const myNodelist: HTMLCollectionOf<Element> = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  addCloseButton(myNodelist[i]);
}

// Function to create and add close button
function addCloseButton(li) {
  const span: HTMLElement = document.createElement("SPAN");
  
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  // Add click handler for the close button
  span.onclick = function() {
    const div = (this as any).parentElement;
    div.style.opacity = "0"; // Smooth fade-out
    setTimeout(() => div.remove(), 300);
  };
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector('ul');
list.addEventListener('click', function(ev: any) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    ev.target.style.backgroundColor = ev.target.classList.contains('checked') ? "#d4edda" : "";
  }
}, false);

// Function to handle the update process
function handleUpdate(event) {
  const button = event.target;
  const listItem = button.parentElement;
//   const currentText = listItem.childNodes[0].textContent.trim();

  const item: ToDoListItem = {
    name: listItem.childNodes[0].textContent.trim(),
  }
  
  if (listItem.querySelector('.edit-input')) {
    // Save changes
    const input = listItem.querySelector('.edit-input');
    const newText = input.value.trim();
    
    if (newText) {
      input.remove();
      listItem.childNodes[0].textContent = newText + ' ';
      button.textContent = 'Update';
    }
  } else {
    // Enter edit mode
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = item.name;
    
    listItem.insertBefore(input, button);
    input.focus();
    button.textContent = 'Save';
  }
}

// Function to add update functionality to buttons
function addUpdateListeners() {
  const updateButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('Update');
  for (let button of updateButtons) {
    const buttonTS: any = button;
    if (!(buttonTS as any).hasListener) {
        buttonTS.addEventListener('click', handleUpdate);
      buttonTS.hasListener = true;
    }
  }
}
//
// Create a new list item when clicking on the "Add" button
function newElement() {
    console.log('test');
  const inputValue = (document.getElementById("myInput") as any).value;
  if (inputValue === '') {
    alert("BRO YOU HAVE TO ADD SOMETHING ??");
    return;
  }

  // Create new list item
  const li = document.createElement("li");

  const newItem: ToDoListItem = {
    name: inputValue
  };
  const textNode = document.createTextNode(newItem.name + ' ');
  li.appendChild(textNode);

  // Create and add update button
  const updateButton = document.createElement("button");
  updateButton.className = "Update";
  updateButton.textContent = "Update";
  li.appendChild(updateButton);

  // Start with 0 opacity for fade-in effect
  li.style.opacity = "0";
  document.getElementById("myUL").appendChild(li);
  
  // Add close button
  addCloseButton(li);
  
  // Add update listener
  addUpdateListeners();
  
  // Clear input and fade in the new item
  (document.getElementById("myInput") as any).value = "";
  setTimeout(() => li.style.opacity = "1", 10);
}

//changes code to test
// Initialize update listeners for existing items
document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading items:', InitializeItems);
  const todoList = document.getElementById("myUL");
  todoList.innerHTML = '';
  
  InitializeItems.forEach(todo => {
    const li = document.createElement("li");
    if (todo.completed) {
      li.classList.add('checked');
      li.style.backgroundColor = "#d4edda";
    }
    li.appendChild(document.createTextNode(todo.name + ' '));
    
    const updateButton = document.createElement("button");
    updateButton.className = "Update";
    updateButton.textContent = "Update";
    li.appendChild(updateButton);
    
    todoList.appendChild(li);
    addCloseButton(li);
  });

  // Add styles for the edit input
  const style = document.createElement('style');
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
});

