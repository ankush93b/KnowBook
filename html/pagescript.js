/* THIS IS DICTIONARY POPUP*/ 
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

/* THIS IS SIDE BAR SCRIPT  */
const sidebar = document.getElementById('sidebar');

    function toggleSidebar() {
      sidebar.classList.toggle('open');
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function (event) {
      const isInsideSidebar = sidebar.contains(event.target);
      const isMenuButton = event.target.classList.contains('menu-toggle');
      if (!isInsideSidebar && !isMenuButton && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    /* THIS IS FOOTER SCRIPT*/

    fetch('footer.html')
      .then(res => res.text())
      .then(data => document.getElementById('footer').innerHTML = data);


/* THIS IS ADD IMAGE SCRIPT */
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
const previewCaption = document.getElementById('imageCaption');

document.querySelectorAll('.icon-trigger').forEach(icon => {
  icon.addEventListener('click', () => {
    const imgSrc = icon.getAttribute('data-img');
    const caption = icon.getAttribute('data-caption') || '';
    previewImage.src = imgSrc;
    previewCaption.textContent = caption;
    previewOverlay.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  previewOverlay.style.display = 'none';
  previewImage.src = '';
  previewCaption.textContent = '';
});