/**
 * Populate the popup with current keyboard shortcuts
 */
document.addEventListener("DOMContentLoaded", async () => {
  const shortcutContainer = document.getElementById("shortcut-container");

  // Clear loading placeholder
  shortcutContainer.innerHTML = "";

  try {
    // Get all commands and their shortcuts
    const commands = await chrome.commands.getAll();

    // Define shortcut info with descriptions and icons
    const shortcutInfo = {
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

    // Create elements for each command
    commands.forEach((command) => {
      // Skip the default "_execute_action" command
      if (command.name === "_execute_action") return;

      const info = shortcutInfo[command.name] || {
        description: command.description || "No description",
        icon: "broom.png",
      };

      const shortcutDiv = document.createElement("div");
      shortcutDiv.className = "shortcut";

      // Icon
      const icon = document.createElement("img");
      icon.src = info.icon;
      icon.className = "icon";
      icon.alt = command.name;

      // Shortcut key combo
      const keyCombo = document.createElement("span");
      keyCombo.className = "key-combo";
      if (command.shortcut) {
        keyCombo.textContent = command.shortcut;
      } else {
        keyCombo.textContent = "Not set";
        keyCombo.classList.add("not-set");
      }

      // Description
      const description = document.createElement("span");
      description.className = "description";
      description.textContent = info.description;

      // Assemble and add to container
      shortcutDiv.appendChild(icon);
      shortcutDiv.appendChild(keyCombo);
      shortcutDiv.appendChild(description);
      shortcutContainer.appendChild(shortcutDiv);
    });

    // Add a note about customizing shortcuts
    const noteDiv = document.createElement("div");
    noteDiv.style.fontSize = "11px";
    noteDiv.style.marginTop = "10px";
    noteDiv.innerHTML =
      "Customize shortcuts at: <b>chrome://extensions/shortcuts</b>";
    shortcutContainer.appendChild(noteDiv);
  } catch (error) {
    shortcutContainer.innerHTML = `<div>Error loading shortcuts: ${error.message}</div>`;
    console.error("Error loading shortcuts:", error);
  }
});
