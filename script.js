// Game state
let player = {
    happiness: 70,
    energy: 80,
    mood: 75
};

// Current location of the player
let currentLocation = "Room";  // Starting location is their room


let gameOver = false;

// Possible locations and events
const locations = [
    { name: "Lobby", description: "There's a cozy lounge area and a bulletin board with upcoming events." },
    { name: "Restaurant", description: "The food smells delicious. There's a new menu for the day." },
    { name: "Room", description: "It's your personal space. Time to relax or maybe order some room service." },
    { name: "Spa", description: "It's quiet and peaceful. Maybe a massage would lift your mood?" }
];

// Events by Location
const events = {
    "Lobby": [
        { type: "encounter", text: "You meet another guest. They invite you to hang out!" },
        { type: "newEvent", text: "A new event has been announced in the lobby! A dance party tonight!" }
    ],
    "Restaurant": [
        { type: "eating_delicious", text: "You enjoy a delicious meal at the restaurant. Your happiness increases!" },
        { type: "eating_large", text: "You enjoy a large meal at the restaurant. Your happiness increases!" },
        { type: "eating_unique", text: "You enjoy a unique meal at the restaurant. Your happiness increases!" }
    ],
    "Room": [
        { type: "rest", text: "You rest in your room for a while. Your energy improves!" }
    ],
    "Spa": [
        { type: "unexpected", text: "A surprise massage special is offered today!" }
    ]
};


// Function to handle player choices
function handleChoice(choice) {
    if (gameOver) return;

    // Log the choice the player made
    console.log(`Player chose: ${choice}`);

    // Handle location updates and stat changes based on choice
    switch (choice) {
        case "rest":
            currentLocation = "Room"; // Update location to Room
            player.energy = Math.min(100, player.energy + 20);
            player.mood = Math.min(100, player.mood + 10);
            break;
        case "attendEvent":
            currentLocation = "Lobby"; // Stay in the Lobby for the event
            player.happiness += 15;
            player.mood = Math.max(0, player.mood - 5);  // Maybe too much partying decreases mood a bit
            break;
        case "meetGuest":
            currentLocation = "Lobby"; // Stay in the Lobby for meeting guest
            player.happiness += 10;
            break;
        case "eat":
            currentLocation = "Restaurant"; // Change location to Restaurant
            player.happiness += 20;
            break;
        case "goToSpa":
            currentLocation = "Spa"; // Go to the Spa
            player.happiness += 30;
            break;
    }

    // Apply a random event after the action
    applyRandomEvent();

    // Render the game state after the action and event
    renderGame();
}

// Function to apply a random event based on the current location
function applyRandomEvent() {
    console.log("Applying a random event...");

    // Get the events array for the current location
    const currentLocationEvents = events[currentLocation];

    // If there are no events for this location, return
    if (!currentLocationEvents || currentLocationEvents.length === 0) return;

    // Pick a random event from the current location's events
    const randomEvent = currentLocationEvents[Math.floor(Math.random() * currentLocationEvents.length)];

    // Display event in the story text
    let storyText = document.getElementById("story-text");

    // Create a new paragraph for the event
    let eventParagraph = document.createElement("p");
    eventParagraph.innerHTML = `<strong>Event: </strong>${randomEvent.text}`;
    
    // Append the event to the story text
    storyText.appendChild(eventParagraph);

    console.log("Random Event Applied:", randomEvent.text);
}

// Render the game state and choices
function renderGame() {
    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");

    // Clear the current content in storyText
    storyText.innerHTML = '';  // Clear previous content in storyText

    // Find the current location's description
    let locationDescription = locations.find(location => location.name === currentLocation)?.description || "No description available for this location.";

    // Add stats, current location info, and description
    storyText.innerHTML += `
        <p><strong>Happiness:</strong> ${player.happiness}</p>
        <p><strong>Energy:</strong> ${player.energy}</p>
        <p><strong>Mood:</strong> ${player.mood}</p>
        <p><strong>Current Location:</strong> You are in the ${currentLocation}. ${locationDescription}</p>
    `;

    // Add any random event
    applyRandomEvent();  // This will append the random event to the story

    // Show action choices
    choicesDiv.innerHTML = `
        <button onclick="handleChoice('rest')">Rest in Room</button>
        <button onclick="handleChoice('attendEvent')">Attend Event in Lobby</button>
        <button onclick="handleChoice('eat')">Eat at Restaurant</button>
        <button onclick="handleChoice('meetGuest')">Meet Other Guest</button>
        <button onclick="handleChoice('goToSpa')">Go to the Spa</button>
    `;
}


// Initialize the game
renderGame();
