// Add a close button to each existing list item
var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item (fade out effect)
var close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.opacity = "0"; // Smooth fade-out effect
    setTimeout(() => div.remove(), 300); // Remove after animation
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    ev.target.style.backgroundColor = ev.target.classList.contains('checked') ? "#d4edda" : ""; // Green if checked
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  if (inputValue === '') {
    alert("BRO YOU HAVE TO ADD SOMTHING ??");
    return;
  } 

  li.style.opacity = "0"; // Start invisible
  document.getElementById("myUL").appendChild(li);
  setTimeout(() => li.style.opacity = "1", 10); // Fade in effect

  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.onclick = function() {
    var div = this.parentElement;
    div.style.opacity = "0"; // Smooth fade-out
    setTimeout(() => div.remove(), 300);
  };
}

