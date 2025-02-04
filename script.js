// Add a close button to each existing list item
var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  addCloseButton(myNodelist[i]);
}

// Function to create and add close button
function addCloseButton(li) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  // Add click handler for the close button
  span.onclick = function() {
    var div = this.parentElement;
    div.style.opacity = "0"; // Smooth fade-out
    setTimeout(() => div.remove(), 300);
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    ev.target.style.backgroundColor = ev.target.classList.contains('checked') ? "#d4edda" : "";
  }
}, false);

// Function to handle the update process
function handleUpdate(event) {
  const button = event.target;
  const listItem = button.parentElement;
  const currentText = listItem.childNodes[0].textContent.trim();
  
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
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = currentText;
    
    listItem.insertBefore(input, button);
    input.focus();
    button.textContent = 'Save';
  }
}

// Function to add update functionality to buttons
function addUpdateListeners() {
  const updateButtons = document.getElementsByClassName('Update');
  for (let button of updateButtons) {
    if (!button.hasListener) {
      button.addEventListener('click', handleUpdate);
      button.hasListener = true;
    }
  }
}
//
// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("BRO YOU HAVE TO ADD SOMETHING ??");
    return;
  }

  // Create new list item
  var li = document.createElement("li");
  var textNode = document.createTextNode(inputValue + ' ');
  li.appendChild(textNode);

  // Create and add update button
  var updateButton = document.createElement("button");
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
  document.getElementById("myInput").value = "";
  setTimeout(() => li.style.opacity = "1", 10);
}


// Initialize update listeners for existing items
document.addEventListener('DOMContentLoaded', function() {
  addUpdateListeners();
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
