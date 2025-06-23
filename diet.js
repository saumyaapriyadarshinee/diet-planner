document.addEventListener('DOMContentLoaded', () => {
    const mealInput = document.getElementById('meal');
    const calorieInput = document.getElementById('calories');
    const addMealBtn = document.querySelector('.add-meal-btn');
    const mealLogDiv = document.getElementById('mealLog');
    const generateDietBtn = document.querySelector('button');
    const dietList = document.getElementById('dietList');

    // Function to render meals
    const renderMeals = () => {
        const meals = JSON.parse(localStorage.getItem('mealLog')) || [];
        mealLogDiv.innerHTML = ''; // Clear previous meals
        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('meal-item');
            mealDiv.innerHTML = `<strong>${meal.name}</strong> - ${meal.calories} kcal`;
            mealLogDiv.appendChild(mealDiv);
        });
    };

    // Function to generate the diet plan based on mood
    const generateDietPlan = () => {
        const moodLog = JSON.parse(localStorage.getItem('moodLog')) || [];
        const lastMood = moodLog[moodLog.length - 1];
        dietList.innerHTML = ''; // Clear any existing diet plan

        let dietSuggestions = [];

        if (lastMood) {
            const mood = lastMood.mood;
            if (mood === '😄' || mood === '🙂') {
                dietSuggestions = [
                    'Breakfast: High-protein oatmeal with fruits',
                    'Lunch: Grilled chicken salad with quinoa',
                    'Dinner: Stir-fried veggies with tofu'
                ];
            } else if (mood === '😐') {
                dietSuggestions = [
                    'Breakfast: Smoothie with spinach, banana, and almond milk',
                    'Lunch: Lentil soup with brown rice',
                    'Dinner: Veggie stir-fry with tofu'
                ];
            } else if (mood === '☹️' || mood === '😭') {
                dietSuggestions = [
                    'Breakfast: Avocado toast with eggs',
                    'Lunch: Comfort soup with bread',
                    'Dinner: Pasta with tomato sauce and cheese'
                ];
            }

            dietSuggestions.forEach(diet => {
                const listItem = document.createElement('li');
                listItem.textContent = diet;
                dietList.appendChild(listItem);
            });
        }
    };

    // Add meal event
    addMealBtn.addEventListener('click', () => {
        const mealName = mealInput.value.trim();
        const calories = parseInt(calorieInput.value.trim(), 10);

        if (!mealName || isNaN(calories)) {
            alert('Please enter valid meal description and calorie count.');
            return;
        }

        // Create meal entry
        const mealEntry = {
            name: mealName,
            calories: calories,
            timestamp: new Date().toISOString(),
        };

        // Save to localStorage
        const mealLog = JSON.parse(localStorage.getItem('mealLog')) || [];
        mealLog.push(mealEntry);
        localStorage.setItem('mealLog', JSON.stringify(mealLog));

        // Clear inputs
        mealInput.value = '';
        calorieInput.value = '';

        // Re-render meals
        renderMeals();
    });

    // Generate diet plan when button is clicked
    generateDietBtn.addEventListener('click', generateDietPlan);

    // Initial render of meals
    renderMeals();

    // Automatically generate diet plan if mood is already logged
    generateDietPlan();
});

  