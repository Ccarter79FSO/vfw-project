 /*
Christopher Carter
VFW Project week 3
Term 0112
*/


//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
                                      
	
	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//create select field element and populate with options
	function makeCats(){
		var formTag = document.getElementsByTagName("form"); //formTag is an array of all the form tags
			selectLi = $('select');
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "players");
		for (var i=0; i<numPlayers.length; i++) {
			var makeOption = document.createElement('option');
			var optText = numPlayers[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//find value of selected radio button
	function getSelectedRadio(){
		var radios = document.forms[0].platform;
		for (i=0; i<radios.length; i++) {
			if (radios[i].checked) {
				platformValue = radios[i].value;
			}
		}
	}
	
	function getCheckBoxValue1(){
		var checkbox = document.forms[0].genre;
		for (i=0; i<checkbox.length; i++) {
			if (checkbox[i].checked) {
				genreValue = checkbox[i].value;
				genreArray.push(genreValue);
			}
		}
	}
	
	function getCheckBoxValue2(){
		if($('fav').checked) {
			favoriteValue = $('fav').value;
		} else {
			favoriteValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('gameForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				$('addGameFieldset').style.display = "block";
				break;
			case "off":
				$('gameForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData () {
		var id 			  	= Math.floor(Math.random()*100000001);
		//gather up all our form field values aand store in an object
		//object properties are going to contain and array with the form label and input value
		getSelectedRadio();
		getCheckBoxValue1();
		getCheckBoxValue2();
		var item		  	= {};
			item.gname		= ["Game Name:", $('gname').value];
			item.platform	= ["Platform:", platformValue];
			item.genre		= ["Genre:", genreArray];
			item.fav		= ["Favorite:", favoriteValue];
			item.rating		= ["Rating:", $('rating').value];
			item.pdate		= ["Purchase Date:", $('pdate').value];
			item.players	= ["Number of Players:", $('players').value];
			item.notes		= ["Notes:", $('notes').value];
		//save data to local storage: use stringify to convert our object to a string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Saved!");
			
	}
	
	function getData(){
		toggleControls("on"); 
		if (localStorage.length===0){
			alert("There is no data in storage!");
		}
		//write data from local storage to the browswer
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for (var i=0, j=localStorage.length; i<j; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert string from local storage value back to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i),linksLi); //create edit and delete links for each item in local storage
		}
	
	}
	
	//function to create edit and delete links for each stored item when displayed
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = '#';
		editLink.key = key;	
		var editText = "Edit Game";
		editLink.addEventListener('click', editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//create space between links
		var makeSpace = document.createTextNode('\u00A0');
		linksLi.appendChild(makeSpace);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = '#';
		deleteLink.key = key;
		var deleteText = "Delete Game";
		//deleteLink.addEventListener('click', deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//function to edit single item from local storage
	function editItem(){
		//grab data from item in localStorage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show the form
		toggleControls("off");
		
		//populate the form fields with the current local storage values
		$('gname').value = item.gname[1];
		var radios = document.forms[0].platform;
		for(var i=0;i<radios.length;i++){
			if(radios[i].value == "Xbox 360" && item.platform[1] == "Xbox 360"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Playstation 3" && item.platform[1] == "Playstation 3"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Nintendo Wii" && item.platform[1] == "Nintendo Wii"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Nintendo DS/DSi/3DS" && item.platform[1] == "Nintendo DS/DSi/3DS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Other Handheld" && item.platform[1] == "Other Handheld"){
				radios[i].setAttribute("checked", "checked");
			}
		}
/*
		var checkbox = document.forms[0].genre;
		for (i=0; i<checkbox.length; i++) {
			var checkBoxIndex = checkbox[i];
			if (checkBoxIndex.value == "RPG" && item.genre[1] == "RPG") {
				checkBoxIndex.setAttribute("checked", "checked");
			}else if(checkBoxIndex == "FPS" && item.genre[1] == "FPS"){
				checkBoxIndex.setAttribute("checked", "checked");
			}else if(checkBoxIndex == "Action/Adventure" && item.genre[1] == "Action/Adventure"){
				checkBoxIndex.setAttribute("checked", "checked");
			}else if(checkBoxIndex == "RTS" && item.genre[1] == "RTS"){
				checkBoxIndex.setAttribute("checked", "checked");
			}else if(checkBoxIndex == "Simulation" && item.genre[1] == "Simulation"){
				checkBoxIndex.setAttribute("checked", "checked");
			}else if(checkBoxIndex == "Sports" && item.genre[1] == "Sports"){
				checkBoxIndex.setAttribute("checked", "checked");
			}else if(checkBoxIndex == "Casual" && item.genre[1] == "Casual"){
				checkBoxIndex.setAttribute("checked", "checked");
			}
		}
*/
/*
		if(item.genre[1] == "RPG" || "FPS" || "Action/Adventure" || "RTS" || "Simulation" || "Sports" || "Casual"){
			$('genre').setAttribute('checked','checked');
		}
*/
		var checkbox = document.forms[0].genre;
		for (var i=0; i<checkbox.length; i++){
			if (checkbox[i] == "RPG" && item.genre[1] == "RPG") {
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i] == "FPS" && item.genre[1] == "FPS"){
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i] == "Action/Adventure" && item.genre[1] == "Action/Adventure"){
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i] == "RTS" && item.genre[1] == "RTS"){
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i] == "Simulation" && item.genre[1] == "Simulation"){
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i] == "Sports" && item.genre[1] == "Sports"){
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i] == "Casual" && item.genre[1] == "Casual"){
				checkbox[i].setAttribute("checked", "checked");
			}
		}									
		if(item.fav[1] == "Fav"){
			$('fav').setAttribute('checked','checked');
		}
		$('rating').value = item.rating[1];
		$('pdate').value = item.pdate[1];
		$('players').value = item.players[1];
		$('notes').value = item.notes[1];	
	}
	
	function clearLocal(){
		if (localStorage.lenth===0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All data have been deleted.");
			window.location.reload();
			return false;
		}
	}
	
	//variable defaults
	var numPlayers = ["--Number of Players--", "1, or Single Player only", "2 Players", "3 Players", "4 or more Players"],
		platformValue,
		genreValue,
		genreArray = [],
		favoriteValue = "No"
	;
	makeCats();
	
	//set link & submit click events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click",getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);


});