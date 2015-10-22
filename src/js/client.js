/**
 * @file Chrome Extension Boilerplate
 * @name Example
 *
 * Extension client script code.
 *
 * @author Alexandru Badiu <andu@ctrlz.ro>
 */

'use strict';

var candidatesArray;
var nodeList = [];
var startWalking;

function setData(){
	if( checkLocalStorage() ){
		candidatesArray = JSON.parse( localStorage['corporatize'] );
		startWalking();
	} else {
		console.log("farted");
		getCandidates();
	}
}

function getCandidates(){
	var xhr = new XMLHttpRequest();
	xhr.open( "GET", "http://apimessenger.com/candidates", true );
	xhr.onreadystatechange = function() {
	  if ( xhr.readyState == 4 && xhr.status == 200 ) {
	    localStorage['corporatize'] = xhr.responseText;
	    localStorage['corporatize_timestamp'] = new Date().getTime();
	    setData();
	  }
	}
	xhr.send();
}

function startWalking(){

	var treeWalker = document.createTreeWalker(
	  document.body,
	  NodeFilter.SHOW_TEXT,
	  { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
	  false
	);

	while(treeWalker.nextNode()){
		var morphed
		var value = treeWalker.currentNode.nodeValue;
		candidatesArray.forEach( function(candidate){
			value = morphText( value, candidate )
		});
	  
	  	treeWalker.currentNode.nodeValue = value;

	};

}

function morphText(text, candidate){
	var regex = new RegExp( candidate.first_name + "(.*)" + candidate.last_name + "|" + candidate.last_name,"g");
	var newText = text.replace(	regex, candidate.donor );
	return newText;
}

function checkLocalStorage(){
	var today = new Date().getTime();
	if( localStorage 
		&& localStorage['corporatize'] !== undefined 
		&& localStorage['corporatize'] !== ""
		&& localStorage['corporatize_timestamp'] !== undefined
		&& localStorage['corporatize_timestamp'] !== ""
		&& localStorage['corporatize_timestamp'] > today - 86400000 ){
		return true;
	}
	return false;
}
setData();