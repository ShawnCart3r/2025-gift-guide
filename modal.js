console.log('[modal.js] Loading...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('[modal.js] DOM ready');
  
  const modal = document.getElementById('gearModal');
  if (!modal) {
    console.error('[modal] Modal not found!');
    return;
  }

  const overlay = modal.querySelector('.modal__backdrop');
  const closeBtn = modal.querySelector('.modal__close');
  const leftCard = document.getElementById('gmCardLeft');
  const rightCard = document.getElementById('gmCardRight');
  const leftImg = document.getElementById('gmImgLeft');
  const rightImg = document.getElementById('gmImgRight');
  const leftBack = document.getElementById('gmBackLeft');
  const rightBack = document.getElementById('gmBackRight');

  // Product data
  const PRODUCTS = {
    'socks-balega': {
      leftImg: 'image/logos/darn-tough-2.jpg',
      rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge">Premium</span>
          <h2>Darn Tough Running Socks</h2>
          <div class="features">
            <span class="feature-tag">🍃 Ultra Lightweight</span>
            <span class="feature-tag">🇺🇸 Made in Vermont</span>
            <span class="feature-tag">♾️ Lifetime Guarantee</span>
          </div>
          <p class="description">Fine-gauge Merino wool socks. Perfect for any season, any activity.</p>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Our Darn Tough Selection</h2>
          <ul class="carry-list">
            <li>Micro Crew Lightweight</li>
            <li>No-Show Tab Light Cushion</li>
            <li>Quarter Crew Cushion</li>
          </ul>
        </div>
      `
    },
    'socks-darntough': {
      leftImg: 'image/logos/1-balega-logo-1.jpg',
      rightImg: 'image/socks/balega-hidden-comfort.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-new">Bestseller</span>
          <h2>Balega Hidden Comfort</h2>
          <p class="description">The gold standard in running socks.</p>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Our Balega Selection</h2>
          <ul class="carry-list">
            <li>Hidden Comfort No-Show</li>
            <li>Hidden Comfort Quarter</li>
          </ul>
        </div>
      `
    },
    'socks-jogology': {
      leftImg: 'image/logos/jogology-logo.webp',
      rightImg: 'image/socks/no-show-jocology.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-sport">Performance</span>
          <h2>Jogology Running Socks</h2>
          <p class="description">Technical running sock.</p>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Our Jogology Selection</h2>
          <ul class="carry-list">
            <li>No-Show Tab Performance</li>
            <li>Quarter Crew Sport</li>
          </ul>
        </div>
      `
    },
    'socks-dttab': {
      leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
      rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge">Premium</span>
          <h2>Darn Tough No-Show Tab</h2>
          <p class="description">The perfect invisible sock.</p>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>No-Show Collection</h2>
          <ul class="carry-list">
            <li>No-Show Tab Light Cushion</li>
            <li>No-Show Tab Ultra-Light</li>
          </ul>
        </div>
      `
    },
    'cold-balega': {
      leftImg: 'image/socks/balega-hidden-comfort.jpg',
      rightImg: 'image/socks/balega-hidden-comfort.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-winter">Winter Ready</span>
          <h2>Running Gloves</h2>
          <p class="description">Keep your hands warm.</p>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Cold Weather Essentials</h2>
          <ul class="carry-list">
            <li>Lightweight Running Gloves</li>
            <li>Thermal Fleece Gloves</li>
          </ul>
        </div>
      `
    },
    'default': {
      leftImg: 'image/logos/darn-tough-2.jpg',
      rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
      leftText: `<div class="product-detail"><h2>Featured Product</h2></div>`,
      rightText: `<div class="product-detail"><h2>Visit Us</h2></div>`
    }
  };

  function openModal(productKey) {
    console.log('[modal] Opening:', productKey);
    const data = PRODUCTS[productKey] || PRODUCTS['default'];
    
    if (leftImg) leftImg.src = data.leftImg;
    if (rightImg) rightImg.src = data.rightImg;
    if (leftBack) leftBack.innerHTML = data.leftText;
    if (rightBack) rightBack.innerHTML = data.rightText;
    
    if (leftCard) leftCard.classList.remove('is-flipped');
    if (rightCard) rightCard.classList.remove('is-flipped');
    
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    
    console.log('[modal] Opened');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Card flip
  function setupCardFlip(card) {
    if (!card) return;
    
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.toggle('is-flipped');
    });
  }

  setupCardFlip(leftCard);
  setupCardFlip(rightCard);

  // CRITICAL FOR MOBILE: Use capture phase to intercept before main.js blocks it
  function attachTileListeners() {
    const tiles = document.querySelectorAll('.gear-tile');
    console.log('[modal] Found tiles:', tiles.length);
    
    tiles.forEach((tile, index) => {
      const page = tile.closest('.page');
      const pageTitle = page ? page.getAttribute('data-title') : '';
      const item = tile.getAttribute('data-item');
      
      let productKey = 'default';
      
      if (pageTitle.includes('Running Socks')) productKey = `socks-${item}`;
      else if (pageTitle.includes('Cold Weather')) productKey = `cold-${item}`;
      else if (pageTitle.includes('Jackets')) productKey = `jackets-${item}`;
      else if (pageTitle.includes('Warm Layers')) productKey = `layers-${item}`;
      else if (pageTitle.includes('Nutrition')) productKey = `nutrition-${item}`;
      else if (pageTitle.includes('Electronics')) productKey = `electronics-${item}`;
      else if (pageTitle.includes('Lululemon')) productKey = `lululemon-${item}`;
      else if (pageTitle.includes('Rabbit')) productKey = `rabbit-${item}`;
      else if (pageTitle.includes('Injury')) productKey = `injury-${item}`;
      
      // Store product key on element
      tile.dataset.modalProduct = productKey;
      
      // STRATEGY 1: Use CAPTURE PHASE to intercept BEFORE main.js
      // This fires before the main.js blocking code
      tile.addEventListener('touchstart', (e) => {
        const now = Date.now();
        console.log('[modal] Touch start (capture):', productKey, 'time:', now);
        tile.dataset.touchStartTime = now.toString();
        tile.dataset.touchStartX = e.touches[0].clientX.toString();
        tile.dataset.touchStartY = e.touches[0].clientY.toString();
      }, { capture: true, passive: true });
      
      tile.addEventListener('touchend', (e) => {
        console.log('[modal] Touch end (capture):', productKey);
        console.log('[modal] Stored data:', tile.dataset.touchStartTime, tile.dataset.touchStartX);
        
        // Check if touchstart was captured
        if (!tile.dataset.touchStartTime) {
          console.log('[modal] ⚠️ No touchstart data - opening modal anyway!');
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openModal(productKey);
          return;
        }
        
        const startTime = parseInt(tile.dataset.touchStartTime);
        const startX = parseFloat(tile.dataset.touchStartX);
        const startY = parseFloat(tile.dataset.touchStartY);
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const duration = Date.now() - startTime;
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        console.log('[modal] Tap check - duration:', duration, 'distance:', distance);
        
        // Only open if it was a tap (not a drag/swipe)
        if (duration < 800 && distance < 50) {
          console.log('[modal] ✓ Valid tap detected! Opening modal...');
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openModal(productKey);
        } else {
          console.log('[modal] ✗ Not a tap - duration:', duration, 'ms, distance:', Math.round(distance), 'px');
        }
        
        // Clear data
        delete tile.dataset.touchStartTime;
        delete tile.dataset.touchStartX;
        delete tile.dataset.touchStartY;
      }, { capture: true, passive: false });
      
      // STRATEGY 2: Also listen for click events (works on desktop)
      tile.addEventListener('click', (e) => {
        console.log('[modal] Click event:', productKey);
        e.stopPropagation();
        openModal(productKey);
      });
    });
    
    console.log('[modal] Listeners attached');
  }

  // Delay attachment slightly to ensure main.js is loaded
  setTimeout(attachTileListeners, 200);

  console.log('[modal] Setup complete');
});
