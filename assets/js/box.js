fetch("https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=1%20large%20apple", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "717d918a52msh8b9e2dec05bd4f7p13657ejsn9f3cab4a73b0",
		"x-rapidapi-host": "edamam-edamam-nutrition-analysis.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});


