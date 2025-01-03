let display = document.getElementById('display');
let mainDisplay = document.getElementById('main-display');
let displayExceed = document.getElementById('display-exceed');
let currentInput = '0';  // Initialisation avec "0"
let operator = '';
let firstOperand = '';
let shouldCalculate = false;
let openParenthesesCount = 0;
let lastOperator = '';
let lastOperand = '';

function appendNumber(number) {
    if (shouldCalculate) {
        currentInput = '';
        shouldCalculate = false;
    }
    if (currentInput === '0') {  // Remplacer le "0" initial
        currentInput = '';
    }
    currentInput += number;
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function appendTrigFunction(func) {
    if (shouldCalculate) {
        currentInput = '';
        shouldCalculate = false;
    }
    if (currentInput === '0') {  // Remplacer le "0" initial
        currentInput = '';
    }
    currentInput += func + '(';
    openParenthesesCount++;  // Assurez-vous de gérer l'ouverture des parenthèses
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function appendOperator(op) {
    if (currentInput !== '') {
        if (currentInput === '0') { 
            currentInput = '';
        }
        // Gestion correcte des opérateurs multiples
        if (isNaN(currentInput.slice(-1)) && currentInput.slice(-1) !== '%' && currentInput.slice(-1) !== ')' && currentInput.slice(-1) !== '(' && currentInput.slice(-1) !== '^' && currentInput.slice(-1) !== '√' && currentInput.slice(-1) !== 'π') {
            if (op === '-' && (currentInput.slice(-1) === '+' || currentInput.slice(-1) === '−')) {
                currentInput += op;
            } else {
                currentInput = currentInput.slice(0, -1) + op;
            }
        } else {
            currentInput += op;
        }
        updateDisplay(currentInput);  // Met à jour avec la valeur courante
        lastOperator = op;
        lastOperand = '';
    }
}

function appendDot() {
    if (currentInput === '0') {  // Remplacer le "0" initial par "0,"
        currentInput = '0';
    }
    const lastNumber = currentInput.split(/[\+\-\÷\×]/).pop();
    if (!lastNumber.includes(',')) {
        currentInput += ',';
        updateDisplay(currentInput);  // Met à jour avec la valeur courante
    }
}

function clearDisplay() {
    currentInput = '0';  // Réinitialisation avec "0"
    firstOperand = '';
    operator = '';
    shouldCalculate = false;
    openParenthesesCount = 0;
    lastOperator = '';
    lastOperand = '';
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function deleteLastCharacter() {
    if (currentInput.slice(-1) === '(') {
        openParenthesesCount--;
    } else if (currentInput.slice(-1) === ')') {
        openParenthesesCount++;
    }
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function updateDisplay(displayExpression) {
    if (typeof displayExpression === " op indéfinie" || displayExpression === null || displayExpression === "") {
        console.error("Aucune expression à afficher");
        mainDisplay.innerHTML = "<span style='color: #FF6347;'>op indéfinie</span>";
        return;
    }
    // Utiliser innerHTML pour inclure la balise <sup> autour des exposants
    let formattedExpression = displayExpression.replace(/\^(-?\d+)/g, '^<sup>$1</sup>');
    let formattedExceed = '';

    if (formattedExpression.length > 20) { // Ajustez la limite selon vos besoins
        formattedExceed = formattedExpression.slice(0, formattedExpression.length - 20);
        formattedExpression = formattedExpression.slice(-20);
    } else {
        formattedExceed = '';
    }

    // Mettre à jour les éléments d'affichage
    displayExceed.innerHTML = formattedExceed;
    mainDisplay.innerHTML = formattedExpression;
    display.scrollLeft = display.scrollWidth; // Faire défiler vers la droite
}

function appendPi() {
    if (shouldCalculate) {
        currentInput = '';
        shouldCalculate = false;
    }
    if (currentInput === '0') {
        currentInput = '';
    }
    currentInput += 'π';
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function calculateResult() {
    try {
        let expression = shouldCalculate && lastOperator && lastOperand !== '' 
            ? currentInput + lastOperator + lastOperand 
            : currentInput;

        // Remplacer les symboles et fonctions mathématiques
        expression = expression.replace(/,/g, '.').replace(/[÷]/g, '/').replace(/[×]/g, '*')
            .replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan')
            .replace(/π/g, 'Math.PI') // Remplacer π par Math.PI
            .replace(/√\(([^)]+)\)/g, (match, p1) => {
                try {
                    let value = eval(p1);
                    return value < 0 
                        ? `${Math.sqrt(Math.abs(value))}i` 
                        : `Math.sqrt(${value})`;
                } catch (e) {
                    throw new Error(`Invalid expression inside square root: ${p1}`);
                }
            })
            .replace(/--/g, '+').replace(/\+\+/g, '+')
            .replace(/-\+/g, '-').replace(/\+-/g, '-')
            .replace(/\^/g, '**');  // Remplacer le symbole ^ par ** pour l'évaluation

        // Conserver les symboles % dans l'affichage
        let displayExpression = expression.replace(/(\d+(\.\d+)?)%/g, '$1%');

        while (openParenthesesCount > 0) {
            displayExpression += ')';
            expression += ')';
            openParenthesesCount--;
        }

        // Évaluer l'expression en remplaçant les pourcentages uniquement lors de l'évaluation
        let result = eval(expression.replace(/(\d+(\.\d+)?)%/g, (match, p1) => parseFloat(p1) / 100));
        currentInput = result.toString().replace('.', ',');
        shouldCalculate = true;

        const operatorMatch = expression.match(/[\+\-\*\/]/);
        const operandMatch = expression.match(/-?\d+(\.\d+)?$/);

        if (operatorMatch && operandMatch) {
            lastOperator = operatorMatch[0];
            lastOperand = operandMatch[0];
        }

        // Mettre à jour l'affichage avec l'expression contenant les %
        updateDisplay(currentInput);
    } catch (e) {
        console.error('Erreur de calcul:', e);
        currentInput = "non existant";
        mainDisplay.innerHTML = `<span style='color: #FF6347;'>${currentInput}</span>`;
    }
}

function appendSquareRoot() {
    if (shouldCalculate) {
        currentInput = '';
        shouldCalculate = false;
    }
    if (currentInput === '0') {
        currentInput = '';
    }
    currentInput += '√(';
    openParenthesesCount++;  // Gérer l'ouverture des parenthèses
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function appendParenthesis() {
    if (shouldCalculate) {
        currentInput = '';
        shouldCalculate = false;
    }
    const openParentheses = (currentInput.match(/\(/g) || []).length;
    const closeParentheses = (currentInput.match(/\)/g) || []).length;

    if (currentInput === '0') {
        currentInput = '';
    }

    if (openParentheses <= closeParentheses || /[\+\-\×\÷\(]$/.test(currentInput)) {
        currentInput += '(';
        openParenthesesCount++;
    } else {
        currentInput += ')';
        openParenthesesCount--;
    }
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function appendPercentage() {
    if (shouldCalculate) {
        currentInput = '';
        shouldCalculate = false;
    }
    if (currentInput === '0') {
        currentInput = '';
    }
    currentInput += '%';
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}

function appendExponent() {
    if (shouldCalculate) {
        currentInput = '';
        shouldCalculate = false;
    }
    if (currentInput === '0') {
        currentInput = '';
    }
    currentInput += '^';
    updateDisplay(currentInput);  // Met à jour avec la valeur courante
}
window.onload = function() {
            const calculatorContainer = document.getElementById('calculator-container');
            calculatorContainer.style.transform = 'translateZ(0)';
        };

        let lastTiltX = 0;
        let lastTiltY = 0;
        const sensitivity = 0.1; // Seuillage pour réduire les mises à jour trop fréquentes
        let debounceTimeout; // Débounce

        function handleOrientation(event) {
            const x = event.beta;  // Inclinaison avant-arrière
            const y = event.gamma; // Inclinaison gauche-droite
            
            const maxTilt = 15;
            const tiltX = (x / maxTilt) * 6;  // Réduire l'intensité
            const tiltY = (y / maxTilt) * 6;  // Réduire l'intensité
            
            // Applique le seuil pour réduire les mises à jour
            if (Math.abs(tiltX - lastTiltX) > sensitivity || Math.abs(tiltY - lastTiltY) > sensitivity) {
                lastTiltX = tiltX;
                lastTiltY = tiltY;
                
                if (debounceTimeout) {
                    clearTimeout(debounceTimeout);
                }

                debounceTimeout = setTimeout(() => {
                    const container = document.getElementById('calculator-container');
                    
                    // Utilise requestAnimationFrame pour une mise à jour plus fluide
                    requestAnimationFrame(() => {
                        container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`;
                    });
                }, 19); // Délais équivalent à un rafraîchissement de 90Hz (1/90*1000ms)
            }
        }

        window.addEventListener('deviceorientation', handleOrientation);
        document.getElementById('clearDisplay').addEventListener('click', clearDisplay);
        document.getElementById('percentage').addEventListener('click', appendPercentage);
        document.getElementById('square-root').addEventListener('click', appendSquareRoot);