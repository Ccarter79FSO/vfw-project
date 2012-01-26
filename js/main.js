/*
Christopher Carter
VFW Project week 4
Term 0112
*/


//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
                                      
	
	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function showValue(newValue){
		var range = $('range');
		range.innerHTML=newvalue;
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
			favoriteValue = "No";
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
	
	function storeData (key) {
		//if there is no key, then this is a brand new item and needs a new key
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		//set the id to the existing key we're editing so that it will save over the data
		//the key is the same key that's been passed along from the editSubmit event handler
		//to the validate function, and then passed here in the storeData function
		}else {
			var id = key;
		}
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
		alert("Game has been added to your inventory!!");			
	}
	
	function getData(){
		toggleControls("on"); 
		if (localStorage.length===0){
			alert("There is no data in storage, so default data has been added.");
			autoFillData();
		}
		//write data from local storage to the browswer
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		var setUl = makeList.setAttribute("id", "items");
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
			getImage(obj.platform[1], makeSubList);
			var breakTag = document.createElement('br');
			makeLi.appendChild(breakTag);
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
	
	//get the image for the correct platform being displayed
	function getImage(platName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSrc = newImage.setAttribute("src", "images/" + platName + ".png");
		var setID = newImage.setAttribute("id", platName);
		imageLi.appendChild(newImage);
		
	}
	
	//auto populate local storage
	function autoFillData(){
		//the actual JSON object date required for this to work is coming from json.js, which is loaded from the additem.html page
		//store the JSON object into local storage
		for (var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
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
		deleteLink.addEventListener('click', deleteItem);
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
			if(radios[i].value == "PC" && item.platform[1] == "PC"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Xbox 360" && item.platform[1] == "Xbox 360"){
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
		var checkbox = document.forms[0].genre;
		for (i=0; i<checkbox.length; i++) {
			var checkBoxIndex = checkbox[i];
			for (ii=0;ii<item.genre[1].length;ii++){
				var genreAryIndex = item.genre[1][ii];
				if (checkBoxIndex.value == "RPG" && genreAryIndex == "RPG") {
					checkBoxIndex.setAttribute("checked", "checked");
				}else if(checkBoxIndex.value == "FPS" && genreAryIndex == "FPS"){
					checkBoxIndex.setAttribute("checked", "checked");
				}else if(checkBoxIndex.value == "Action/Adventure" && genreAryIndex == "Action/Adventure"){
					checkBoxIndex.setAttribute("checked", "checked");
				}else if(checkBoxIndex.value == "RTS" && genreAryIndex == "RTS"){
					checkBoxIndex.setAttribute("checked", "checked");
				}else if(checkBoxIndex.value == "Simulation" && genreAryIndex == "Simulation"){
					checkBoxIndex.setAttribute("checked", "checked");
				}else if(checkBoxIndex.value == "Sports" && genreAryIndex == "Sports"){
					checkBoxIndex.setAttribute("checked", "checked");
				}else if(checkBoxIndex.value == "Casual" && genreAryIndex == "Casual"){
					checkBoxIndex.setAttribute("checked", "checked");
				}
			}
		}
		if(item.fav[1] == "Fav"){
			$('fav').setAttribute('checked','checked');
		}
		$('rating').value = item.rating[1];
		$('pdate').value = item.pdate[1];
		$('players').value = item.players[1];
		$('notes').value = item.notes[1];
		
		//remove initial listener from the input 'submit game' button
		save.removeEventListener('click', storeData);
		//change submit button value to edit button
		$('submit').value = "Edit Game";
		var editSubmit = $('submit');
		//save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited
		editSubmit.addEventListener('click', validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this game from your inventory?");
		if (ask){
			localStorage.removeItem(this.key);
			alert("Game has been deleted!");
			window.location.reload();	
		}else{
			alert("Game has not been deleted.");
		}
	}
	
	function clearLocal(){
		if (localStorage.lenth===0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All data have been deleted.");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//define the elements we want to check
		var getGname = $('gname');
		
		//reset error messages
		errMsg.innerHTML = "";
		getGname.style.border = "1px solid black";		
		//get error messages
		var messageAry = [];
		
		//Game name validation
		if(getGname.value === ""){
			var gnameError = "Please enter a Game name.";
			getGname.style.border = "1px solid red";
			messageAry.push(gnameError);
			alert("You must enter a game name to proceed.");
		}
		//If there were any errors, display them on the screen
		if(messageAry.length >= 1){
			for(var i=0,j=messageAry.length;i<j;i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
				errMsg.style.color = "red";
			}
			e.preventDefault();
			return false;
		}else {
			//if all is ok, save data. send the key value (which came from the editData function)
			//remember this key value passed through the editSubmit event listener as a property
			storeData(this.key);
		}
		
	}
	
	//variable defaults
	var	numPlayers = ["--Number of Players--", "1, or Single Player only", "2 Players", "3 Players", "4 or more Players"],
		platformValue,
		genreValue,
		genreArray = [],
		favoriteValue = "No",
		errMsg = $('errors')
	;
	makeCats();

	
	//set link & submit click events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click",getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);

});