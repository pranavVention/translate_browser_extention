const dataExchangeTable = {};

// Function to load and parse the CSV file
function loadCSV(callback) {
  fetch(chrome.runtime.getURL('dataExchangeTable.csv'))
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          results.data.forEach(row => {
            const englishWord = row.English;
            dataExchangeTable[englishWord] = {
              French: row.French,
              German: row.German,
              Spanish: row.Spanish
            };
          });
          callback();
        }
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

chrome.storage.sync.get(['language'], function (result) {
  const language = result.language || 'English'; // Default to English if no language is set
  loadCSV(() => {
    if (language !== 'English') {
      replaceWords(language);
    }

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(mutations => {
      let nodesToUpdate = [];
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Collect newly added nodes and all child nodes
          mutation.addedNodes.forEach(node => {
            nodesToUpdate.push(node);
          });
        }
      });

      if (nodesToUpdate.length > 0) {
        replaceWords(language, nodesToUpdate);
      }

      // Ensure existing content is also checked each time
      replaceWords(language);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
});

function replaceWords(language, specificNodes) {
  let textNodes = [];

  if (specificNodes) {
    // If specific nodes are provided, only look for text nodes within those
    specificNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        let textNode;
        while (textNode = walker.nextNode()) {
          textNodes.push(textNode);
        }
      }
    });
  } else {
    // Otherwise, traverse the entire document body
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let textNode;
    while (textNode = walker.nextNode()) {
      textNodes.push(textNode);
    }

    // Include text nodes inside <span> and <button> elements
    const elements = document.querySelectorAll('span, button');
    elements.forEach(element => {
      element.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          textNodes.push(child);
        }
      });
    });
  }

  textNodes.forEach(node => {
    let text = node.nodeValue;
    Object.keys(dataExchangeTable).forEach(englishWord => {
      let translatedWord = dataExchangeTable[englishWord][language];
      if (translatedWord) {
        // Create a regular expression for case-insensitive word replacement
        const regex = new RegExp(`\\b${englishWord}\\b`, 'gi');

        // Check if the original word is in all caps and convert translatedWord to all caps if necessary
        if (text === text.toUpperCase()) {
          translatedWord = translatedWord.toUpperCase();
        }

        // Replace the text with the translated word
        text = text.replace(regex, translatedWord);
      }
    });
    node.nodeValue = text;
  });
}

function toggleLanguage() {
  chrome.storage.sync.get('language', function (data) {
    const currentLanguage = data.language || 'English'; // Default to English
    let nextLanguage;

    // Toggle between English, French, German, and Spanish
    if (currentLanguage === 'English') {
      nextLanguage = 'French';
    } else if (currentLanguage === 'French') {
      nextLanguage = 'German';
    } else if (currentLanguage === 'German') {
      nextLanguage = 'Spanish';
    } else {
      nextLanguage = 'English';
    }

    // Save the selected language to storage
    chrome.storage.sync.set({ 'language': nextLanguage }, function () {
      console.log('Language set to ' + nextLanguage);
      // Call a function to update content with the new language
      replaceWords(nextLanguage);
    });
  });
}

// Listen for the message from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'toggleLanguage') {
    toggleLanguage();
  }
});
