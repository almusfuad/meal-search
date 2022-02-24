let searchText;

// searching for result
const searchFood = () => {
    const searchField = document.getElementById('search-field')
    searchText = searchField.value;
    searchField.value = '';

    // empty string error handling
    if (searchText == '') {
        return alert('Please insert a food name.')
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }

}


// showing result
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    // console.log(meals);
    // clear data
    searchResult.textContent = '';

    if (meals === null) {
        return alert("Sorry..! The food you search for is not in the list");
    } else {
        meals.forEach(meal => {
            // console.log(meal);

            // do opertaion to build new card for every item
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadIdMeal(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 180)}
                        </p>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        })
    }


}




// dynamically get the value of every card
const loadIdMeal = mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]));
}


const displayMealDetails = meal => {


    // do peration to build food details
    const detailCard = document.getElementById('meal-details');
    detailCard.textContent = '';
    const div = document.createElement('div');
    div.classList.add('side-by-side');
    div.innerHTML = `
    <div class="side-by-side row g-0">
        <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" class="btn btn-info">How to make</a>
             </div>
         </div>
    </div>
    `;
    detailCard.appendChild(div);
}