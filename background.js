<<<<<<< HEAD
/**
 * Handles keyboard commands for tab management
 */
chrome.commands.onCommand.addListener(async (command) => {
  try {
    switch (command) {
      case "toggle_pin":
        await toggleCurrentTabPin();
        break;
      case "close_unpinned":
        await closeUnpinnedTabs();
        break;
      default:
        console.warn(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error("Error handling command:", error);
  }
});

/**
 * Toggles the pin status of the currently active tab
 */
async function toggleCurrentTabPin() {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab) {
    throw new Error("No active tab found");
  }

  await chrome.tabs.update(activeTab.id, {
    pinned: !activeTab.pinned,
  });
}

/**
 * Closes all unpinned tabs in the current window
 */
async function closeUnpinnedTabs() {
  const unpinnedTabs = await chrome.tabs.query({
    currentWindow: true,
    pinned: false,
  });

  if (unpinnedTabs.length === 0) {
    return;
  }

  const tabIds = unpinnedTabs.map((tab) => tab.id);
  await chrome.tabs.remove(tabIds);
}
=======
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
>>>>>>> 2ab508c2deb9bc5dae042dcc7feddd26bff6ed5c
