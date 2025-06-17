// Aguarda o DOM estar completamente carregado antes de executar o script.
// É uma prática semelhante ao $(document).ready() do jQuery.
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display'); 
    let currentInput = '0';
    let operator = null;
    let firstOperand = null;
    let waitingForSecondOperand = false;

    // Função para atualizar o display
    function updateDisplay() {
        display.value = currentInput;
    }

    // Seleciona TODOS os botões com a classe 'btn' e 'number'
    const numberButtons = document.querySelectorAll('.btn.number');
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            const digit = this.textContent; // Pega o texto do botão clicado

            if (waitingForSecondOperand === true) {
                currentInput = digit;
                waitingForSecondOperand = false;
            } else {
                if (digit === '.') {
                    if (!currentInput.includes('.')) {
                        currentInput += digit;
                    }
                } else {
                    currentInput = (currentInput === '0') ? digit : currentInput + digit;
                }
            }
            updateDisplay();
        });
    });

    // Seleciona TODOS os botões com a classe 'btn' e 'operator'
    const operatorButtons = document.querySelectorAll('.btn.operator');
    operatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextOperator = this.textContent.trim();
            const inputValue = parseFloat(currentInput);

            if (operator && waitingForSecondOperand) {
                operator = nextOperator;
                return;
            }

            if (firstOperand === null) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = calculate(firstOperand, inputValue, operator);
                currentInput = String(result);
                firstOperand = result;
            }

            waitingForSecondOperand = true;
            operator = nextOperator;
            updateDisplay();
        });
    });

    // Seleciona o botão de igual
    const equalsButton = document.querySelector('.btn.equals');
    equalsButton.addEventListener('click', function() {
        if (operator === null || waitingForSecondOperand) {
            return;
        }

        const inputValue = parseFloat(currentInput);
        const result = calculate(firstOperand, inputValue, operator);

        currentInput = String(result);
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    });

    // Seleciona o botão Clear
    const clearButton = document.querySelector('.btn.clear');
    clearButton.addEventListener('click', function() {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    });

    // Função que realiza o cálculo (a mesma da versão jQuery)
    function calculate(firstNum, secondNum, op) {
        if (op === '+') return firstNum + secondNum;
        if (op === '-') return firstNum - secondNum;
        if (op === '*') return firstNum * secondNum;
        if (op === '/') {
            if (secondNum === 0) {
                alert("Erro: Divisão por zero!");
                return 'Erro';
            }
            return firstNum / secondNum;
        }
        return secondNum;
    }
});