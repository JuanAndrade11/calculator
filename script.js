let numA = 0, numB = null, operator = null, lastKey = null, enteringNumA = true, hasEnteredB = false, result = 0;
let numbers = '0123456789';
let operators = '+-*/=';

const display = document.querySelector('.display');
const container = document.querySelector('.container');

function add(a, b) {
    b = isNaN(b) ? 0 : b;
    return a + b;
}

function subtract(a, b) {
    b = isNaN(b) ? 0 : b;
    return a - b;
}

function multiply(a, b) {
    b = isNaN(b) ? 1 : b;
    return a * b;
}

function divide(a, b) {
    b = isNaN(b) ? 1 : b;
    console.log(a);
    if (b === 0) {
        return 'Are you Dumb?'
    }
    return a / b;
}

function operate() {
    let a = parseFloat(numA);
    let b = parseFloat(numB);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: throw new Error('Unsupported operator');
    }
}

function updateDisplay() {
    display.textContent = result;
    numA = result;
}

function triggerTextBlinkEffect() {
    const originalColor = display.style.color;
    const backgroundColor = 'white'
    display.style.color = backgroundColor;

    setTimeout(() => {
        display.style.color = originalColor;
    }, 100);
}

function addKey(key) {
    display.textContent += key;
}

function toggleNegative() {
    display.textContent = display.textContent.charAt(0) === '-' ?
        display.textContent.slice(1) :
        '-' + display.textContent;
    triggerTextBlinkEffect();
}

function percentage(){
    result = divide(display.textContent, 100);
    console.log(result);
    updateDisplay();
}

function clearDisplay() {
    display.textContent = '0';
    numA = 0;
    numB = null;
    operator = null;
    enteringNumA = true;
    hasEnteredB = false;
    result = 0;
}

function addDecimal(key) {
    if (!display.textContent.includes(key)) {
        addKey(key);
    }
}

function displayText(key) {
    if (result === 'Are you Dumb?'){
        clearDisplay();
    }
    if (numbers.includes(key)) {
        if (!enteringNumA && !hasEnteredB) {
            hasEnteredB = true;
            display.textContent = key;
        } else {
            display.textContent === '0' ? display.textContent = key : addKey(key);
        };
    } else if (key === '.') {
        addDecimal(key);
    } else if (key === '+/-') {
        if (display.textContent !== '0') {
            toggleNegative();
        }
    } else if (key === '%'){
        percentage();
    } else if (key === 'C') {
        clearDisplay();
    } else {
        triggerTextBlinkEffect();
    }
}

function fill(key) {
    enteringNumA = false;
    hasEnteredB ? numB = display.textContent : numA = display.textContent;
    hasEnteredB = false;
    result = operator !== null ? operate() : numA;
    operator = key !== '=' ? key : operator;
    updateDisplay();
}

container.addEventListener('click', function (event) {
    if (event.target.classList.contains('button')) {
        const buttonText = event.target.textContent;
        displayText(buttonText);
        if (operators.includes(buttonText)) {
            fill(buttonText);
        };
        lastKey = buttonText;
        console.log(`numA: ${numA}, numB: ${numB}, operator: '${operator}', lastKey: '${lastKey}', enteringNumA: ${enteringNumA}, hasEnteredB: ${hasEnteredB}, result: ${result}`);
    };
});
