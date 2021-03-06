/*
      JavaScript 6th Edition
      Chapter 6
      Hands-on Project 6-1

      Author: Zachery Stout
      Date:   3/6/2021

      Filename: script.js
*/

"use strict";
var formValidity = true;

/* validate required fields */
function validateRequired() {
	var inputElements = document.querySelectorAll("#contactinfo input");
	var errorDiv = document.getElementById("errorText");
	var elementCount = inputElements.length;
	var requiredValidity = true;
	var currentElement;
	
	try {
		for (var i = 0; i < elementCount; i++){
			//validate all input elements in fieldset
			currentElement = inputElements[i];
			
			if (currentElement.value === "") {
				currentElement.style.background = "rgb(255,233,233)";
				requiredValidity = false;
			} else {
				currentElement.style.background = "white";
			}
		}
		if (requiredValidity === false) {
			throw "Please complete all fields.";
		}
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
	}
	catch (msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

/* Create Event Listeners */
function createEventListeners() {
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
}

/*validate form*/
function validateForm(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); //prevent form from submitting
	} else {
		evt.returnValue = false; //prevent form from submitting in IE8
	}
	formValidity = true; //reset value for revalidation
	validateRequired();
	validateNumbers();
	if(formValidity === true) {
		document.getElementsByTagName("form")[0].submit();
	}
}

/*run setup functions when page finishes loading */
if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent){
	window.attachEvent("onload", createEventListeners);
}

/*validate number fields for older browsers*/
function validateNumbers() {
	var numberInputs = document.querySelectorAll("#contactinfo input[type=number]");
	var elementCount = numberInputs.length;
	var numErrorDiv = document.getElementById("numErrorText");
	var numberValidity = true;
	var currentElement;
	
	try {
		for (var i = 0; i < elementCount; i++) {
			//validate all input elements of type "number" in fieldset
			if(isNaN(currentElement.value) || (currentElement.value === "")) {
				currentElement.style.background = "rgb(255,233,233)";
				numberValidity = false;
			} else {
				currentElement.style.background = "white";
			}
		}
		
		if (numberValidity === false) {
			throw "zip and Social Security values must be numbers.";
		}
		numErrorDiv.style.display = "none";
		numErrorDiv.innerHTML = "";
	}
	catch(msg) {
		numErrorDiv.style.display = "block";
		numErrorDiv.innerHTML = msg;
		formValidity = false;
	}
}


