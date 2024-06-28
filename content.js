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
        complete: function(results) {
          results.data.forEach(row => {
            const englishWord = row.English;
            dataExchangeTable[englishWord] = {
              French: row.French,
              German: row.German
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

chrome.storage.sync.get(['language'], function(result) {
  const language = result.language || 'English'; // Default to English if no language is set
  loadCSV(() => {
    if (language !== 'English') {
      replaceWords(language);
    }

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
          if (language !== 'English') {
            replaceWords(language);
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
});

function replaceWords(language) {
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node);
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

  textNodes.forEach(node => {
    let text = node.nodeValue;
    Object.keys(dataExchangeTable).forEach(englishWord => {
      const translatedWord = dataExchangeTable[englishWord][language];
      const regex = new RegExp(`\\b${englishWord}\\b`, 'gi'); // Case-insensitive match
      text = text.replace(regex, translatedWord);
    });
    node.nodeValue = text;
  });
}
