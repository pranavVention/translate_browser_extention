# Word Translator Chrome Extension

## Description

Word Translator is a Chrome extension that translates specific words on a webpage based on a data exchange table. You can configure the extension to translate words between English, French, and German.

## Features

- Translates specific words on a webpage based on a CSV data exchange table.
- Supports English, French, and German translations.
- Allows users to select the target language through a popup menu.

## Installation

### Prerequisites

- Node.js and npm installed on your system.

### Steps

1. Clone the repository:
 ```sh
   git clone https://github.com/yourusername/word-translator-extension.git
   cd word-translator-extension
   ```
2. Install dependencies:

  ```sh
    npm install
    ```

3. Bundle the extension
```sh
  npx webpack --mode production
```
4. Load the extension in Chrome:

- Open chrome://extensions/ in your Chrome browser.
- Enable "Developer mode" by clicking the toggle switch in the top right corner.
- Click "Load unpacked" and select the dist directory.
  
## Usage
1. Click on the Word Translator extension icon next to the address bar.
2. Select the target language (English, French, or German) from the popup.
3. The extension will automatically replace specific words on the current webpage based on the selected language.
Development

## Directory Structure

word-translator-extension/
├── src/
│   ├── content.js
│   ├── background.js
│   ├── popup.js
│   ├── popup.html
│   ├── dataExchangeTable.csv
├── dist/
├── manifest.json
├── webpack.config.js
├── package.json
├── .gitignore
└── README.md

## Files
src/content.js: The main content script that replaces words on the webpage.
src/background.js: Handles background tasks (if any).
src/popup.js: Manages the popup menu for language selection.
src/popup.html: The HTML file for the popup menu.
src/dataExchangeTable.csv: The CSV file containing the words and their translations.
manifest.json: The manifest file for the Chrome extension.
webpack.config.js: Webpack configuration file for bundling the extension.
package.json: Contains the project dependencies and scripts.
Scripts
npm install: Installs the project dependencies.
npx webpack --mode production: Bundles the extension using Webpack.
License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
PapaParse for CSV parsing. (https://www.papaparse.com/)
Webpack for bundling the extension.


