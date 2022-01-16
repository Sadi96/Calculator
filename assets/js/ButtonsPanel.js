export class ButtonsPanel {
    constructor() {
        this.buttons = document.querySelectorAll('.panel__buttons button');
    }

    //this function works only with clicking, steering with keyboard is managed by KeyboardControl class
    //this functions is called by Calculator, so "this" is referencing to Calculator
    checkClickedButton(button) {
        if (button.hasAttribute('data-operation')) {
            if(!this.divingByZeroFlag) {
                const operation = button.getAttribute('data-operation');
                this.chooseOperation(operation);
            }
        } else {
            if(this.divingByZeroFlag) {
                this.divingByZeroFlag = false;
            }
            this.updateEnteredNumber(button.textContent);
        }
    }
}