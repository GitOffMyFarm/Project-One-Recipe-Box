//required ID's to access the edamam API
var apiKey = '4cde2fcaa2d223801818ad5248f452a6';
var apiId = 'f5e5e3c6'
//keyphrase that is called within the URL, later we can append the keyphrase and redefine the requestURL variable within a conditional inside of a click event based on what someone has searched
var keyPhrase = "";
//URL for doing a keyword search in the edamam API
var requestUrl = `https://api.edamam.com/search?q=${keyPhrase}&app_id=${apiId}&app_key=${apiKey}`;

//appends recipes to page, for scope purposes leaving arguments to pass later and once we define the variable within the getRecipe function we'll pass those variables in
function addCard(x, y, z) {
//body below will have to be changed to wherever we're putting the recipe cards, also styling within the div we're adding on will need to be changed as well as possibly the element itself
$('#test').append(
`<h2>${x}</h2><br>
<img src="${y}"/><br>
<a href="${z}">View This Recipe</a>`
)};


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
	})
};
//Adds event for clicking the search button
$('#submit').click(function() {
    //changes the keyphrase to value submitted by user
    keyPhrase = $('#text-input').val();
    //sets the new requestUrl with the new keyPhrase
    requestUrl = `https://api.edamam.com/search?q=${keyPhrase}&app_id=${apiId}&app_key=${apiKey}`;
    //calles getRecipe URL with new requestUrl
    getRecipe(requestUrl);
});