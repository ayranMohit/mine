const reloadBtn = document.getElementById("reload");
const input = document.getElementById("input");
const searchBtn = document.getElementById("search");
const favContainer = document.getElementById("fav-container");
const resultBtn = document.getElementById("span");
const mealDiv = document.getElementById("mealDiv");
const favMealUl = document.getElementById("favMealUl");
const favh1 = document.getElementById("favh1");
const clearListBtn = document.getElementById("clearList");
const popupCloseButton = document.getElementById("popupCloseButton");
const popupContainer = document.getElementById("popup-container");
const popupContainerHeader = document.getElementById("popup-container-header");
const popupContainerBody = document.getElementById("popup-container-body");

popupCloseButton.onclick = () => {
  popupContainer.style.display = "none";
};

clearListBtn.onclick = () => {
  localStorage.clear();
  addMealToFavList();
};

reloadBtn.onclick = () => location.reload();

const getRandomMeal = () => {
  console.log("getRandomMeal function is working");
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((json) => {
      const randomMeal = json.meals[0];
      console.log({ randomMeal });
      resultBtn.innerText = "Random Recipe";
      addrandomMeal(randomMeal, true);
    });
};
resultBtn.onclick = () => {
  if (resultBtn.innerText == "Random Recipe") {
    resultBtn.classList.add(".random")
    //reloadBtn.style.width = "210px"
    console.log("button is working");
    getRandomMeal();
  }
};
getRandomMeal();
const getMealById = async (MealId) => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + MealId
  );
  const responseData = await response.json();
  const mealdata = responseData.meals[0];
  return mealdata;
};

const getMealBySearch = () => {
  const mealName = input.value;
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName)
    .then((response) => response.json())
    .then((json) => {
      const mealArray = json.meals;
      if (mealArray) {
        mealArray.forEach((arrayMeal) => {
          addrandomMeal(arrayMeal, true);
        });
      }
    });
};

addrandomMeal = (meal, random = false) => {
  const resultMeal = document.createElement("div");
  resultMeal.classList.add("randomResultDiv");
  mealDiv.innerHTML = ""
  
  resultMeal.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="image" />
  <div class="resultBody"><span class="span">${meal.strMeal}</span>
  <button class='favBtn' id='favBtn' ><i class='fas fa-heart'></i></button>
  </div>`;
  const favBtn = resultMeal.querySelector(".favBtn");
  const imageBtn = resultMeal.querySelector(".image");
  imageBtn.onclick = () => {
    popUpForRandom(meal);
  };
  const spanBtn = resultMeal.querySelector(".span");
  spanBtn.onclick = () => {
    popUpForRandom(meal);
  };
  favBtn.onclick = () => {
    if (favBtn.classList.contains("active")) {
      favBtn.classList.remove("active");
      removeMealFromLs(meal.idMeal);
      addMealToFavList();
    } else {
      favBtn.classList.add("active");
      addMealToLs(meal.idMeal);
      addMealToFavList();
    }
    console.log("addMealToFavList is working in favBtn");
  };
  mealDiv.appendChild(resultMeal);
};
searchBtn.onclick = () => {
  if (input.value) {
    mealDiv.innerHTML = "";
    getMealBySearch();
    resultBtn.innerText = `Searched Result Of  "${input.value}"`;
    input.value = "";
  }
};
getMealFromLs = () => {
  const mealData = localStorage.getItem("meals")
    ? JSON.parse(localStorage.getItem("meals"))
    : [];

  return mealData;
};
addMealToLs = (meal) => {
  const meals = getMealFromLs();
  localStorage.setItem("meals", JSON.stringify([...meals, meal]));
};
removeMealFromLs = (mealId) => {
  const meals = getMealFromLs();
  localStorage.setItem(
    "meals",
    JSON.stringify(meals.filter((id) => id !== mealId))
  );
};
const addMealToFavList = async () => {
  const mealist = getMealFromLs();
  if (mealist.length > 0) {
    favh1.innerText = `Favourite Meal(${mealist.length})`;
    clearListBtn.style.opacity = "1";
  } else {
    favh1.innerText = "Favourite Meal";
    clearListBtn.style.opacity = "0";
  }
  favMealUl.innerHTML = "";
  for (let i = 0; i < mealist.length; i++) {
    const element = mealist[i];
    const mealId = await getMealById(element);
    // console.log(mealId);
    showMealToFavList(mealId);
  }
};

addMealToFavList();

function showMealToFavList(meal) {
  const list = document.createElement("li");
  favMealUl.appendChild(list);
  list.innerHTML = `<img src="${meal.strMealThumb}" alt ="${meal.strMeal}" class="image"><span class="span">${meal.strMeal}</span><button id="closeBtn" class="closeBtn"><i class="fa-solid fa-circle-xmark"></i></button>`;
  const imageeBtn = list.querySelector(".image");
  imageeBtn.onclick = () => {
    popUpCertain(meal);
  };
  const spannBtn = list.querySelector(".span");
  spannBtn.onclick = () => {
    popUpCertain(meal);
  };
  const closeBtn = list.querySelector(".closeBtn");
  closeBtn.onclick = () => {
    removeMealFromLs(meal.idMeal);
    addMealToFavList();
  };
}
popUpForRandom = (meal) => {
  popupContainer.style.display = "block";
  popupContainerHeader.innerHTML = `<h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>`;
  const ingradientsAray = [];
  for (let i = 1; i < 21; i++) {
    if (meal["strIngredient" + i]) {
      ingradientsAray.push(
        `${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}`
      );
      console.log(ingradientsAray);
    }
    popupContainerBody.innerHTML = `<h2>Instructions</h2><p>${
      meal.strInstructions
    }</p><h2>Ingredient</h2><ul>${ingradientsAray
      .map((ing) => `<li>${ing}</li>`)
      .join("")}</ul>`;
  }
};
popUpCertain = (meal) => {
  popupContainer.style.display = "block";
  popupContainerHeader.innerHTML = `<h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>`;
  popupContainerBody.innerHTML = `<h2>Instructions</h2><p>${meal.strInstructions}</p><h2>Ingredient</h2><ul class="ul"></ul>`;
  const liContainer = popupContainerBody.querySelector(".ul");
  const ingradientsAray = [];
  for (let i = 1; i < 21; i++) {
    if (meal["strIngredient" + i]) {
      ingradientsAray.push(
        `${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}`
      );
      console.log(ingradientsAray);
    }
  }
  ingradientsAray.map((ing) => {
    const list = document.createElement("li");
    list.innerHTML = `${ing}`;
    liContainer.appendChild(list);
  });
};
