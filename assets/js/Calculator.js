// TO DO:
// dzielenie przez 0 - DONE
// sztywna szerokosc kalkulatora, ewentualne zmniejszanie wielkosci cyfr - DONE
// pojebane ulamki
// ograniczyc maksymalna liczbe znakow jaka mozna wprowadzic
// maska dzielaca cyfry na tysiace
// mozliwosc wprowadzania separatora wiecej niz jeden raz

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

    //TO DO
    //rozpisać if'y w jakis bardziej przejrzysty sposob
    // dopisac regule ktora przy ".costam" bedzie dodawac zero na poczatku
    updateEnteredNumber(digit) {
        if(digit === "." && this.resultsPanel.enteredNumber.includes('.')) {
            return
        }
        if (!this.resultsPanel.didUserEnteredAnything) {
            this.resultsPanel.clearEnteredNumber();
        }
        this.resultsPanel.didUserEnteredAnything = true;
        this.resultsPanel.enteredNumber += digit;
        this.resultsPanel.displayEnteredNumber();
    }

    chooseOperation(operation) {
        switch (operation) {
            case 'delete':
                this.resultsPanel.deleteLastDigit();
                break;
            case 'reset':
                this.reset();
                break;
            case 'add':
                this.checkPreviouslySelectedOperation(); //decide if we have to count something or just choose an operation
                this.resultsPanel.checkcurrentResultPanelVisbility();
                this.resultsPanel.updateCurrentResultPanel('+');
                this.selectedOperation = operation;
                this.resultsPanel.didUserEnteredAnything = false;
                this.resultsPanel.enteredNumber = Number(this.resultsPanel.enteredNumberPanel.textContent);
                break;
            case 'subtract':
                this.checkPreviouslySelectedOperation(); //decide if we have to count something or just choose an operation
                this.resultsPanel.checkcurrentResultPanelVisbility();
                this.resultsPanel.updateCurrentResultPanel('-');
                this.selectedOperation = operation;
                this.resultsPanel.didUserEnteredAnything = false;
                this.resultsPanel.enteredNumber = Number(this.resultsPanel.enteredNumberPanel.textContent);
                break;
            case 'divide':
                this.checkPreviouslySelectedOperation(); //decide if we have to count something or just choose an operation
                this.resultsPanel.checkcurrentResultPanelVisbility();
                this.resultsPanel.updateCurrentResultPanel('/');
                this.selectedOperation = operation;
                this.resultsPanel.didUserEnteredAnything = false;
                this.resultsPanel.enteredNumber = Number(this.resultsPanel.enteredNumberPanel.textContent);
                break;
            case 'multiply':
                this.checkPreviouslySelectedOperation(); //decide if we have to count something or just choose an operation
                this.resultsPanel.checkcurrentResultPanelVisbility();
                this.resultsPanel.updateCurrentResultPanel('x');
                this.selectedOperation = operation;
                this.resultsPanel.didUserEnteredAnything = false;
                this.resultsPanel.enteredNumber = Number(this.resultsPanel.enteredNumberPanel.textContent);
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
    }

    checkPreviouslySelectedOperation(flagIgnoring = 'dontIgnoreFlag') {
        if (this.selectedOperation === undefined || this.resultsPanel.enteredNumber === '') {
            return;
        }
        switch (this.selectedOperation) {
            case 'add':
                if (this.resultsPanel.didUserEnteredAnything || flagIgnoring === 'ignoreFlag') {
                    this.add();
                }
                break;
            case 'subtract':
                if (this.resultsPanel.didUserEnteredAnything || flagIgnoring === 'ignoreFlag') {
                    this.subtract();
                }
                break;
            case 'divide':
                if (this.resultsPanel.didUserEnteredAnything || flagIgnoring === 'ignoreFlag') {
                    this.divide();
                }
                break;
            case 'multiply':
                if (this.resultsPanel.didUserEnteredAnything || flagIgnoring === 'ignoreFlag') {
                    this.multiply();
                }
                break;
        }
    }

    prepareResults() {
        if (mathSymbols.find(data => data.operation === this.selectedOperation)) {
            const symbol = mathSymbols.find(x => x.operation === this.selectedOperation).symbol;
            const previousResult = this.resultsPanel.currentResult;
            const enteredNumber = this.resultsPanel.enteredNumber;
            return `${previousResult} ${symbol} ${enteredNumber} =`;
        } else if (this.resultsPanel.enteredNumber != '') {
            return `${this.resultsPanel.enteredNumber} =`;
        } else {
            return `0 =`
        }

    }

    add() {
        this.resultsPanel.currentResult += Number(this.resultsPanel.enteredNumber);
        this.resultsPanel.updateCurrentResultPanel('+');
    }

    subtract() {
        this.resultsPanel.currentResult -= Number(this.resultsPanel.enteredNumber);
        this.resultsPanel.updateCurrentResultPanel('-');
    }

    divide() {
        if (this.resultsPanel.enteredNumber == 0) {
            return this.dividingByZeroFlag = true;
        } else {
            this.resultsPanel.currentResult = this.resultsPanel.currentResult / Number(this.resultsPanel.enteredNumber);
            this.resultsPanel.updateCurrentResultPanel('/');
        }
    }

    multiply() {
        this.resultsPanel.currentResult = this.resultsPanel.currentResult * Number(this.resultsPanel.enteredNumber);
        this.resultsPanel.updateCurrentResultPanel('*');
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
}