const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const fruitContainer = Array.from(document.querySelectorAll(".fruit-sub-container"));
const watermelon = document.querySelector(".watermelon-sub-container");
const orange = document.querySelector(".orange-sub-container");
const dontUnclick = ["fruit-search flex-items", "orange-img flex-items", "watermelon-img flex-items", "suggestion", "watermelon-link-text flex-items", "orange-link-text flex-items"];


//STYLING CLICKS
const clickInput = ()=>{
	fruitContainer.map(e=> e.style.opacity = 1);
	input.focus();

	//If window is less than 600 do nothing. Otherwise move the input up.
	(window.visualViewport.width < 600)||(()=>input.style.top = "-360px")();

	input.style.minWidth = "200px";
	document.addEventListener("click", unclickAnywhere, {once:true});
}

const unclickAnywhere = event =>{
	if(dontUnclick.every(elem=> event.target.className !== elem)){
		fruitContainer.map(e=>e.style.opacity = 0);
		input.blur();
		input.style.minWidth = "0";
		input.style.top = "40px";
		input.addEventListener("click", clickInput, {once:true});
		Array.from(suggestions.children).map(e=>e.remove()); //remove all previous suggestions.
	}
	else {
		document.addEventListener("click", unclickAnywhere, {once:true});
	}
}


//AUTOCOMPLETE FUNCTIONALITY
const search = str => fruit.filter(elem => elem.toLowerCase().includes(str.toLowerCase()));
const autoCompleteHandler = (event) => {
	//STYLING
	input.removeEventListener("click", clickInput);
	clickInput();

	Array.from(suggestions.children).map(e=>e.remove()); //remove all previous suggestions.
	const str = event.target.value;
	let autoCompleted = search(str);

	autoCompleted = autoCompleted.filter(elem=> (elem.toLowerCase() !== str.toLowerCase())); // remove exact matches
	str||(autoCompleted = []); //clear the list if input is empty.

	//CREATE SUGGESTIONS
	autoCompleted.map(elem=>{
		const li = document.createElement("li");
		li.innerText = elem;
		li.classList.add("suggestion");
		suggestions.append(li);
	})
}


//FILL INPUT WITH SELECTED SUGGESTION
const useSuggestion = event=> {
	input.value = event.target.innerText;
	input.focus();
}


//DIRECT TO WIKIPEDIA OR OPEN FOOD FACTS
const querySearch = event=> {
	event.target.className.match("watermelon")? window.open(`https://en.wikipedia.org/w/index.php?search=${input.value}`, "_blank"):window.open(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${input.value}`, "_blank");
}


input.addEventListener("click", clickInput, {once:true});
input.addEventListener('keyup', autoCompleteHandler);
suggestions.addEventListener('click', useSuggestion);
watermelon.addEventListener("click", querySearch);
orange.addEventListener("click", querySearch);
