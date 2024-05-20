// Admin credentials
const ADMIN_USERNAME = "Admin1";
const ADMIN_PASSWORD = "Admin1";

// Flag to track admin login state
let isAdminLoggedIn = false;

// Function to validate admin credentials
function validateAdminCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Function to toggle admin login status
function toggleAdminLogin() {
  isAdminLoggedIn = !isAdminLoggedIn;
}

// Update executeCommand function to include authentication check
function executeCommand(command) {
  const parts = command.split(" ");
  const action = parts[0];
  const target = parts[1];
  const amount = parseFloat(parts[2]);

  if (!isAdminLoggedIn && action !== "Login") {
    console.log("Admin login required to execute commands.");
    return;
  }

  switch (action) {
    case "Add":
      if (target === "Papers" && !isNaN(amount)) {
        updatePapers(amount);
      } else if (target === "Pres" && !isNaN(amount)) {
        addPrestigePoints(amount);
      }
      break;
    case "Multiply":
      if (target === "Papers" && !isNaN(amount)) {
        multiplyPapers(amount);
      }
      break;
    case "ClearPapers":
      clearPapers();
      break;
    case "ResetProgress":
      resetProgress();
      break;
    case "Export":
      exportSave();
      break;
    case "Import":
      importSave(target);
      break;
    case "Login":
      promptAdminLogin();
      break;
    default:
      console.log("Unknown command");
  }
}

// Event listener for the command execution button
document.getElementById("execute-command").addEventListener("click", function() {
  const commandInput = document.getElementById("command-input").value;
  executeCommand(commandInput);
  document.getElementById("command-input").value = "";
});

// Event listener for toggling the command console
document.addEventListener("keydown", function(event) {
  if (event.key === "`") {
    toggleCommandConsole();
  }
});

// Function to toggle the command console visibility
function toggleCommandConsole() {
  const consoleElement = document.getElementById("command-console");
  if (consoleElement.style.display === "none" || consoleElement.style.display === "") {
    consoleElement.style.display = "block";
  } else {
    consoleElement.style.display = "none";
  }
}

// Function to prompt for admin login
function promptAdminLogin() {
  const username = prompt("Enter admin username:");
  const password = prompt("Enter admin password:");

  if (validateAdminCredentials(username, password)) {
    toggleAdminLogin();
    console.log("Admin login successful.");
  } else {
    console.log("Invalid admin credentials.");
  }
}
