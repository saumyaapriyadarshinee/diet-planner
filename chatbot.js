const intents = {
  intents: [
    {
      tag: "greeting",
      patterns: ["Hi", "Hello", "Hey", "Good morning", "Good afternoon", "Good evening"],
      responses: [
        "Hello! 🌟 I'm your Diet Planner Assistant. How can I help you today?",
        "Hey there! Ready to plan some healthy meals? 🥗",
        "Hi! Let's talk about your nutrition goals! 💬"
      ]
    },
    {
      tag: "diet_plan",
      patterns: [
        "Create a diet plan", "Make a diet plan for me", "Plan my meals",
        "Suggest a diet", "Help me with a diet plan", "Meal plan for me"
      ],
      responses: [
        "Sure! Can you please tell me your goal? (weight loss, muscle gain, maintenance) 🍴",
        "I'd love to! First, can you share your goal with me? 🥑",
        "Let's do it! What's your main goal right now? (e.g., lose weight, stay fit) 🏋️‍♂️"
      ]
    },
    {
      tag: "bmi_calculation",
      patterns: [
        "What is my BMI?", "Calculate my BMI", "BMI calculation", "How is my BMI?"
      ],
      responses: [
        "Sure! Please tell me your weight in kg and height in cm (or meters). 📏",
      ]
    }
  ]
};

let userWeight = null;
let userHeight = null;
let suggestionGiven = false;  // Tracks if suggestions were shown

// Function to get a random item from an array
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Send user message and get bot response
function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput === "") return;

  addMessage(userInput, "user");

  let botResponse = "I'm sorry, I didn't understand that. Can you please rephrase?";

  // Handle "ok" after suggestion
  if (suggestionGiven && userInput.toLowerCase() === "ok") {
    botResponse = "Great! Let's get started with your plan 💪. Stay consistent and check in anytime!";
    suggestionGiven = false;
  }

  // Handle weight and height
  else if (userInput.toLowerCase().includes("weight")) {
    const weightMatch = userInput.match(/(\d+(\.\d+)?)/);
    if (weightMatch) {
      userWeight = parseFloat(weightMatch[0]);
      botResponse = "Got it! Now, please provide your height in cm.";
    } else {
      botResponse = "Please provide a valid weight in kg.";
    }
  } else if (userInput.toLowerCase().includes("height")) {
    const heightMatch = userInput.match(/(\d+(\.\d+)?)/);
    if (heightMatch) {
      userHeight = parseFloat(heightMatch[0]);
      botResponse = "Thanks for the information! Calculating your BMI now...";
    } else {
      botResponse = "Please provide a valid height in cm.";
    }
  }

  // Intent matching
  else {
    for (let intent of intents.intents) {
      for (let pattern of intent.patterns) {
        if (userInput.toLowerCase().includes(pattern.toLowerCase())) {
          botResponse = getRandomResponse(intent.responses);
          break;
        }
      }
    }
  }

  // BMI calculation and suggestions
  if (userWeight !== null && userHeight !== null) {
    const heightInMeters = userHeight / 100;
    const bmi = userWeight / (heightInMeters * heightInMeters);

    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 18.5 && bmi < 24.9) bmiCategory = 'Normal weight';
    else if (bmi >= 25 && bmi < 29.9) bmiCategory = 'Overweight';
    else bmiCategory = 'Obesity';

    botResponse = `✅ Your BMI is ${bmi.toFixed(2)}. This falls under the category: **${bmiCategory}**.\n`;

    switch (bmiCategory) {
      case 'Underweight':
        botResponse += "\n🍽️ Food Suggestion: Eat more protein, peanut butter, milkshakes.\n🏋️ Workout: Focus on strength training and bodyweight exercises.";
        break;
      case 'Normal weight':
        botResponse += "\n🍽️ Food Suggestion: Balanced diet – fruits, veggies, whole grains, and lean proteins.\n🏃 Workout: Mix of cardio and strength training to stay fit.";
        break;
      case 'Overweight':
        botResponse += "\n🍽️ Food Suggestion: Cut sugar, go for high-fiber foods like oats, legumes.\n🚶 Workout: Daily 30–40 min walking, light cardio.";
        break;
      case 'Obesity':
        botResponse += "\n🍽️ Food Suggestion: Portion control, salads, avoid fried foods.\n🏃‍♂️ Workout: Start with brisk walking and consult a fitness expert.";
        break;
    }

    botResponse += "\n\nType **ok** to proceed.";
    suggestionGiven = true;

    // Reset user input state
    userWeight = null;
    userHeight = null;
  }

  // Show the bot response
  setTimeout(() => {
    addMessage(botResponse, "bot");
  }, 500);

  document.getElementById("user-input").value = "";
}

// Function to add message to chat
function addMessage(message, sender) {
  const messageContainer = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.innerText = message;
  messageContainer.appendChild(messageDiv);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
