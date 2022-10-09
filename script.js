function add(n1, n2) {
    return n1 + n2;
}
function subtract(n1, n2) {
    return n1 - n2;
}
function multiply(n1, n2) {
    return n1 * n2;
}
function divide(n1, n2) {
    if (n2 === 0) {
        return "ERROR! Division by 0!"
    } else {
        return n1 / n2;
    }
}
function roundUpToFourDecimals(n) {
    let strNum = String(n);
    if (strNum.includes('e') || (!strNum.includes('.') && strNum.length > 10)) {
        return n.toExponential(4);
    } else if (strNum.includes('.')) {
        let i = strNum.indexOf('.');
        return strNum.slice(0, i) + strNum[i] + strNum.slice(i+1, i+5);
    } else {
        return n;
    }
}
function operate(operator, operand1, operand2) {
    let result = null;
    switch(operator) {
        case '+':
            result = add(operand1, operand2);
            break;
        case '−':
            result = subtract(operand1, operand2);
            break;
        case '×':
            result = multiply(operand1, operand2);
            break;
        case '÷':
            result= divide(operand1, operand2);
            break;
    }
    return result;
}

const previousDisplay = document.querySelector('.previous');
const currentDisplay = document.querySelector('.current');

const digits = document.querySelectorAll('.digit');
digits.forEach((digit) => {
    digit.addEventListener('click', appendDigits);
});
function appendDigits(event) {
    if (currentDisplay.textContent === '0') {
        currentDisplay.textContent = '';
    }
    currentDisplay.textContent += event.target.id;
}

const dot = document.getElementById('decimal');
dot.addEventListener('click', appendDecimal);
function appendDecimal() {
    if (currentDisplay.textContent.includes('.')) {
        return;
    } else {
        currentDisplay.textContent += '.';
    }
}

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', appendOperatorOrOperate);
});
function appendOperatorOrOperate(event) {
    let currentExpression  = previousDisplay.textContent + currentDisplay.textContent;
    let operator = '';
    let operand1 = null;
    let operand2 = null;
    let result = null;

    //if the expression already contains an operator do nothing
    if (currentExpression.slice(-1) === '+' || currentExpression.slice(-1) === '−' || currentExpression.slice(-1) === '×' || currentExpression.slice(-1) === '÷') {
        return;
    }

    //parse the expression so far entered to get the operator and the operands
    if (currentExpression.includes('+') || currentExpression.includes('−') || currentExpression.includes('×') || currentExpression.includes('÷')) {
        let i = 0;
        while(i < currentExpression.length) {
            if (currentExpression[i] === 'e') {
                i += 2;
            } else if (currentExpression[i] == '+' || currentExpression[i] == '−' || currentExpression[i] == '×' || currentExpression[i] == '÷') {
                operand1 = Number.parseFloat(currentExpression.slice(0, i));
                operator = currentExpression[i];
                operand2 = Number.parseFloat(currentExpression.slice(i + 1));
                break;
            }
            i++;
        }
        result = operate(operator, operand1, operand2);
        result = roundUpToFourDecimals(result);
        previousDisplay.textContent = String(result) + event.target.textContent;
        currentDisplay.textContent = '';
    } else {
        previousDisplay.textContent += currentDisplay.textContent + event.target.textContent;
        currentDisplay.textContent = '';
    }
}

const equal = document.getElementById('equals');
equal.addEventListener('click', evaluate);

function evaluate() {
    // if second operand has been not been entered entered so far, do nothing
    let currentExpression = previousDisplay.textContent + currentDisplay.textContent;
    let operator = '';
    let operand1 = null;
    let operand2 = null;
    let result = null;

    if (currentExpression.slice(-1) === '+' || currentExpression.slice(-1) === '−' || currentExpression.slice(-1) === '×' || currentExpression.slice(-1) === '÷') {
        return;
    } else {
        let i = 0;
        while(i < currentExpression.length) {
            if (currentExpression[i] === 'e') {
                i += 2;
            } else if (currentExpression[i] == '+' || currentExpression[i] == '−' || currentExpression[i] == '×' || currentExpression[i] == '÷') {
                operand1 = Number.parseFloat(currentExpression.slice(0, i));
                operator = currentExpression[i];
                operand2 = Number.parseFloat(currentExpression.slice(i + 1));
                break;
            }
            i++;
        }
        result = operate(operator, operand1, operand2);
        result = roundUpToFourDecimals(result);
        previousDisplay.textContent = '';
        currentDisplay.textContent = result;
    }
}

const clearAll = document.getElementById('clear');
clearAll.addEventListener('click', clearEverything);

function clearEverything() {
    previousDisplay.textContent = '';
    currentDisplay.textContent = '0';
}

const backspace = document.getElementById('backspace');
backspace.addEventListener('click', deleteLastEntry);

function deleteLastEntry() {
    if (currentDisplay.textContent === '') {
        currentDisplay.textContent = '0';
    } else {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    }
}