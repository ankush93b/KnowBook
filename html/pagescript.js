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

/* THIS IS COLLAGE SCRIPT */
let currentZoomedImage = null;
const collage = document.getElementById('collage');
    const zoomModal = document.getElementById('zoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    const zoomCaption = document.getElementById('zoomCaption');

    const closeBtn = document.getElementById('closeBtn');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetZoomBtn = document.getElementById('resetZoomBtn');
    const buttonGroup = document.querySelector('.button-group');

    let currentScale = 1;
    const maxScale = 3;
    const minScale = 1;
    let translateX = 0, translateY = 0, isDragging = false, startX, startY;

    function updateButtonPosition() {
      const baseMargin = 12;
      const originalWidth = zoomedImage.clientWidth / currentScale;
      const scaledWidth = originalWidth * currentScale;
      const extraWidth = scaledWidth - originalWidth;
      buttonGroup.style.marginLeft = `${extraWidth + baseMargin}px`;
    }

    function applyTransform() {
      zoomedImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
      updateButtonPosition();
    }

    function applyScale(scale) {
      currentScale = Math.min(Math.max(scale, minScale), maxScale);
      if (currentScale === 1) {
        translateX = 0;
        translateY = 0;
      }
      applyTransform();
    }

    function onDragStart(e) {
      if (currentScale === 1) return;
      isDragging = true;
      startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      startY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
      zoomedImage.style.cursor = 'grabbing';
      e.preventDefault();
    }

    function onDragMove(e) {
      if (!isDragging) return;
      const currentX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const currentY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
      const dx = currentX - startX;
      const dy = currentY - startY;
      startX = currentX;
      startY = currentY;
      translateX += dx;
      translateY += dy;
      applyTransform();
    }

    function onDragEnd() {
      isDragging = false;
      zoomedImage.style.cursor = 'grab';
    }

    function showZoom(img) {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      zoomedImage.style.transformOrigin = "center center";
      zoomedImage.src = img.src;
      zoomCaption.textContent = img.getAttribute('data-caption');
      zoomModal.style.display = 'flex';
      buttonGroup.style.marginLeft = '12px';
      zoomedImage.style.transform = '';
      currentZoomedImage = img;  
      
    }
    
    

    // Attach drag and zoom handlers
    zoomedImage.addEventListener('mousedown', onDragStart);
    zoomedImage.addEventListener('touchstart', onDragStart, { passive: false });
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);
    window.addEventListener('touchcancel', onDragEnd);

    zoomInBtn.addEventListener('click', () => applyScale(currentScale + 0.2));
    zoomOutBtn.addEventListener('click', () => applyScale(currentScale - 0.2));
    resetZoomBtn.addEventListener('click', () => applyScale(1));
    closeBtn.addEventListener('click', () => {
      zoomModal.style.display = 'none';
      applyScale(1);
      zoomedImage.style.transform = '';
      buttonGroup.style.marginLeft = '12px';
      currentZoomedImage = null;
      keywordsDiv.style.display = 'none';
    });

    zoomModal.addEventListener('click', (e) => {
      if (e.target === zoomModal) {
        zoomModal.style.display = 'none';
        applyScale(1);
        zoomedImage.style.transform = '';
        buttonGroup.style.marginLeft = '12px';
        keywordsDiv.style.display = 'none';
        currentZoomedImage=null;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        zoomModal.style.display = 'none';
        applyScale(1);
        zoomedImage.style.transform = '';
        buttonGroup.style.marginLeft = '12px';
      }
    });

    

    const imageSearch = document.getElementById('imageSearch');

function renderImages(filteredImages) {
  collage.innerHTML = ''; // Clear current images
  filteredImages.forEach(data => {
    const img = new Image();
    img.src = data.src;
    img.className = "collage-image";
    img.setAttribute("data-caption", data.caption);
    img.onclick = () => showZoom(img);
    collage.appendChild(img);
  });
}

// Initial render of all images
renderImages(images);

imageSearch.addEventListener('input', () => {
  const query = imageSearch.value.trim().toLowerCase();
  if (!query) {
    renderImages(images);
    return;
  }
  // Split query into words, filter images if ALL words appear somewhere in searchQuery
  const queryWords = query.split(/\s+/);
  const filtered = images.filter(img => {
    const searchText = img.searchQuery.toLowerCase();
    // Every query word must be included somewhere in the searchQuery string
    return queryWords.every(word => searchText.includes(word));
  });
  renderImages(filtered);
});

  
  function adjustButtonsForMobile() {
  const isMobile = window.innerWidth <= 768;
  const buttons = buttonGroup.querySelectorAll('.side-btn');
  buttons.forEach((btn, index) => {
    if (btn.id !== 'tagBtn') {
      btn.style.display = isMobile ? 'none' : 'block';
    }
  });

  // Move tagBtn below caption on mobile
  const zoomWrapper = document.querySelector('.zoom-image-wrapper');
  const caption = document.getElementById('zoomCaption');
  const tagBtn = document.getElementById('tag-btn-wrapper');

  if (isMobile) {
    // Ensure it's not already appended
    if (!caption.nextElementSibling || caption.nextElementSibling.id !== 'tagBtn') {
      caption.insertAdjacentElement('afterend', tagBtn);
      tagBtn.style.marginTop = '8px';
      tagBtn.style.marginLeft = '0px';
    }
  } else {
    // Restore tagBtn back to buttonGroup on desktop
    if (!buttonGroup.contains(tagBtn)) {
      buttonGroup.appendChild(tagBtn);
      tagBtn.style.marginTop = '';
      tagBtn.style.marginLeft = '';
    }
  }
}



// Run on load and resize
window.addEventListener('load', adjustButtonsForMobile);
window.addEventListener('resize', adjustButtonsForMobile);