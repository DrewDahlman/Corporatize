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
	if(localStorage 
		&& localStorage['corporatize'] !== undefined 
		&& localStorage['corporatize'] !== ""){

		candidatesArray = JSON.parse( localStorage['corporatize'] );
		startWalking()
	} else {
		getCandidates()
	}
}

function getCandidates(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://apimessenger.com/candidates", true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState==4 && xhr.status==200) {
	    localStorage['corporatize']= xhr.responseText;
	    setData()
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
		var v = treeWalker.currentNode.nodeValue;
		candidatesArray.forEach(function(candidate){
			v = morphText( v, candidate)
		});
	  
	  	treeWalker.currentNode.nodeValue = v;

	};

}

function morphText(text, candidate){
	var regex = new RegExp(candidate.first_name + "|" + candidate.last_name,"g");
	var regex1 = new RegExp(candidate.donor + " " + candidate.donor,"g");
	var newText = text.replace(	regex, candidate.donor).replace(regex1, candidate.donor); 
	return newText;
}
setData();