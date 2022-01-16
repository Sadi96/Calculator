import { Themes } from './Themes.js';
import { Calculator } from './Calculator.js';

class App {
    constructor() {
        const themes = new Themes();
        const calculator = new Calculator();
    }
}

const app = new App();