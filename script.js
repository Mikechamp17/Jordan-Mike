function Greet() {
    console.log("heyy")
    
}

function greet() {
    const name = prompt("Please enter your name:");
    if (name) {
        alert(`Hello, ${name}! Welcome to our website!`);
    } else {
        alert("Hello, Guest! Welcome to our website!");
    }
}