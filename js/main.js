const input = document.querySelector(".expression-input");
const calc = document.querySelector(".calc");
const result = document.querySelector(".result");

calc.addEventListener("click", (event) => {
  reversePolish(input.value).then((res) => (result.innerHTML = res));
});

async function reversePolish(expr) {
  const oper = expr.split(" ");
  const stack = [];

  if (oper.length === 0) {
    throw new Error("Invalid input");
  }

  for (let i = 0; i < oper.length; i++) {
    if (!isNaN(oper[i]) && isFinite(oper[i])) {
      stack.push(parseInt(oper[i]));
    } else {
      let a = stack.pop();
      let b = stack.pop();
      switch (oper[i]) {
        case "+":
          stack.push(await add(a, b));
          break;
        case "-":
          stack.push(await subtract(a, b));
          break;
        case "*":
          stack.push(await multiply(a, b));
          break;
        case "×":
          stack.push(await multiply(a, b));
          break;
        case "/":
          stack.push(await divide(a, b));
          break;
      }
    }
  }
  if (stack.length > 1) {
    throw new Error("Invalid input");
  }
  return stack[0];
}

function add(a, b) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(a + b), getRandomInt(1000, 10000))
  );
}

function subtract(a, b) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(a - b), getRandomInt(1000, 10000))
  );
}

function multiply(a, b) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(a * b), getRandomInt(1000, 10000))
  );
}

function divide(a, b) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(a / b), getRandomInt(1000, 10000))
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
