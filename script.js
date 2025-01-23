// Game state
let player = {
    happiness: 70,
    energy: 80,
    mood: 75
};

let gameOver = false;

// Possible locations and events
const locations = [
    { name: "Lobby", description: "You are in the hotel lobby. There's a cozy lounge area and a bulletin board with upcoming events." },
    { name: "Restaurant", description: "You enter the hotel restaurant. The food smells delicious. There's a new menu for the day." },
    { name: "Room", description: "You're in your hotel room. It's your personal space. Time to relax or maybe order some room service." },
    { name: "Spa", description: "You arrive at the spa. It's quiet and peaceful. Maybe a massage would lift your mood?" }
];

// Events that happen randomly or based on choice
const events = [
    { type: "newEvent", text: "A new event has been announced in the lobby! A dance party tonight!" },
    { type: "encounter", text: "You meet another guest. They're friendly and invite you to hang out!" },
    { type: "rest", text: "You rest in your room for a while. Your energy improves!" },
    { type: "eating", text: "You enjoy a nice meal at the restaurant. Your happiness increases!" },
    { type: "unexpected", text: "Something unexpected happens in the lobby! A surprise fire drill!" }
];

// Function to handle player choices
function handleChoice(choice) {
    if (gameOver) return;

    switch (choice) {
        case "rest":
            player.energy = Math.min(100, player.energy + 20);
            player.mood = Math.min(100, player.mood + 10);
            break;
        case "attendEvent":
            player.happiness += 15;
            player.mood = Math.max(0, player.mood - 5);  // Maybe too much partying decreases mood a bit
            break;
        case "meetGuest":
            player.happiness += 10;
            break;
        case "eat":
            player.happiness += 20;
            break;
    }

    // Apply a random event after each choice
    applyRandomEvent();

    // Render the game state after the action
    renderGame();
}

// Function to apply a random event
function applyRandomEvent() {
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const eventText = randomEvent.text;

    // Display event in the story text area
    let storyText = document.getElementById("story-text");
    
    // Create a new paragraph for the event
    let eventParagraph = document.createElement("p");
    eventParagraph.innerHTML = `<strong>Event: </strong>${eventText}`;
    
    // Append the event to the story text
    storyText.appendChild(eventParagraph);
}

// Render the game state and choices
function renderGame() {
    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");

    // Clear previous story text and stats, then show updated info
    storyText.innerHTML = `
        <p><strong>Happiness:</strong> ${player.happiness}</p>
        <p><strong>Energy:</strong> ${player.energy}</p>
        <p><strong>Mood:</strong> ${player.mood}</p>
        <p><strong>Current Location:</strong> You are in the hotel lobby. What would you like to do next?</p>
    `;

    choicesDiv.innerHTML = `
        <button onclick="handleChoice('rest')">Rest in Room</button>
        <button onclick="handleChoice('attendEvent')">Attend Event in Lobby</button>
        <button onclick="handleChoice('eat')">Eat at Restaurant</button>
        <button onclick="handleChoice('meetGuest')">Meet Other Guest</button>
    `;
}

// Initialize the game
renderGame();

