/**
 * @file Chrome Extension Boilerplate
 * @name Example
 *
 * Extension client script code.
 *
 * @author Alexandru Badiu <andu@ctrlz.ro>
 */

'use strict';


new (function(){
	this.candidatesArray;
	this.nodeList = [];
	this.startWalking;


	this.initialize = function(){

		//does local storage exist for us
		if( checkLocalStorage() ){

			//true, load data & walk DOM
			this.candidatesArray = JSON.parse( localStorage['corporatize'] );
			this.startWalking();
		} else {
			//false go fetch data
			this.getCandidates();
		}
	}

	this.getCandidates = function(){
		var self = this;
		//fetch data & set as local storage string
		var xhr = new XMLHttpRequest();
		xhr.open( "GET", "//apimessenger.com/candidates", true );
		xhr.onreadystatechange = function() {
		  if ( xhr.readyState == 4 && xhr.status == 200 ) {
		    localStorage['corporatize'] = xhr.responseText;
		    localStorage['corporatize_timestamp'] = new Date().getTime();
		    this.initialize();	
		  }
		}
		xhr.send();
		return this;
	}

	this.startWalking = function(){
		//create a dom walker and return only text nodes
		var treeWalker = document.createTreeWalker( document, NodeFilter.SHOW_TEXT,
		  { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
		  false
		);

		while(treeWalker.nextNode()){
			var morphed
			var self = this
			var value = treeWalker.currentNode.nodeValue;
			this.candidatesArray.forEach( function(candidate){
				value = morphText( value, candidate );
			});
		  	treeWalker.currentNode.nodeValue = value;
		}

		return this;
	}

	//kick it all off
	this.initialize();

	//utility functions
	function morphText(text, candidate){
		var regex = new RegExp( candidate.first_name + candidate.last_name + "|" + //FirstLast 
								candidate.first_name + "\\s" + candidate.last_name + "|" + //First Last 
								candidate.first_name + "[\\s]\\b[a-zA-ZÀ-ÿ\.\-]{1,}[\\s]" + candidate.last_name + "|" + //First Middle||M. Last 
								candidate.first_name + "[\\s]\\b[a-zA-ZÀ-ÿ\.\-]{1,}[\\s]" + "\\b[a-zA-ZÀ-ÿ\.\-]{1,}[\\s]" + candidate.last_name + "|" + //First Middle|M. Middle||M. Last 
								candidate.last_name + "|" + //Last
								candidate.first_name,"g"); //First
		var newText = text.replace(	regex, candidate.donor );
		return newText;
	}

	function checkLocalStorage(){
		//checks if local storage is set &
		// isn't stale
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

})();