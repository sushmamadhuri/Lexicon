let currentMeal = {};
let MealsFromLS = [];

function onPageLoad(){
 const param = new URLSearchParams(window.location.search);
 const id = param.get("id");
 MealsFromLS = JSON.parse(localStorage.getItem('All_meals'));
 currentMeal = MealsFromLS.find((e) => e.idCategory === id);

 renderSelectedMealToUi();

};
//execute on page load
onPageLoad();

function renderSelectedMealToUi()
{
   
   const imageEl = document.getElementById('image-id');
   imageEl.setAttribute("src",currentMeal.strCategoryThumb);
   imageEl.setAttribute("alt", `This is ${currentMeal.strCategory} image`);
   document.getElementById('meal-name').innerText = currentMeal.strCategory;
   document.getElementById('tasted').checked = currentMeal.tasted;
};

const checkboxEl = document.getElementById('tasted');
checkboxEl.addEventListener("click",(e)=>{
    handelTastedClicked(e);
});

function handelTastedClicked(e)
{
    if(e){        
    currentMeal.tasted = e.target.checked;
    }
//update currentMeal to local storage
    const index = MealsFromLS.findIndex((m) => m.idCategory === currentMeal.idCategory );
    MealsFromLS.splice(index, 1, currentMeal);
    localStorage.setItem("All_Meals_withUpdatedMeal", JSON.stringify(MealsFromLS));

    const tastedMeals = JSON.parse(localStorage.getItem("tasted_Meals") || "[]");
    if(currentMeal.tasted)
    {
        tastedMeals.push(currentMeal);
        localStorage.setItem("tasted_Meals",JSON.stringify(tastedMeals));
    }
    else{
         
        let index = MealsFromLS.findIndex((m) => m.idCategory === currentMeal.idCategory );
        tastedMeals.splice(index,1);
        localStorage.setItem("tasted_Meals", JSON.stringify(tastedMeals));

    }


};

document.getElementById("rating-options").addEventListener("change",(e) => {

    const rating = e.target.value;
    currentMeal.rating = rating;  

    if(!currentMeal.tasted)
    {
        checkboxEl.checked = true;
        currentMeal.tasted = true;
        handelTastedClicked();
    }
    let index = MealsFromLS.findIndex((m) => m.idCategory === currentMeal.idCategory);
    MealsFromLS.splice(index, 1, currentMeal);
    localStorage.setItem("All_meals", JSON.stringify(MealsFromLS));
    document.getElementById("rating").innerText = `${currentMeal.rating} /5 `;

});