const display = document.getElementById("display");
const buttons = document.getElementById("buttons");

let current = "";
let first = null;
let op = null;

function updateDisplay(value) {
  display.textContent = value || "0";
}

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  if (operator === "/") return b === 0 ? "Error" : a / b;
}

buttons.addEventListener("click", (e) => {
  const btn = e.target;
  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (!value && !action) return;

  if (value && !action) {
    current += value;
    updateDisplay(current);
  }

  if (action === "operator") {
    if (!current) return;
    first = current;
    op = value;
    current = "";
  }

  if (action === "equals") {
    if (first !== null && current !== "" && op) {
      const result = calculate(first, current, op);
      updateDisplay(result);
      current = result.toString();
      first = null;
      op = null;
    }
  }

  if (action === "clear") {
    current = "";
    first = null;
    op = null;
    updateDisplay("0");
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    current += key;
    updateDisplay(current);
  }

  if (["+", "-", "*", "/"].includes(key)) {
    if (!current) return;
    first = current;
    op = key;
    current = "";
  }

  if (key === "Enter") {
    if (first !== null && current !== "" && op) {
      const result = calculate(first, current, op);
      updateDisplay(result);
      current = result.toString();
      first = null;
      op = null;
    }
  }

  if (key === "Escape") {
    current = "";
    first = null;
    op = null;
    updateDisplay("0");
  }
});
