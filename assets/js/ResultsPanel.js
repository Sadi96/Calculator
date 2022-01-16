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
            this.enteredNumberPanel.textContent = format('### ###.#########', this.enteredNumber);
        }
    }

    deleteLastDigit() {
        this.enteredNumber = this.enteredNumber.slice(0, -1);
        this.displayEnteredNumber();
    }

    checkcurrentResultPanelVisbility() {
        const isThisFirstNumber = this.currentResult === undefined ? true : false;
        if(isThisFirstNumber) {
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
        this.currentResultPanel.textContent = `${this.currentResult} ${mathSymbol}`;
        this.enteredNumberPanel.textContent = `${this.currentResult}`;
    }
}