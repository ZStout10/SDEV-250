/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: Zachery Stout
    Date:   4/04/2021

    Filename: script.js
*/

"use strict";
var zIndexCounter;
var pos = [];
var origin;
var waitForUser;

// perform setup tasks when page first loads
function setUpPage() {
   document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
   document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);
   
   var movableItems = document.querySelectorAll("room div");
   zIndexCounter = movableItems.length + 1;
   
   for (var i = 0; i < movableItems.length; i++) {
	   if (movableItems[i].addEventListener) {
		   movableItems[i].addEventListener("mousedown", startDrag, false);
		   moveableItem[i].addEventListener("touchstart", startDrag, false);
		   movableItems[i].addEventListener("mspointerdown", startDrag, false);
		   movableItems[i].addEventListener("pointerdown", startDrag, false);
	   } else if (moveableItems[i].attachEvent) {
		   movableItems[i].attachEvent("onmousedown", startDrag);
	   }
   }
   
   // disable IE10+ interface gestures
   movableItems[i].style.msTouchAction = "none";
   movableItems[i].style.touchAction = "none";
}

// add event listeners and move object when user starts dragging
function startDrag(evt) {
	// set z-index counter so ext selected element is on top of others
	this.style.zIndex = zIndexCounter;
	
	//increment z-index counter so next selected element is on top of the others
	zIndexCounter++;
	
	if (evt.type !== "mousedown") {
		evt.preventDefault();
		this.addEventListener("touchmove", moveDrag, false);
		this.addEventListener("mspointermove", moveDrag, false);
		this.addEventListener("pointermove", moveDrag, false);
		this.addEventListener("touchend", removeTouchListener, false);
		this.addEventListener("mspointerup", removeTouchListener, false);
		this.addEventListener("pointerup", removeTouchListener, false);
	} else {
		this.addEventListener("mousemove", moveDrag, false);
		this.addEventListener("mouseup", removeDragListener, false);
	}
	pos = [this.offsetLeft,this.offsetTop];
	origin = getCoords(evt);
}

// calculate new location of dragged object
function moveDrag(evt) {
	var currentPos = getCoords(evt);
	var deltaX = currentPos[0] - origin[0];
	var deltaY = currentPos[1] - origin[1];
	this.style.left = (pos[0] + deltaX) + "px";
	this.style.top = (pos[1] + deltaY) + "px";
}

// identify location of object
function getCoords(evt) {
	var coords = [];
	
	if (evt.targetTouches && evt.targetTouches.length) {
		var thisTouch = evt.targetTouches[0];
		coords[0] = thisTouch.clientX;
		coords[1] = thisTouch.clientY;
	} else {
		coords[0] = evt.clientX;
		coords[1] = evt.clientY;
	}
	
	return coords;
}

// remove mouse event listeners when dragging eneds
function removeDragListener() {
	this.removeEventListener("mousemove", moveDrag, false);
	this.removeEventListener("mouseup", removeDragListener, false);
}

//remove touch event listeners when dragging ends
function removeTouchListener() {
	this.removeEventListener("touchmove", moveDrag, false);
	this.removeEventListener("mspointermove", moveDrag, false);
	this.removeEventListener("pointermove", moveDrag, false);
	this.removeEventListener("touchend", removeTouchListener, false);
	this.removeEventListener("mspointerup", removeTouchListener, false);
	this.removeEventListener("pointerup", removeTouchListener, false);
}

// configure page to display Setup content
function loadSetup() {
   document.querySelector("nav ul li:first-of-type").className = "current";
   document.querySelector("nav ul li:last-of-type").className = "";
   document.getElementById("setup").style.display = "block";
   document.getElementById("location").style.display = "none";
   location.search = "";
}

// configure page to display Directions content
function loadDirections(string) {
   document.querySelector("nav ul li:first-of-type").className = "";
   document.querySelector("nav ul li:last-of-type").className = "current";
   document.getElementById("setup").style.display = "none";
   document.getElementById("location").style.display = "block";
   
   //geoTest();
   
   // to minimize data use, download map only if needed and not already downloaded
   if (typeof google !== 'object') {
	   var script = document.createElement("script");
	   script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=geoTest";
	   document.body.appendChild(script);
   }
}

function geoTest() {
	waitForUser = setTimeout(fail, 10000);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createDirections, fail, {timeout: 10000});
	} else {
		fail();
	}
}

function createDirections(position) {
	clearTimeout(waitForUser);
	//console.log("Longitude: " + position.coords.longitude);
	//console.log("Latitude: " + position.coords.latitude);
	
	var currPosLat = position.coords.latitude;
	var currPosLng = position.coords.longitude;
	var mapOptions = {
		//center: new google.maps.LatLng(currPosLat, currPosLng),
		center: new google.maps.LatLng(39.96118, -82.99879),
		zoom: 12
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function fail() {
	//console.log("Geolocation information not available or not authorized.");
	
	document.getElementById("map").innerHTML = "Unable to access your current location.";
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);