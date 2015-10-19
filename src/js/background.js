/**
 * @file Chrome Extension Boilerplate
 * @name Example
 *
 * Extension background code.
 *
 * @author Alexandru Badiu <andu@ctrlz.ro>
 */

'use strict';

class ExtensionBackground {

  constructor() {
  	chrome.tabs.executeScript(null, {file: "common.js"});
    this.events();
  }

  events() {
    /** Icon click handler */
    chrome.browserAction.onClicked.addListener((activeTab) => {
      chrome.tabs.executeScript(null, {file: "client.js"});
    });
  }
}

new ExtensionBackground();

