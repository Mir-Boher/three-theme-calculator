const btns = document.querySelectorAll("button");
const displayScreen = document.querySelector(".screen");
const toggleSwitch = document.querySelector(".toggle-switch");
const switchHandle = document.querySelector(".switch-handle");

let currentState = "left"; // Initial state

toggleSwitch.addEventListener("click", (e) => {
  if (e.target === toggleSwitch) {
    // Check if the clicked element is toggleSwitch
    const switchRect = toggleSwitch.getBoundingClientRect();
    const switchCenter = switchRect.left + switchRect.width / 2;
    const root = document.documentElement;

    if (e.clientX < switchCenter && currentState !== "left") {
      switchHandle.style.left = "2px";
      currentState = "left";
      root.style.setProperty("--theme-1-main-bg", "hsl(222, 26%, 31%)");
      root.style.setProperty("--theme-1-screen", "hsl(224, 36%, 15%)");
      root.style.setProperty("--theme-1-tb-kpbg", "hsl(223,31%,20%)");
      root.style.setProperty("--theme-1-kbg-reset", "hsl(225, 21%, 49%)");
      root.style.setProperty("--theme-1-ksh-reset", "hsl(224, 28%, 35%)");
      root.style.setProperty("--theme-1-kbg-tb-equals", "hsl(6, 63%, 50%)");
      root.style.setProperty("--theme-1-ksh-equals", "hsl(6, 70%, 34%)");
      root.style.setProperty("--theme-1-kbg-main", "hsl(30, 25%, 89%)");
      root.style.setProperty("--theme-1-ksh-main", "hsl(28, 16%, 65%)");
      root.style.setProperty("--theme-1-text", "hsl(221, 14%, 31%)");
      root.style.setProperty("--theme-1-equals-text", "hsl(0, 0%, 100%)");
      root.style.setProperty("--theme-1-text-main", "hsl(0, 0%, 100%)");
    } else if (e.clientX > switchCenter && currentState !== "right") {
      switchHandle.style.left = "27px";
      currentState = "right";
      root.style.setProperty("--theme-1-main-bg", "var(--theme-3-main-bg)");
      root.style.setProperty("--theme-1-screen", "var(--theme-3-screen)");
      root.style.setProperty("--theme-1-tb-kpbg", "var(--theme-3-tb-kpbg)");
      root.style.setProperty("--theme-1-kbg-reset", "var(--theme-3-kbg-reset)");
      root.style.setProperty("--theme-1-ksh-reset", "var(--theme-3-ksh-reset)");
      root.style.setProperty(
        "--theme-1-kbg-tb-equals",
        "var(--theme-3-kbg-tb-equals)"
      );
      root.style.setProperty(
        "--theme-1-ksh-equals",
        "var(--theme-3-ksh-equals)"
      );
      root.style.setProperty("--theme-1-kbg-main", "var(--theme-3-kbg-main)");
      root.style.setProperty("--theme-1-ksh-main", "var(--theme-3-ksh-main)");
      root.style.setProperty("--theme-1-text", "var(--theme-3-text)");
      root.style.setProperty(
        "--theme-1-equals-text",
        "var(--theme-3-equals-text)"
      );
      root.style.setProperty("--theme-1-text-main", "var(--theme-3-text-main)");
    } else if (currentState !== "middle") {
      root.style.setProperty("--theme-1-main-bg", "var(--theme-2-main-bg)");
      root.style.setProperty("--theme-1-screen", "var(--theme-2-screen)");
      root.style.setProperty("--theme-1-tb-kpbg", "var(--theme-2-tb-kpbg)");
      root.style.setProperty("--theme-1-kbg-reset", "var(--theme-2-kbg-reset)");
      root.style.setProperty("--theme-1-ksh-reset", "var(--theme-2-ksh-reset)");
      root.style.setProperty(
        "--theme-1-kbg-tb-equals",
        "var(--theme-2-kbg-tb-equals)"
      );
      root.style.setProperty(
        "--theme-1-ksh-equals",
        "var(--theme-2-ksh-equals)"
      );
      root.style.setProperty("--theme-1-kbg-main", "var(--theme-2-kbg-main)");
      root.style.setProperty("--theme-1-ksh-main", "var(--theme-2-ksh-main)");
      root.style.setProperty("--theme-1-text", "var(--theme-2-text)");
      root.style.setProperty("--theme-1-equals-text", "hsl(0, 0%, 100%)");
      root.style.setProperty("--theme-1-text-main", "var(--theme-2-text-main)");

      switchHandle.style.left = "13px";
      currentState = "middle";
    }
  }
});

let output;
let calculations = [];
let isFirstChar = true; // to check if the first character is '+,*,/'

// Function to update the screen
function updateScreen(input) {
  displayScreen.textContent = input;
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (isFirstChar && (value === "x" || value === "+" || value === "/")) {
      return;
    } else {
      isFirstChar = false;
    }
    if (value === "DEL") {
      output = output.toString();
      output = output.slice(0, -1);
      calculations = [output];
      if (output == "") {
        console.log("the output is empty");
        isFirstChar = true;
        displayScreen.textContent = "0.";
      } else {
        updateScreen(output.replace(/\*/g, "x"));
      }
    } else if (value === "RESET") {
      console.log("reset the screen please");
      calculations = [];
      output = "";
      displayScreen.textContent = "0.";
      isFirstChar = true;
    } else if (value === "x") {
      calculations.push("*");
      output = calculations.join("");
      updateScreen(output.replace(/\*/g, "x"));
    } else if (value === "=") {
      output = eval(output);
      calculations = [output];
      updateScreen(output.toString());
    } else {
      calculations.push(value);
      output = calculations.join("");
      updateScreen(output.replace(/\*/g, "x"));
    }
  });
});
