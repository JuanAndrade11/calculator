let numA = '', numB = '', operator = ''
let numbers = '0123456789';

const display = document.querySelector('.display');
const container = document.querySelector('.container');

container.addEventListener('click', function (event) {
    if (event.target.classList.contains('button')) {
        const buttonText = event.target.textContent;
        displayText(buttonText);
    }
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: throw new Error('Unsupported operator');
    }
}

function triggerTextBlinkEffect() {
    const originalColor = display.style.color;
    const backgroundColor = 'aquamarine'
    display.style.color = backgroundColor;

    setTimeout(() => {
        display.style.color = originalColor;
    }, 100);
}

function addText(text) {
    display.textContent += text;
}

function toggleNegative() {
    display.textContent = display.textContent.charAt(0) === '-' ?
        display.textContent.slice(1) :
        '-' + display.textContent;
    triggerTextBlinkEffect();
}

function clearDisplay() {
    display.textContent = '0';
}

function addDecimal(text) {
    if (!display.textContent.includes(text)) {
        addText(text);
    }
}

function displayText(text) {
    if (numbers.includes(text)) {
        display.textContent === '0' ? display.textContent = text : addText(text);
    } else if (text === '.') {
        addDecimal(text);
    } else if (text === '+/-') {
        if (display.textContent !== '0') {
            toggleNegative();
        }
    } else if (text === 'C') {
        clearDisplay();
    } else {
        triggerTextBlinkEffect();
    }
}
