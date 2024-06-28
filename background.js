chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ language: 'French' }, function() {
    console.log('Default language set to French.');
  });
});
