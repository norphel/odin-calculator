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
        return n1 / n2
    }
}
function roundUpToFourDecimals(n) {
    return n.toFixed(4);
}
function operate(operator, operand1, operand2) {
    let result = null;
    switch(operator) {
        case '+':
            result = add(operand1, operand2);
            break;
        case '-':
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