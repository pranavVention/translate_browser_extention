document.addEventListener('DOMContentLoaded', function() {
  const radios = document.querySelectorAll('input[name="language"]');

  // Load the saved language preference
  chrome.storage.sync.get(['language'], function(result) {
    const savedLanguage = result.language || 'English';
    radios.forEach(radio => {
      if (radio.value === savedLanguage) {
        radio.checked = true;
      }
    });
  });

  // Save the selected language preference
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      chrome.storage.sync.set({ language: this.value }, function() {
        console.log('Language preference saved:', this.value);
      });
    });
  });
});
