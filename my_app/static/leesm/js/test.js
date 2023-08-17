const customInput = document.getElementsByClassName('custom-input');

customInput.addEventListener('focus', showPlaceholder);
customInput.addEventListener('blur', hidePlaceholder);

function showPlaceholder() {
  if (customInput.value === '') {
    customInput.value = customInput.placeholder;
  }
}

function hidePlaceholder() {
  if (customInput.value === customInput.placeholder) {
    customInput.value = '';
  }
}
