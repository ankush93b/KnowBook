const popup = document.getElementById("popup");

document.querySelectorAll('.popup-trigger').forEach(element => {
  element.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent bubbling

    const message = this.getAttribute('data-message');
    const rect = this.getBoundingClientRect();

    popup.innerHTML = `
      <img src="dictionarylogo.png" alt="logo" style="width: 20px; vertical-align: middle; margin-right: 8px;">
      ${message}
    `;

    popup.style.left = rect.left + window.scrollX + "px";
    popup.style.top = rect.bottom + window.scrollY + "px";
    popup.style.display = "block";
  });
});

// Hide popup on clicking outside
document.addEventListener('click', () => {
  popup.style.display = 'none';
});