/*	JavaScript 6th Edition
*	Chapter 9
*	Chapter Case
*	Eating Well in Season
*	Author: Zachery Stout
*	Date: 3/31/2021
*	Filename: script3.js
*/

"use strict";

/*function parseData(){
  var formData = decodeURIComponent(location.search);
  var formArray = [];
  var list = document.querySelector("div.results ul");
  formData = formData.substring(1, formData.length);
  while(formData.indexOf("+") !== -1){
    formData = formData.replace("+", " ");
  }
  formData = decodeURIComponent(formData);
  formArray = formData.split("&");
  for(var i = 0; i<formArray.length; i++){
    var newItem = document.createElement("li");
    newItem.innerHTML = formArray[i];
    list.appendChild(newItem);
  }
}*/

function parseData(){
  var formData = document.cookie;
  var formArray = [];
  var list = document.querySelector("div.results ul");
  formArray = formData.split("; ");
  for(var i = 0; i < formArray.length; i++){
    var newItem = document.createElement("li");
    newItem.innerHTML = formArray[i];
    list.appendChild(newItem);
  }
}

if(window.addEventListener){
  window.addEventListener("load", parseData, false);
}else if(window.attachEvent){
  window.attachEvent("onload", parseData);
}