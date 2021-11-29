chrome.commands.onCommand.addListener(function(command) {
  if (command == "toggle_pin") {
    // Get the currently selected tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Toggle the pinned status
      var current = tabs[0]
      chrome.tabs.update(current.id, {'pinned': !current.pinned});
    });
  }
  if(command == "close_unpinned"){
  	//Get all tabs that are unpinned
  	var allTabs = [];

  	 allTabs = chrome.tabs.query({currentWindow: true, pinned: false}, function(tabs){
      for(var i =0 ; i < tabs.length; i++){
        chrome.tabs.remove(tabs[i].id);
      } 

  	});
  }
});