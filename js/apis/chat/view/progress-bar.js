class ProgressBar {
    containerElement = document.createElement('div');
    constructor() {

        this.containerElement.className = 'progress';
        this.containerElement.style.margin = '0'
        this.containerElement.innerHTML = '<div class="indeterminate"></div>'
        this.hide()
    }

    get progressBar() {
        return this.containerElement.children[0]
    }
    hide() {
        this.containerElement.style.display = 'none';

    }

    show() {
        this.containerElement.style.display = 'block';

    }

    set percentage(value) {
        this.progressBar.style.width = `${value}%`;
    }

    set determinate(isDeterminate) {
        this.progressBar.className = isDeterminate ? 'determinate' : 'indeterminate';
    }
}

// Example usage:
//
/*

    const progressBar = new ProgressBar();

    // Show progress bar
    progressBar.show();

    // Set percentage
    progressBar.percentage = 70;

    // Set to indeterminate
    progressBar.determinate = false;

    // Hide progress bar
    setTimeout(() => {
        progressBar.hide();
    }, 5000);

    document.body.appendChild(progressBar.containerElement)
*/