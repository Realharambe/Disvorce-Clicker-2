document.addEventListener("keydown", function(event) {
    if (event.key === "`") {
      toggleCommandConsole();
    }
  });
  
  function toggleCommandConsole() {
    const consoleElement = document.getElementById("command-console");
    if (consoleElement.style.display === "none" || consoleElement.style.display === "") {
      consoleElement.style.display = "block";
    } else {
      consoleElement.style.display = "none";
    }
  }
  
  document.getElementById("execute-command").addEventListener("click", function() {
    const commandInput = document.getElementById("command-input").value;
    executeCommand(commandInput);
    document.getElementById("command-input").value = "";
  });
  
  function executeCommand(command) {
    const parts = command.split(" ");
    const action = parts[0];
    const target = parts[1];
    const amount = parseFloat(parts[2]);
  
    switch (action) {
      case "Add":
        if (target === "Papers" && !isNaN(amount)) {
          updatePapers(amount);
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
      default:
        console.log("Unknown command");
    }
  }
  
  function multiplyPapers(factor) {
    numPapers *= factor;
    document.getElementById("numb-papers").innerHTML = numPapers.toFixed(2);
  }
  
  function clearPapers() {
    numPapers = 0;
    document.getElementById("numb-papers").innerHTML = numPapers.toFixed(2);
  }
  
  function resetProgress() {
    numPapers = 0;
    numLawyers = 0;
    numLawyersTier2 = 0;
    lawyerCost = 10;
    baseLawyerTier2Cost = 750;
    updatePapers(0);
    document.getElementById("numb-lawyers-1").innerHTML = numLawyers;
    document.getElementById("numb-lawyers-2").innerHTML = numLawyersTier2;
    document.getElementById("lawyer-1-button").innerHTML = `Buy Lawyer Tier 1 - ${lawyerCost.toFixed(2)} Papers`;
    document.getElementById("lawyer-2-button").innerHTML = `Buy Lawyer Tier 2 - ${baseLawyerTier2Cost.toFixed(2)} Papers`;
    updatePPS();
  }
  