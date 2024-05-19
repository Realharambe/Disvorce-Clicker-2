// Define variables
let numPapers = 0;
let numLawyers = 0;
let numLawyersTier2 = 0;
let lawyerCost = 10;
let baseLawyerTier2Cost = 750;
let lawyerCostMultiplier = 1.5;
let papersPerSecond = 0;

// Define functions
function updatePapers(num) {
  numPapers += num;
  document.getElementById("numb-papers").innerHTML = numPapers.toFixed(2);
}

function updateLawyers(num, tier) {
  if (tier === 1) {
    numLawyers += num;
    document.getElementById("numb-lawyers-1").innerHTML = numLawyers;
  } else if (tier === 2) {
    numLawyersTier2 += num;
    document.getElementById("numb-lawyers-2").innerHTML = numLawyersTier2;
  }
}

function updatePPS() {
  papersPerSecond = numLawyers * 0.25 + numLawyersTier2 * 2;
  document.getElementById("papers-per-second-1").innerHTML = formatDecimals(numLawyers * 0.25);
  document.getElementById("papers-per-second-2").innerHTML = formatDecimals(numLawyersTier2 * 2);
}

function formatDecimals(value) {
  return (Math.round(value * 4) / 4).toFixed(2); // ensures increments of 0.25
}

function buyLawyer(tier) {
  let cost;
  if (tier === 1) {
    cost = Math.ceil(lawyerCost / 0.25) * 0.25;
    if (numPapers >= cost) {
      updatePapers(-cost);
      updateLawyers(1, 1);
      lawyerCost += 0.25;
      document.getElementById("lawyer-1-button").innerHTML = `Buy Lawyer Tier 1 - ${lawyerCost.toFixed(2)} Papers`;
      updatePPS();
    }
  } else if (tier === 2) {
    cost = Math.ceil(baseLawyerTier2Cost / 0.25) * 0.25;
    if (numPapers >= cost) {
      updatePapers(-cost);
      updateLawyers(1, 2);
      setInterval(function () {
        updatePapers(0.5); 
      }, 4000); 
      baseLawyerTier2Cost += 0.25;
      document.getElementById("lawyer-2-button").innerHTML = `Buy Lawyer Tier 2 - ${baseLawyerTier2Cost.toFixed(2)} Papers`;
      updatePPS();
    }
  }
}

function generatePapersPerSecond() {
  setInterval(function () {
    updatePapers(numLawyers * 0.25 + numLawyersTier2 * 2); // add the paper generation per tick
  }, 1000); // updated interval to 250 milliseconds
}

// Listener events
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("paper-button").addEventListener("click", function () {
    updatePapers(1);
  });

  document.getElementById("lawyer-1-button").addEventListener("click", function () {
    buyLawyer(1);
  });

  document.getElementById("lawyer-2-button").addEventListener("click", function () {
    buyLawyer(2);
  });

  // Generate papers per second
  generatePapersPerSecond();
});

