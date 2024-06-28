chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ language: 'French' }, function() {
    console.log('Default language set to French.');
  });
});


chrome.commands.onCommand.addListener(function(command) {
  if (command === 'toggle-language') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleLanguage' });
    });
  }
});
