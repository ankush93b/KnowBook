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

const previewOverlay = document.getElementById('imagePreviewOverlay');
const previewImage = document.getElementById('previewImage');
const closeBtn = document.getElementById('hideImageBtn');

document.querySelectorAll('.icon-trigger').forEach(icon => {
  icon.addEventListener('click', () => {
    const imgSrc = icon.getAttribute('data-img');
    previewImage.src = imgSrc;
    previewOverlay.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  previewOverlay.style.display = 'none';
  previewImage.src = '';
});