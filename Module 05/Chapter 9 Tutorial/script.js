/*	JavaScript 6th Edition
*	Chapter 9
*	Chapter Case
*	Eating Well in Season
*	Author: Zachery Stout
*	Date: 4/01/2021
*	Filename: script.js
*/

"use strict";

function clearCookies() {
	var cookieString = document.cookie;
	var cookieArray = cookieString.split("; ");
	var expiresDate = new Date();
	expiresDate.setDate(expiresDate.getDate() - 7);
	
	for (var i = 0; i < cookieArray.length; i++) {
		document.cookie = cookieArray[i] + "; expires=" + expiresDate.toUTCString();
	}
}

if (window.addEventListener) {
	window.addEventListener("load",  clearCookies, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", clearCookies);
}