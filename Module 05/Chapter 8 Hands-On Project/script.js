   /*
      JavaScript 6th Edition
      Chapter 8
      Hands-on Project 8-3

      Author: Zach Stout
      Date:   3/27/2021

      Filename: script.js
   */
   
"use strict"; //Javascript strict mode

function selectCardType() {
	var cardNumValue = document.getElementById("ccNum").value;
	var visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
	var mc = /^5[1-5][0-9]{14}$/;
	var discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
	var amex = /^3[47][0-9]{13}$/;
	
	if (visa.test(cardNumValue)) {
		document.getElementById("visa").checked = "checked";
	} else if (mc.test(cardNumValue)) {
		document.getElementById("mc").checked = "checked";
	} else if (discover.test(cardNumValue)) {
		document.getElementById("discover").checked = "checked";
	} else if (amex.test(cardNumValue)) {
		document.getElementById("amex").checked = "checked";
	}
}

function createEventListeners() {
	var cardNum = document.getElementById("ccNum");
	if (cardNum.addEventListener) {
		cardNum.addEventListener("click", selectCardType, false);
	} else if (cardNum.attachEvent) {
		cardNum.attachEvent("onclick", selectCardType);
	}
}

if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", createEventListeners);
}