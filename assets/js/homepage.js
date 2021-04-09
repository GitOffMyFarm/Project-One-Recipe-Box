//required ID's to access the edamam API and Spoonacular API
var apiKey = '4cde2fcaa2d223801818ad5248f452a6';
var apiId = 'f5e5e3c6'
var spoonKey = 'a51ffaacdc13418abc909cc8018c8e4a';
//keyphrase that is called within the URL, later we can append the keyphrase and redefine the requestURL variable within a conditional inside of a click event based on what someone has searched
var keyPhrase = "";
//URL for doing a keyword search in the edamam API
var requestUrl = `https://api.edamam.com/search?q=${keyPhrase}&app_id=${apiId}&app_key=${apiKey}`;
//URL for fetch request for wine pairing function
var spoonUrl = `https://api.spoonacular.com/food/wine/pairing?food=${keyPhrase}&apiKey=${spoonKey}`;
//Sets the local saved cards in Local Storage to an array so that we can add to it
var savedCards = [];

//appends recipes to page, for scope purposes leaving arguments to pass later and once we define the variable within the getRecipe function we'll pass those variables in
function addCard(x, y, z) {
//body below will have to be changed to wherever we're putting the recipe cards, also styling within the div we're adding on will need to be changed as well as possibly the element itself
$('#test').append(
`<div class='card'>
<div class='card-section'>
<h2>${x}</h2><br>
<img src="${y}" alt='A view of the cooked recipe'/><br>
<footer><a href="${z}">View This Recipe</a><br>
<button type='button' class='saveButton'>Save Recipe</button></footer>
</div>
</div>`
)};
//function with arguments to add in variables needed
function addWineCard(w, x, y, z){
//adds card class to dive we're pushing this to
$('#wine-card').addClass('card');
//adds wine card into targeted div with open options for API objects
$('#wine-card').append(
`<div class='card-section'>
<h2>Possible Wine Pairing's For Your Meal:</h2><br>
<p>${w}</p><br>
<h2>Reccomendation:</h2><br>
<h3>${x}</h3><br>
<p>${y} Usually priced at: ${z}</p>`
)};
//function that fetches wine reccomendation URL
function getWine(x) {
    fetch(x)
    .then(function (response) {
        return response.json();
    })
    //if there is no reccomendation it won't show anything
    .then(function (data) {
        if (data.status === 'failure') {
            return;
        }
        //adds all needed objects into variables then puts them into wine card arguments
        else {
            pairingText = data.pairingText;
            productTitle = data.productMatches[0].title;
            productDescription = data.productMatches[0].description;
            productPrice = data.productMatches[0].price;
            addWineCard(pairingText, productTitle, productDescription, productPrice);
        }
    })
};
//function to fetch API above (represented by x here) and get elements we need from it
function getRecipe(x) {
    //fetching of API
	fetch(x)
	.then(function (response) {
		return response.json();
	})
    //for loop that iterates over all search results based on key word and gets the three elements we need to append the doc with.
	.then(function (data) {
		for (i = 0; i < data.hits.length; i++) {
		recipeLabel = data.hits[i].recipe.label;
		recipeImage = data.hits[i].recipe.image;
		recipeLocation = data.hits[i].recipe.url;
		//calling addCard function above and passing newly defined variables as the arguments before looping through again
        addCard(recipeLabel, recipeImage, recipeLocation);
		}
    //newly added save buttons to newly added elements are saved in new variable
    var saveBtn = document.querySelectorAll('.saveButton');
    //Click event for new save button using new variable
    $(saveBtn).click(function(event) {
    //adds HTML for element attached to save button to variable
    var newItem = event.target.parentElement;
    var parentItem = newItem.parentElement;
    var finalParent = parentItem.parentElement.outerHTML;
    //turns variable storing an element into an object so we can store it
    var storedItem = {
        card: finalParent
    }
    //conditional that sets savedCards to empty if there is nothing in localstorage, if not it adds localstorage items into an array
    if (JSON.parse(localStorage.getItem('cards')) == null) {
        savedCards = [];
    }
    else {
    savedCards = JSON.parse(localStorage.getItem('cards'));
    };
    //adds object to the end of an array
    savedCards.push(storedItem);
    //resets local storage saving cards to new array objects
    localStorage.setItem('cards', JSON.stringify(savedCards));
    //resets value of local variable to keep uniform with local storage
    savedCards = JSON.parse(localStorage.getItem('cards'));
        })
	})
};
//Adds event for clicking the search button
$('#submit').click(function() {
    //empty contents of last search
    $('#test').empty();
    //changes the keyphrase to value submitted by user
    keyPhrase = $('#text-input').val();
    //sets the new requestUrl with the new keyPhrase
    requestUrl = `https://api.edamam.com/search?q=${keyPhrase.trim()}&app_id=${apiId}&app_key=${apiKey}`;
    //calles getRecipe URL with new requestUrl
    getRecipe(requestUrl);
    //splites key phrase between spaces then grabs the first word and makes that the new variable
    keyPhrase = keyPhrase.split(" ");
    keyPhrase = keyPhrase[0];
    //adds that variable into Spoonacular's wine pairing API
    spoonUrl = `https://api.spoonacular.com/food/wine/pairing?food=${keyPhrase}&apiKey=${spoonKey}`;
    //Calls the function to get and set wine pairing
    getWine(spoonUrl);
});
//button to switch to page storing saved recipes
$('#switch-page').click(function() {
    window.location.href = './box.html';
});
