class FileMessageCard extends MessageCard {
    // Constructor to create a new FileMessageCard instance
    constructor() {
        super(); // Call the constructor of the parent class (MessageCard)

        // Insert the HTML code after the beginning of the container element
        this._containerElement.insertAdjacentHTML('afterbegin', `
            <div class="file-message">
                <div class="icon">
                    <a class="btn-floating waves-effect waves-light grey darken-4">
                        <i class="material-icons">picture_as_pdf</i>
                    </a>
                </div>
                
                <div class=".centered-vertically">
                    <span class="file-name"></span>
                    <br>
                    <span class="file-size"></span>
                </div>
                
                <div class="download">
                    <a>
                        <i class="material-icons">file_download</i>
                    </a>
                </div>
            </div>
        `);

        // Add click event to the download button
        this.downloadButton.addEventListener('click', () => this.triggerEvent('DOWNLOAD'));
    }

    // Setter method to set the file name of the message card
    set fileName(fileName) {
        const fileNameElement = this._containerElement.querySelector('.file-name');
        fileNameElement.textContent = fileName;
        this.icon = this._getFileExtension(fileName)
    }
    _getFileExtension(filename) {
        // Get the last index of the dot (.) to find the beginning of the extension
        const lastIndex = filename.lastIndexOf('.');

        // Check if there's a dot and it's not the first character in the filename
        if (lastIndex !== -1 && lastIndex !== 0) {
            // Extract the substring starting from the dot to the end of the filename
            return filename.slice(lastIndex + 1).toLowerCase();
        } else {
            // No valid extension found
            return "";
        }
    }
    // Setter method to set the file size of the message card
    set fileSize(bytes) {
        const fileSizeElement = this._containerElement.querySelector('.file-size');
        const megabytes = (bytes / (1024 * 1024)).toFixed(2); // Convert bytes to megabytes
        fileSizeElement.textContent = `${megabytes} MB`;
    }

    // Setter method to set the icon based on the file extension
    set icon(fileExtension) {
        const iconElement = this._containerElement.querySelector('.icon a i');
        let icon;
        switch (fileExtension.toLowerCase()) {
            case 'pdf':
                icon = 'picture_as_pdf';
                break;
            case 'doc':
            case 'docx':
                icon = 'description';
                break;
            case 'xls':
            case 'xlsx':
                icon = 'grid_on';
                break;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                icon = 'image';
                break;
            case 'mp3':
            case 'wav':
                icon = 'audiotrack';
                break;
            default:
                icon = 'insert_drive_file';
        }
        iconElement.textContent = icon;
    }

    // Getter method to retrieve the download button element
    get downloadButton() {
        return this._containerElement.querySelector('.download a');
    }
}
/*
// Example usage
const fileMessageCard = new FileMessageCard();
fileMessageCard.date = Date.now();
fileMessageCard.from = 'receiver';
fileMessageCard.fileName = 'example.pdf';
fileMessageCard.fileSize = 1048576; // 1 MB in bytes
fileMessageCard.icon = 'application/pdf';
document.body.appendChild(fileMessageCard.containerElement);

fileMessageCard.on('download', () => {
    console.log('Download button clicked.');
});

fileMessageCard.containerElement.focus();
*/