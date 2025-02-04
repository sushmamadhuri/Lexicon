let allMealsCategories = [];
let Base_Url = "https://www.themealdb.com/api/json/v1/1/categories.php";

async function fetchMeals() {
    //fetching data from the API
    try {
        const response = await fetch(Base_Url);

        if (!response.ok) {
            throw new Error(`Error status:${response.status}`);
        }
        const data = await response.json();
        const categories = data.categories;//extracting array from the object
        //adding two new keys to the each object
        categories.forEach(mealcategory => {
            mealcategory.tasted = false;
            mealcategory.rating = 0;
        });
        //storing all the meal categories into local storage
        localStorage.setItem("All_meals", JSON.stringify(categories));

    } catch (error) {
        console.error(error);
    }

};

function checkMeals() {
    //getting the meals fom localstorage 
    const mealsFromLS = JSON.parse(localStorage.getItem("All_meals"));
    if (mealsFromLS) {
        //paasing all meals from Local storage to renderMealsToUi method to display all the meals on the page.
        renderMealsToUi(mealsFromLS);
    }
    else {
        //if we dont find meals from the local storage do fetch by using fetchMeals() method,
        //and then get the meals from the local storage and render to  the UI

        fetchMeals();
        const updatedMeals = JSON.parse(localStorage.getItem("All_meals"));
        renderMealsToUi(updatedMeals);
    }
};
checkMeals();//on page load this method executes.
function renderMealsToUi(allMeals) {
    //accessing the DOM element
    const mealsContainerEl = document.getElementById('meal-container');
    //creating an article for each category and adding eventlistner for the whole container.    
    allMeals.forEach((meal) => {
        const articleEl = document.createElement('article');
        articleEl.id = meal.idCategory;
        mealsContainerEl.addEventListener("click", (e) => {
            const target = e.target;
            const article = target.closest("article");
            if (article) {
                window.location.href = `/selectedMeal.html?id=${encodeURIComponent(article.id)}`;
            }
        });
        const figureEl = document.createElement('figure');
        figureEl.style.backgroundImage = `url(${meal.strCategoryThumb})`;
        const categoryNameEl = document.createElement('h1');
        categoryNameEl.innerText = meal.strCategory;
        figureEl.appendChild(categoryNameEl);
        articleEl.appendChild(figureEl);
        /* const figcaptionEl  = document.createElement('figcaption');
        figcaptionEl.innerText = meal.strCategoryDescription;
        figureEl.appendChild(figcaptionEl); */
        //finally appending entire article to the sction container.
        mealsContainerEl.appendChild(articleEl);

    });
};