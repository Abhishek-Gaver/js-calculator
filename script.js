console.log("Bankai")

const display = document.querySelector(".type")

const numbers = document.querySelectorAll(".numbers")

const operators = document.querySelectorAll(".operators:not(.equal):not(.backspace)");

let resultShown = false;


numbers.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.querySelector("h2").textContent;

        if (resultShown) {
            display.value = "";
            resultShown = false;
        }

        display.value += value;
    });
});


operators.forEach(function (button) {
    button.addEventListener("click", function () {
        const operator = button.querySelector("h2").textContent;

        if (display.value === "") {
            return;
        }

        display.value += ` ${operator} `;
    });
});


const equal = document.querySelector(".equal");


equal.addEventListener("click", function () {
    const expression = display.value.trim();

    if (expression === "") {
        display.value = "";
        return;
    }

    const parts = expression
        .trim()
        .split(/\s+/);

    const numbers = [];
    const ops = [];

    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            numbers.push(Number(parts[i]));
        } else {
            ops.push(parts[i]);
        }
    }

    if (ops.includes("÷")) {
        for (let i = 0; i < ops.length; i++) {
            if (ops[i] === "÷" && numbers[i + 1] === 0) {
                display.value = "Not Defined";
                resultShown = true;
                return;
            }
        }
    }

    // First: multiplication and division
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "×" || ops[i] === "÷") {
            let result;

            if (ops[i] === "×") {
                result = numbers[i] * numbers[i + 1];
            } else {
                result = numbers[i] / numbers[i + 1];
            }

            numbers.splice(i, 2, result);
            ops.splice(i, 1);
            i--;
        }
    }

    // Second: addition and subtraction
    let result = numbers[0];

    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "+") {
            result += numbers[i + 1];
        } else if (ops[i] === "-") {
            result -= numbers[i + 1];
        }
    }

    display.value = result;
    resultShown = true;
});




const backspace = document.querySelector(".backspace");

function deleteLastInput() {
    display.value = display.value.trimEnd();

    if (
        display.value.endsWith("+") ||
        display.value.endsWith("-") ||
        display.value.endsWith("×") ||
        display.value.endsWith("÷")
    ) {
        display.value = display.value.slice(0, -1).trimEnd();
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// On-screen backspace button
backspace.addEventListener("click", deleteLastInput);

// Physical keyboard Backspace key
document.addEventListener("keydown", function (event) {
    if (event.key === "Backspace") {
        event.preventDefault();
        deleteLastInput();
    }
});

