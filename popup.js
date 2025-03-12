// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const shortcutsContainer = document.getElementById("shortcuts-container");
  const footer = document.getElementById("footer");

  // Clear loading state
  shortcutsContainer.innerHTML = "";

  // Get extension info
  try {
    const manifest = chrome.runtime.getManifest();
    if (footer && manifest.version) {
      footer.textContent = `${manifest.name} v${manifest.version}`;
    }
  } catch (err) {
    console.error("Error getting manifest:", err);
  }

  // Shortcut definitions
  const shortcuts = {
    toggle_pin: {
      description: "Toggle pin status of current tab",
      icon: "broom.png",
    },
    close_unpinned: {
      description: "Close all unpinned tabs in current window",
      icon: "broom.png",
    },
    close_all_unpinned: {
      description: "Close all unpinned tabs across all windows",
      icon: "broom.png",
    },
  };

  // Get and display commands
  chrome.commands.getAll(function (commands) {
    commands.forEach(function (command) {
      // Skip _execute_action command
      if (command.name === "_execute_action") return;

      const shortcutInfo = shortcuts[command.name] || {
        description: command.description || "Unknown command",
        icon: "broom.png",
      };

      // Create shortcut element
      const shortcutDiv = document.createElement("div");
      shortcutDiv.className = "shortcut";

      // Add icon
      const icon = document.createElement("img");
      icon.src = shortcutInfo.icon;
      icon.className = "icon";
      icon.alt = command.name;

      // Add key combo
      const keyCombo = document.createElement("span");
      keyCombo.className = "key-combo";
      keyCombo.textContent = command.shortcut || "Not set";
      if (!command.shortcut) {
        keyCombo.classList.add("not-set");
      }

      // Add description
      const description = document.createElement("span");
      description.className = "description";
      description.textContent = shortcutInfo.description;

      // Assemble and add to container
      shortcutDiv.appendChild(icon);
      shortcutDiv.appendChild(keyCombo);
      shortcutDiv.appendChild(description);
      shortcutsContainer.appendChild(shortcutDiv);
    });
  });
});
