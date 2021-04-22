//required ID's to access the edamam API and Spoonacular API
let apiKey = '4cde2fcaa2d223801818ad5248f452a6';
let apiId = 'f5e5e3c6'
let spoonKey = 'a51ffaacdc13418abc909cc8018c8e4a';
//keyphrase that is called within the URL, later we can append the keyphrase and redefine the requestURL variable within a conditional inside of a click event based on what someone has searched
let keyPhrase = "";
//URL for doing a keyword search in the edamam API
let requestUrl = `https://api.edamam.com/search?q=${keyPhrase}&app_id=${apiId}&app_key=${apiKey}`;
//URL for fetch request for wine pairing function
let spoonUrl = `https://api.spoonacular.com/food/wine/pairing?food=${keyPhrase}&apiKey=${spoonKey}`;
//Sets the local saved cards in Local Storage to an array so that we can add to it
let savedCards = [];

//appends recipes to page, for scope purposes leaving arguments to pass later and once we define the variable within the getRecipe function we'll pass those variables in
const addCard = (x, y, z) => {
    //body below will have to be changed to wherever we're putting the recipe cards, also styling within the div we're adding on will need to be changed as well as possibly the element itself
    $('#search-results').append(
    `<div class='card cell large-4 small-8'>
    <div class='card-section'>
    <h2>${x}</h2><br>
    <img src="${y}" alt='A view of the cooked recipe'/><br>
    <footer>
    <a href="${z}" target='_blank'>View This Recipe</a><br>
    <button type='button' class='button saveButton'>Save Recipe</button>
    </footer>
    </div>
    </div>`
)};
//function with arguments to add in variables needed
const addWineCard = (w, x, y, z) => {
//adds card class to dive we're pushing this to
    $('#wine-card');
    //adds wine card into targeted div with open options for API objects
    $('#wine-card').append(
    `<div class='card cell large-8 small-8'>
    <div class='card-section'>
    <h2>Possible Wine Pairing's For Your Meal:</h2><br>
    <p>${w}</p><br>
    <h2>Reccomendation:</h2><br>
    <h3>${x}</h3><br>
    <p>${y} Usually priced at: ${z}</p>
    </div>
    </div>`
)};
const cardFailure = () => {
    //adds card that notify's user no search results were found
    $('#search-results').append(
        `<div class='card cell large-8 small-8'>
        <h2>No Recipes Found!</h2><br>
        <p>Broaden or refine your search and try again!</p>
        </div>`
)}
const wineCardFailure = () => {
    //adds error message telling user that no wine pairing was found
    $('#wine-card').append(
    `<div class='card' large-8 small-8>
    <div class='card-section'>
    <h2>Unfortunately No Pairing Was Found For Your Meal</h2><br>
    <p>Try a different search to get a customized reccomendation!</p>
    </div>
    </div>`
    )};
//function that fetches wine reccomendation URL
const getWine = (x) => {
    fetch(x)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //if there is not recommendation a card explaining they need to try again will appear
        if (data.status === 'failure' || data.pairedWines.length === 0) {
            wineCardFailure();
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
const getRecipe = (x) => {
    //fetching of API
	fetch(x)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
        //Adds card notifying user no results were found if nothing is
        if (data.hits.length === 0) {
            cardFailure();
        }
        else{
        //for loop that iterates over all search results based on key word and gets the three elements we need to append the doc with.
		for (i = 0; i < data.hits.length; i++) {
		recipeLabel = data.hits[i].recipe.label;
		recipeImage = data.hits[i].recipe.image;
		recipeLocation = data.hits[i].recipe.url;
		//calling addCard function above and passing newly defined variables as the arguments before looping through again
        addCard(recipeLabel, recipeImage, recipeLocation);
		}
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
        $('#Modal1').foundation('open');
        })
	})
};
//creates function to call with either clicking the submit button or pressing enter
const pageEvent = () => {
    //empty contents of last search
    $('#wine-card').empty();
    $('#search-results').empty();
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
};
//Adds event for clicking the search button
$('#submit').click(function() {
    pageEvent();
});
//button to switch to page storing saved recipes
$('#switch-page').click(function() {
    window.location.href = './box.html';
});
$(document).ready(function() {
    $('#text-input').keydown(function(event) {
        if (event.keyCode == 13) {
            pageEvent();
        }
    });
});