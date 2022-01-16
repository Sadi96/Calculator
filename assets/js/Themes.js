export class Themes {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.toggleButton = document.getElementById('toggle-button');
        this.selectedTheme = 0;
        this.themesNames = ['theme__desaturated-blue', 'theme__light-gray', 'theme__dark-violet'];
        this.themeToggle.addEventListener('click', this.switchTheme.bind(this));
    }

    switchTheme() {
        this.selectedTheme++;
        this.selectedTheme === 3 ? this.selectedTheme = 0 : '';
        document.body.className = this.themesNames[this.selectedTheme];
        this.adjustToggleButton();
    }

    adjustToggleButton() {
        switch(this.selectedTheme) {
            case 0:
                this.toggleButton.style.left = '20%';
                break;
            case 1:
                this.toggleButton.style.left = '50%';
                break;
            case 2:
                this.toggleButton.style.left = '80%';
                break;
        }
    }
}