/*
Christopher Carter
VFW Project week 2
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
			}
		}
	
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