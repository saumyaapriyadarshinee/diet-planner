function getDiet(event) {
  event.preventDefault(); // prevent form submission reload

  const condition = document.getElementById('condition').value;
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const activityLevel = document.getElementById('activityLevel').value;

  let suggestion = "";

  if (!condition || !age || !weight || !height || !activityLevel) {
    suggestion = "⚠️ Please fill all fields correctly!";
  } 
  else {
    suggestion = generateDiet(condition);
  }

  document.getElementById('dietSuggestion').innerHTML = `
    <div class="suggestion-card">
      <h2>🍽️ Your Personalized Diet Plan</h2>
      <p><strong>Condition:</strong> ${capitalize(condition)}</p>
      <p><strong>Age:</strong> ${age} years</p>
      <p><strong>Weight:</strong> ${weight} kg</p>
      <p><strong>Height:</strong> ${height} cm</p>
      <p><strong>Activity Level:</strong> ${capitalize(activityLevel)}</p>
      <hr>
      <p>${suggestion}</p>
    </div>
  `;
}

function generateDiet(condition) {
  switch(condition) {
    case 'diabetes':
      return `
      🥗 <b>Diabetes Diet Plan:</b><br>
      - Oats<br>
      - Quinoa<br>
      - Leafy Greens (Spinach, Kale)<br>
      - Broccoli<br>
      - Berries (Blueberries, Strawberries)<br>
      - Grilled Chicken<br>
      - Tofu<br>
      - Greek Yogurt
      `;
    case 'pcos':
      return `
      🥗 <b>PCOS Diet Plan:</b><br>
      - Whole Grains (Brown Rice, Quinoa)<br>
      - Green Vegetables (Spinach, Broccoli)<br>
      - Berries<br>
      - Avocados<br>
      - Salmon<br>
      - Almonds<br>
      - Eggs
      `;
    case 'heart':
      return `
      🥗 <b>Heart Health Diet:</b><br>
      - Oats<br>
      - Almonds and Walnuts<br>
      - Salmon and Tuna (Omega-3 rich)<br>
      - Olive Oil<br>
      - Fresh Fruits (Oranges, Berries)<br>
      - Vegetables (Carrots, Spinach)
      `;
    case 'thyroid':
      return `
      🥗 <b>Thyroid Support Diet:</b><br>
      - Seaweed (Iodine source)<br>
      - Yogurt<br>
      - Eggs<br>
      - Berries<br>
      - Brazil Nuts<br>
      - Chicken and Fish<br>
      - Leafy Greens
      `;
    case 'hypertension':
      return `
      🥗 <b>Hypertension Management Diet:</b><br>
      - Bananas (Potassium-rich)<br>
      - Beets<br>
      - Leafy Greens<br>
      - Oats<br>
      - Low-fat Yogurt<br>
      - Garlic<br>
      - Salmon
      `;
    default:
      return "⚠️ No diet plan available for this condition.";
  }
}

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}
