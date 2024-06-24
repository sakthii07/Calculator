document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('display');
    let displayValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            if (value) {
                if (displayValue === '0') {
                    displayValue = value;
                } else {
                    displayValue += value;
                }
                display.innerText = displayValue;
            } else {
                switch (this.id) {
                    case 'clear':
                        displayValue = '0';
                        display.innerText = '0';
                        break;
                    case 'equals':
                        try {
                            displayValue = evaluateExpression(displayValue);
                            display.innerText = displayValue;
                        } catch (e) {
                            display.innerText = 'Error';
                        }
                        break;
                }
            }
        });
    });

    function evaluateExpression(expression) {
        // Replace symbols with JS-friendly counterparts
        expression = expression.replace('^', '**').replace('√', 'Math.sqrt');
        
        // Evaluate trigonometric and logarithmic functions
        expression = expression.replace(/sin/g, 'Math.sin')
                               .replace(/cos/g, 'Math.cos')
                               .replace(/tan/g, 'Math.tan')
                               .replace(/log/g, 'Math.log10');
        
        // Handle any other mathematical functions
        return Function('"use strict";return (' + expression + ')')();
    }
});
