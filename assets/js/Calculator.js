import {
    ButtonsPanel
} from './ButtonsPanel.js';
import {
    ResultsPanel
} from './ResultsPanel.js';
import {
    KeyboardControl
} from './KeyboardControl.js'

const mathSymbols = [{
        operation: 'add',
        symbol: '+'
    },
    {
        operation: 'subtract',
        symbol: '-'
    },
    {
        operation: 'divide',
        symbol: '/'
    },
    {
        operation: 'multiply',
        symbol: '*'
    }
]

export class Calculator {
    constructor() {
        this.buttonsPanel = new ButtonsPanel(this);
        this.resultsPanel = new ResultsPanel();
        this.keyboardControl = new KeyboardControl(this);
        this.clikedButtonReaction = this.buttonsPanel.buttons.forEach(button => button.addEventListener('click', this.buttonsPanel.checkClickedButton.bind(this, button)));
        this.selectedOperation = undefined;
        this.dividingByZeroFlag = false;
    }

    updateEnteredNumber(digit) {
        let doubledSeparatorFlag = this.checkSeparatorDuplication(digit);
        if (!doubledSeparatorFlag || !this.resultsPanel.didUserEnteredAnything) {
            if (!this.resultsPanel.didUserEnteredAnything) {
                this.resultsPanel.clearEnteredNumber();
            }
            if (this.resultsPanel.enteredNumber.length < 15) {
                this.resultsPanel.didUserEnteredAnything = true;
                this.resultsPanel.enteredNumber += digit;
                this.resultsPanel.displayEnteredNumber();
            }
        }
    }

    checkSeparatorDuplication(digit) {
        if (digit === "." && this.resultsPanel.enteredNumber.toString().includes('.')) {
            return true;
        } else {
            return false;
        }
    }

    chooseOperation(operation) {
        if (operation === 'delete' || operation === 'reset' || operation === 'result') {
            switch (operation) {
                case 'delete':
                    this.resultsPanel.deleteLastDigit();
                    break;
                case 'reset':
                    this.reset();
                    break;
                case 'result':
                    const resultsContent = this.prepareResults();
                    this.checkPreviouslySelectedOperation('ignoreFlag');
                    if (this.dividingByZeroFlag) {
                        return this.dividingByZeroFailure();
                    }
                    this.resultsPanel.displayResults(resultsContent);
                    this.resultsPanel.didUserEnteredAnything = false;
                    break;
            }
        } else {
            const symbol = mathSymbols.find(x => x.operation === operation).symbol;
            this.checkEnteredNumberCorectness();
            this.checkPreviouslySelectedOperation(); //decide if we have to count something or just choose an operation
            this.resultsPanel.checkcurrentResultPanelVisbility();
            this.resultsPanel.updateCurrentResultPanel(symbol);
            this.selectedOperation = operation;
            this.resultsPanel.didUserEnteredAnything = false;
            this.resultsPanel.enteredNumber = this.resultsPanel.currentResult;
        }
    }

    checkPreviouslySelectedOperation(userActivityFlagIgnoring = 'dontIgnoreFlag') {
        if (this.selectedOperation === undefined || this.resultsPanel.enteredNumber === '') {
            return;
        }
        if (this.resultsPanel.didUserEnteredAnything || userActivityFlagIgnoring === 'ignoreFlag') {
            switch (this.selectedOperation) {
                case 'add':
                    this.add();
                    break;
                case 'subtract':
                    this.subtract();
                    break;
                case 'divide':
                    this.divide();
                    break;
                case 'multiply':
                    this.multiply();
                    break;
            }
        }
    }

    add() {
        this.checkEnteredNumberCorectness();
        this.resultsPanel.currentResult = exactMath.add(this.resultsPanel.currentResult, this.resultsPanel.enteredNumber)
        this.resultsPanel.updateCurrentResultPanel('+');
    }

    subtract() {
        this.checkEnteredNumberCorectness();
        this.resultsPanel.currentResult = exactMath.sub(this.resultsPanel.currentResult, this.resultsPanel.enteredNumber)
        this.resultsPanel.updateCurrentResultPanel('-');
    }

    divide() {
        if (this.resultsPanel.enteredNumber == 0) {
            return this.dividingByZeroFlag = true;
        } else {
            this.checkEnteredNumberCorectness();
            this.resultsPanel.currentResult = exactMath.div(this.resultsPanel.currentResult, this.resultsPanel.enteredNumber)
            this.resultsPanel.updateCurrentResultPanel('/');
        }
    }

    multiply() {
        this.checkEnteredNumberCorectness();
        this.resultsPanel.currentResult = exactMath.mul(this.resultsPanel.currentResult, this.resultsPanel.enteredNumber)
        this.resultsPanel.updateCurrentResultPanel('*');
    }

    prepareResults() {
        this.checkEnteredNumberCorectness();
        if (mathSymbols.find(data => data.operation === this.selectedOperation)) {
            const symbol = mathSymbols.find(x => x.operation === this.selectedOperation).symbol;
            const previousResult = this.resultsPanel.format(this.resultsPanel.currentResult);
            const enteredNumber = this.resultsPanel.format(this.resultsPanel.enteredNumber);
            return `${previousResult} ${symbol} ${enteredNumber} =`;
        } else if (this.resultsPanel.enteredNumber != '') {
            return `${this.resultsPanel.format(this.resultsPanel.enteredNumber)} =`;
        } else {
            return `0 =`
        }
    }

    reset() {
        this.selectedOperation = undefined;
        this.resultsPanel.currentResult = undefined;
        this.resultsPanel.enteredNumber = '';
        this.resultsPanel.didUserEnteredAnything = false;
        this.resultsPanel.hideCurrentResultPanel();
        this.resultsPanel.displayEnteredNumber();
    }

    dividingByZeroFailure() {
        this.reset();
        this.resultsPanel.enteredNumberPanel.textContent = 'Nie można dzielić przez zero';
    }

    checkEnteredNumberCorectness() {
        const num = this.resultsPanel.enteredNumber.toString();
        if (num === '.') {
            this.resultsPanel.enteredNumber = 0;
        } else if (num.split('')[num.length - 1] === '.') {
            this.resultsPanel.enteredNumber = num.slice(0, num.length - 1);
        }
    }
}