var apiKey = '4cde2fcaa2d223801818ad5248f452a6';
var apiId = 'f5e5e3c6'
var keyPhrase = "duck";
var requestUrl = `https://api.edamam.com/search?q=${keyPhrase}&app_id=${apiId}&app_key=${apiKey}`;


function getRecipe(x) {
	fetch(x)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		for (i = 0; i < data.hits.length; i++)
		console.log(data.hits[i].recipe.label, data.hits[i].recipe.image, data.hits[i].recipe.url)
	})
};

getRecipe(requestUrl);