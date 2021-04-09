//Takes saved card objects from local storage and stores them in a variable
var savedCards = [JSON.parse(localStorage.getItem('cards'))];
//stores div element to place cards into in a variable
var cardContainer = document.getElementById('change-this');
//blank variable to later fill to set to local storage
var savedObject = [];
//function that sets all stored cards on the page
function setCards() {
	//iterates over items in local storage that we moved to an array and adds it into the HTML of the container
	for (i = 0; i < savedCards[0].length; i++) {
		cardContainer.innerHTML += savedCards[0][i].card;
	}
	//Captures all save buttons from the newly added HTML and puts them in this variable
	var newBtn = document.querySelectorAll('.saveButton');
	//Changes all save buttons to now say "Remove Recipe"
	for (i = 0; i < newBtn.length; i++) {
	newBtn[i].innerText = "Remove Recipe";
	}
	//Creates a click function for those buttons
	$(newBtn).click(function (event) {
		//places the parent element (the card) of the clicked remove button in a variable and removes that element on line 23
		var removeCard = event.target.parentElement;
		var parentRemove = removeCard.parentElement;
		var actualRemove = parentRemove.parentElement;
		actualRemove.remove();
		//places all remaining cards in a variable
		var remainingCards = document.querySelectorAll('.card');
		//resets savedObject variable to empty (for when button is pressed multiple times in one page view)
		savedObject = [];
		//Takes HTML of elements in remainingCards variable, turns them into objects, and then places that object into a new array at savedCards variable
		for (i = 0; i < remainingCards.length; i++) {
			var newItem = remainingCards[i].outerHTML;
			var newObject = {
				card: newItem
			}
			savedObject.push(newObject);
		}
		//sets new savedObject variable to local storage so only remaining HTML is stored
		localStorage.setItem('cards', JSON.stringify(savedObject));
	})
};
//changes page back to search page
$('#switch-page').click(function() {
    window.location.href = './homepage.html';
});
//Starts page off by setting the saved cards
setCards();