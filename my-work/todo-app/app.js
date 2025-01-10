"use strict";
document.addEventListener("DOMContentLoaded", ()=>{
	//utilities
	const select = (item)=> document.querySelector(item);
	const selectAll = (item)=> document.querySelectorAll(item);
	const newEl = (tag)=> document.createElement(tag);

	//Page Tags
	const page = {
		form: select("form"),
		input: select("input"),
		formButton: select("button.form-button"),
		list: select("ul"),
		deleter: select("button.delete-all"),
	}

	//Objects/arrays
	let itemEvents = 0;
	let storage = {}

	//if localStorage contains itemNumber set the variable to that.
	if (localStorage.getItem("itemEvents")){
		itemEvents = localStorage.getItem("itemEvents")
	}

	//creates elements and adds to the dom
	let createTodoItem = (item, {index=++itemEvents}={})=>{

		let li = newEl("li");
		let p = newEl("p");
		let deleteBtn = newEl("button");
		let completeBtn = newEl("button");

		li.dataset.itemNo = index;
		p.innerText = item;

		//storage[index-1].complete ? li.style.textDecoration = "line-through": undefined;

		li.append(p);
		deleteBtn.innerText = "Delete";
		completeBtn.innerText = "Complete";

		page.list.append(li);
		li.append(completeBtn);
		li.append(deleteBtn);

		return li;
	}

	let saveItems = ()=>{

		//Saves the item in memory
		localStorage.setItem("items", JSON.stringify(storage));
		localStorage.setItem("itemEvents", itemEvents);
	}

	let deleteItems = ()=>{
		localStorage.clear();
	}

	page.deleter.addEventListener("click", deleteItems)

	// checks localstorage
	if (localStorage.getItem("items")){
		storage = JSON.parse(localStorage.getItem("items"));

		for(let i in storage){
			let li = createTodoItem(storage[i].value, {index:i})
			storage[i].complete && (()=> li.style.textDecoration = "line-through")();
		}

	}

	page.formButton.addEventListener("click", (e)=>{

		e.preventDefault(); // prevents page from refreshing.

		createTodoItem(page.input.value)

		for (let i of selectAll("p")){
			storage[i.parentElement.dataset.itemNo] = {
				value: i.innerText,
				complete: false,
			}
		}

		saveItems();

		//resets the form
		page.input.value = ""
		page.input.focus();
	})


	page.list.addEventListener("click", (e)=>{
		let num = e.target.parentElement.dataset.itemNo;
		switch(e.target.innerText){
			case("Delete"):{
				e.target.parentElement.remove()
				delete storage[num]
				localStorage.setItem("items", JSON.stringify(storage));
				break;
			}
			case("Complete"):{
				e.target.parentElement.style.textDecoration === "line-through" ? e.target.parentElement.style.textDecoration = "none": e.target.parentElement.style.textDecoration = "line-through";
				storage[num].complete = !storage[num].complete
				localStorage.setItem("items", JSON.stringify(storage));
				break;
			}
		}
	})

})
