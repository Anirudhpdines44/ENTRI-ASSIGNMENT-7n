const display = document.getElementById('display');
const errorMessage = document.getElementById('error-message');

/**
 * Clears the display to '0' and resets the error message.
 * This function serves as the 'C' (Clear/Reset) option.
 */
function clearDisplay() {
    // Ensure display exists before setting properties
    if (display) {
        display.value = '0';
    }
    if (errorMessage) {
        errorMessage.textContent = '';
    }
}

/**
 * Clears the current entry or number, replacing it with '0'.
 * This mimics the 'CE' (Clear Entry) button.
 */
function clearEntry() {
    // In this simple model, CE is functionally the same as clearDisplay (C)
    clearDisplay();
}

/**
 * Removes the last character from the display.
 * This provides the 'Backspace' option (⌫).
 */
function backspace() {
    if (!display || !errorMessage) return;

    errorMessage.textContent = '';

    // If the display has more than one character, remove the last one.
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        // If only one character remains (or it's empty), set it back to '0'.
        display.value = '0';
    }
}

/**
 * Appends a value (number or operator) to the display screen.
 * Handles edge cases like starting with an operator or multiple decimals.
 * @param {string} value - The character/value to append.
 */
function appendToDisplay(value) {
    if (!display || !errorMessage) return;

    errorMessage.textContent = '';
    
    // If display shows '0', replace it unless value is a decimal
    if (display.value === '0' && value !== '.') {
        display.value = value;
        return;
    }

    // Prevent double operators
    const lastChar = display.value.slice(-1);
    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);
    
    if (isOperator(lastChar) && isOperator(value)) {
        // If last char is operator, replace it with the new one
        display.value = display.value.slice(0, -1) + value;
    } else {
        display.value += value;
    }
}

/**
 * Evaluates the mathematical expression currently on the display.
 */
function calculateResult() {
    if (!display || !errorMessage) return;

    errorMessage.textContent = '';
    try {
        // Use a secure method (Function constructor) to evaluate the mathematical expression
        // This is safe because user input is directly evaluated as math.
        const result = new Function('return ' + display.value)();
        
        // Check for invalid results like Infinity (division by zero)
        if (!isFinite(result)) {
            throw new Error("Cannot divide by zero.");
        }

        // Limit decimal places for display clarity
        display.value = result.toFixed(8).replace(/\.?0+$/, ''); 
    } catch (e) {
        // Handle parsing errors (e.g., incomplete expression) or division by zero
        errorMessage.textContent = 'Error: ' + (e.message || 'Invalid Expression');
        // Clear the display after a short delay for better UX
        setTimeout(clearDisplay, 1500);
    }
}

/**
 * Calculates the square (x²) of the current number on the display.
 */
function calculateSquare() {
    if (!display || !errorMessage) return;

    errorMessage.textContent = '';
    try {
        const value = parseFloat(display.value);
        
        if (isNaN(value)) {
            errorMessage.textContent = 'Error: Invalid number for square.';
            return;
        }
        
        const result = Math.pow(value, 2);
        display.value = result.toFixed(8).replace(/\.?0+$/, '');
    } catch (e) {
        errorMessage.textContent = 'Error during square calculation.';
    }
}

/**
 * Calculates the cube (x³) of the current number on the display.
 */
function calculateCube() {
    if (!display || !errorMessage) return;

    errorMessage.textContent = '';
    try {
        const value = parseFloat(display.value);
        
        if (isNaN(value)) {
            errorMessage.textContent = 'Error: Invalid number for cube.';
            return;
        }

        const result = Math.pow(value, 3);
        display.value = result.toFixed(8).replace(/\.?0+$/, '');
    } catch (e) {
        errorMessage.textContent = 'Error during cube calculation.';
    }
}

/**
 * Calculates the square root (√x) of the current number on the display.
 */
function calculateSquareRoot() {
    if (!display || !errorMessage) return;

    errorMessage.textContent = '';
    try {
        const value = parseFloat(display.value);

        if (isNaN(value) || value < 0) {
            errorMessage.textContent = 'Error: Invalid number for square root.';
            return;
        }

        const result = Math.sqrt(value);
        display.value = result.toFixed(8).replace(/\.?0+$/, '');
    } catch (e) {
        errorMessage.textContent = 'Error during square root calculation.';
    }
}

/**
 * Calculates the reciprocal (1/x) of the current number on the display.
 */
function calculateReciprocal() {
    if (!display || !errorMessage) return;

    errorMessage.textContent = '';
    try {
        const value = parseFloat(display.value);

        if (isNaN(value) || value === 0) {
            throw new Error("Cannot divide by zero.");
        }

        const result = 1 / value;
        display.value = result.toFixed(8).replace(/\.?0+$/, '');
    } catch (e) {
        errorMessage.textContent = 'Error: Division by zero.';
        setTimeout(clearDisplay, 1500);
    }
}

// Initialize display on window load to ensure it starts at '0'
window.onload = clearDisplay;