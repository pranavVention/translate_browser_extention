# Word Translator Chrome Extension

## Description

Word Translator is a Chrome extension that translates specific words on a webpage based on a data exchange table. You can configure the extension to translate words between English, French, and German.

## Features

- Translates specific words on a webpage based on a CSV data exchange table.
- Supports English, French, and German translations.
- Allows users to select the target language through a popup menu.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.


### Steps

1. Clone the repository:
```sh
git clone https://github.com/yourusername/word-translator-extension.git
   
cd word-translator-extension
```

2. Load the extension in Chrome:

- Open chrome://extensions/ in your Chrome browser.
- Enable "Developer mode" by clicking the toggle switch in the top right corner.
- Click "Load unpacked" and select the translate_browser_extention directory.
  
## Usage
1. Click on the Word Translator extension icon next to the address bar.
2. Select the target language (English, French, or German) from the popup.
3. The extension will automatically replace specific words on the current webpage based on the selected language.
Development


### Directory Structure
```
word-translator-extension/
├── background.js
├── content.js
├── dataExchangeTable.csv
├── icons/
├── manifest.json
├── papaparse.min.js
├── popup.html
├── popup.js
└── README.md
```

## Files

- `background.js`: Handles background tasks (if any).
- `content.js`: The main content script that replaces words on the webpage.
- `popup.js`: Manages the popup menu for language selection.
- `popup.html`: The HTML file for the popup menu.
- `dataExchangeTable.csv`: The CSV file containing the words and their translations.
- `manifest.json`: The manifest file for the Chrome extension.
- `papaparse.min.js`: The library used for parsing CSV files.
- `icons/`: Directory containing icons for the extension.
- `README.md`: This README file.
- `package.json`: Contains the project dependencies and scripts.


## Acknowledgements
PapaParse for CSV parsing. (https://www.papaparse.com/)

