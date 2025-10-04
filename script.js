document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menuIcon');
  const navLinks = document.querySelector('.nav-links');
  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.property-card');
      if (!card) return;
      const title = card.querySelector('h3') ? card.querySelector('h3').innerText : '';
      const img = card.querySelector('img') ? card.querySelector('img').src : '';
      const price = card.querySelector('.price') ? card.querySelector('.price').innerText : '';
      
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalImage').src = img;
      document.getElementById('modalPrice').innerText = price;
      document.getElementById('propertyModal').classList.remove('hidden');
    });
  });

  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('propertyModal').classList.add('hidden');
    });
  }

  const scroller = document.querySelector('.property-grid');
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');
  const propertyCards = document.querySelectorAll('.property-card');
  if (scroller && leftBtn && rightBtn && propertyCards.length > 0) {
    const cardWidth = propertyCards[0].offsetWidth + 20; // width + gap
    let currentPosition = 0;
    const maxPosition = Math.max(0, (propertyCards.length - 4) * cardWidth);

    function updateSlider() {
      scroller.style.transform = `translateX(${currentPosition}px)`;
      leftBtn.disabled = currentPosition >= 0;
      rightBtn.disabled = currentPosition <= -maxPosition;
    }

    rightBtn.addEventListener('click', function() {
      if (currentPosition > -maxPosition) {
        currentPosition -= cardWidth * 4;
        if (currentPosition < -maxPosition) currentPosition = -maxPosition;
        updateSlider();
      }
    });

    leftBtn.addEventListener('click', function() {
      if (currentPosition < 0) {
        currentPosition += cardWidth * 4;
        if (currentPosition > 0) currentPosition = 0;
        updateSlider();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    scroller.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });
    scroller.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX && currentPosition > -maxPosition) {
        
        currentPosition -= cardWidth * 4;
        if (currentPosition < -maxPosition) currentPosition = -maxPosition;
        updateSlider();
      } else if (touchEndX > touchStartX && currentPosition < 0) {
       
        currentPosition += cardWidth * 4;
        if (currentPosition > 0) currentPosition = 0;
        updateSlider();
      }
    });

    updateSlider();
  }

  
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.property-card').forEach(card => {
        const location = card.dataset.location ? card.dataset.location.toLowerCase() : '';
        const price = card.dataset.price ? parseInt(card.dataset.price) : 0;
        if (
          query &&
          !(location.includes(query) || (!isNaN(parseInt(query)) && price <= parseInt(query)))
        ) {
          card.style.display = 'none';
        } else {
          card.style.display = '';
        }
      });
    });
  }

  window.openLoginModal = function() {
    document.getElementById('loginModal').classList.remove('hidden');
  };
  window.closeLoginModal = function() {
    document.getElementById('loginModal').classList.add('hidden');
  };
});

  
  