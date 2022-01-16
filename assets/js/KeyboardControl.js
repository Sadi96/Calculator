const buttons = [{
        keycodes: [48, 96],
        element: document.querySelector("button[data-btn-content='0']")
    },
    {
        keycodes: [49, 97],
        element: document.querySelector("button[data-btn-content='1']")
    },
    {
        keycodes: [50, 98],
        element: document.querySelector("button[data-btn-content='2']")
    },
    {
        keycodes: [51, 99],
        element: document.querySelector("button[data-btn-content='3']")
    },
    {
        keycodes: [52, 100],
        element: document.querySelector("button[data-btn-content='4']")
    },
    {
        keycodes: [53, 101],
        element: document.querySelector("button[data-btn-content='5']")
    },
    {
        keycodes: [54, 102],
        element: document.querySelector("button[data-btn-content='6']")
    },
    {
        keycodes: [55, 103],
        element: document.querySelector("button[data-btn-content='7']")
    },
    {
        keycodes: [56, 104],
        element: document.querySelector("button[data-btn-content='8']")
    },
    {
        keycodes: [57, 105],
        element: document.querySelector("button[data-btn-content='9']")
    },
    {
        keycodes: [107, 187],
        element: document.querySelector("button[data-btn-content='+']")
    },
    {
        keycodes: [109, 189],
        element: document.querySelector("button[data-btn-content='-']")
    },
    {
        keycodes: [110, 188, 190],
        element: document.querySelector("button[data-btn-content='.']")
    },
    {
        keycodes: [106],
        element: document.querySelector("button[data-btn-content='x']")
    },
    {
        keycodes: [111, 191],
        element: document.querySelector("button[data-btn-content='/']")
    },
    {
        keycodes: [13, 187],
        element: document.querySelector("button[data-btn-content='=']")
    },
    {
        keycodes: [8],
        element: document.querySelector("button[data-btn-content='DEL']")
    },
    {
        keycodes: [27],
        element: document.querySelector("button[data-btn-content='RESET']")
    }
]

export class KeyboardControl {
    constructor(calculator) {
        this.calculator = calculator;
        window.addEventListener('keydown', this.detectKey.bind(this));
    }

    detectKey(e) {
        let pressedButton = buttons.find(button => button.keycodes.filter(x => x === e.keyCode)[0]);
        if (pressedButton != undefined) {
            pressedButton = buttons.find(button => button.keycodes.filter(x => x === e.keyCode)[0]).element;
            this.checkPressedButton(pressedButton);
        }
    }

    //this function works only with keyboard steering, clicking is managed by ButtonsPanel class
    checkPressedButton(button) {
        if (button.hasAttribute('data-operation')) {
            if(!this.calculator.dividingByZeroFlag) {
                const operation = button.getAttribute('data-operation');
                this.calculator.chooseOperation(operation);
            }
        } else {
            if(this.calculator.dividingByZeroFlag) {
                this.calculator.dividingByZeroFlag = false;
            }
            this.calculator.updateEnteredNumber(button.textContent);
        }
    }
}