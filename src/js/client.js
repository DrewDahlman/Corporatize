/**
 * @file Chrome Extension Boilerplate
 * @name Example
 *
 * Extension client script code.
 *
 * @author Alexandru Badiu <andu@ctrlz.ro>
 */

 'use strict';

let treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  { acceptNode: function(node) { console.log(node.nodeType); return NodeFilter.FILTER_ACCEPT; } },
  false
);

let nodeList = [];

while(treeWalker.nextNode()){
	
	let v = treeWalker.currentNode.nodeValue;

  	//v = v.split("").reverse().join("").split(" ").reverse().join(" ");
  
  	treeWalker.currentNode.nodeValue = v;

};