export class ResultsPanel {
    constructor() {
        this.currentResultPanel = document.getElementById('current-result');
        this.enteredNumberPanel = document.getElementById('entered-number');
        this.currentResult = undefined;
        this.enteredNumber = '';
        this.didUserEnteredAnything = false;
        this.displayEnteredNumber();
        fitty(this.enteredNumberPanel, {
            maxSize: 27,
            minSize: 12
        });
    }

    displayResults(resultsContent) {
        this.showCurrentResultPanel();
        this.currentResultPanel.textContent = resultsContent;
    }

    displayEnteredNumber() {
        if (this.enteredNumber.length === 0) {
            this.enteredNumberPanel.textContent = 0;
        } else {
            this.enteredNumberPanel.textContent = this.format(this.enteredNumber);
        }
    }

    deleteLastDigit() {
        this.enteredNumber = this.enteredNumber.slice(0, -1);
        this.displayEnteredNumber();
    }

    checkcurrentResultPanelVisbility() {
        const isThisFirstNumber = this.currentResult === undefined ? true : false;
        if (isThisFirstNumber) {
            this.showCurrentResultPanel();
            this.currentResult = this.enteredNumber === '' ? 0 : Number(this.enteredNumber);
        }
    }

    clearEnteredNumber() {
        this.enteredNumber = '';
    }

    showCurrentResultPanel() {
        this.currentResultPanel.style.display = 'block';
    }

    hideCurrentResultPanel() {
        this.currentResultPanel.style.display = 'none';
    }

    updateCurrentResultPanel(mathSymbol) {
        this.currentResultPanel.textContent = `${this.format(this.currentResult)} ${mathSymbol}`;
        this.enteredNumberPanel.textContent = `${this.format(this.currentResult)}`;
    }

    format(numberToFormat) {
        numberToFormat = numberToFormat.toString();
        let separatorIndex = numberToFormat.indexOf('.');
        if (separatorIndex != -1) {
            const partToFormat = Number(numberToFormat.slice(0, numberToFormat.indexOf('.')));
            let formattedPart = partToFormat.toLocaleString();
            let unformattedPart = numberToFormat.slice(numberToFormat.indexOf('.') + 1);
            return `${formattedPart},${unformattedPart}`;
        } else if (numberToFormat.includes('e')) {
            return numberToFormat;
        } else {
            let formattedNumber = Number(numberToFormat);
            formattedNumber = formattedNumber.toLocaleString();
            return formattedNumber;
        }
    }
}