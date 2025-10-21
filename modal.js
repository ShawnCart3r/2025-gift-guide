document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('gearModal');
  if (!modal) {
    console.error('[modal] #gearModal not found');
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

  // Product data organized by category and item
  const PRODUCTS = {
    // RUNNING SOCKS (Page 1)
    'socks-balega': {
      leftImg: '/image/logos/darn-tough-2.jpg',
      rightImg: '/image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge">Premium</span>
          <h2>Darn Tough Running Socks</h2>
          <div class="features">
            <span class="feature-tag">🍃 Ultra Lightweight</span>
            <span class="feature-tag">🇺🇸 Made in Vermont</span>
            <span class="feature-tag">♾️ Lifetime Guarantee</span>
          </div>
          <p class="description">Fine-gauge Merino wool socks. Perfect for any season, any activity. Made in Vermont with lifetime guarantee.</p>
          <div class="specs">
            <div class="spec-item"><strong>Weight:</strong> Lightweight</div>
            <div class="spec-item"><strong>Made:</strong> Vermont, USA</div>
            <div class="spec-item"><strong>Warranty:</strong> Lifetime</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Our Darn Tough Selection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>Micro Crew Lightweight</li>
              <li>No-Show Tab Light Cushion</li>
              <li>Quarter Crew Cushion</li>
              <li>Boot Sock Full Cushion</li>
            </ul>
          </div>
        </div>
      `
    },
    'socks-darntough': {
      leftImg: '/image/logos/1-balega-logo-1.jpg',
      rightImg: '/image/socks/balega-hidden-comfort.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-new">Bestseller</span>
          <h2>Balega Hidden Comfort</h2>
          <div class="features">
            <span class="feature-tag">☁️ Plush Cushion</span>
            <span class="feature-tag">🎯 Deep Heel Pocket</span>
            <span class="feature-tag">✨ Seamless Toe</span>
          </div>
          <p class="description">The gold standard in running socks. Extra-deep heel pocket and hand-linked seamless toe for blister-free miles.</p>
          <div class="specs">
            <div class="spec-item"><strong>Material:</strong> Mohair Blend</div>
            <div class="spec-item"><strong>Cushion:</strong> Medium-Plush</div>
            <div class="spec-item"><strong>Best For:</strong> Long Distance</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Our Balega Selection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>Hidden Comfort No-Show</li>
              <li>Hidden Comfort Quarter</li>
              <li>Enduro V-Tech Quarter</li>
              <li>Blister Resist No-Show</li>
            </ul>
          </div>
        </div>
      `
    },
    'socks-jogology': {
      leftImg: '/image/logos/jogology-logo.webp',
      rightImg: '/image/socks/no-show-jocology.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-sport">Performance</span>
          <h2>Jogology Running Socks</h2>
          <div class="features">
            <span class="feature-tag">🌬️ Breathable Mesh</span>
            <span class="feature-tag">🎯 Arch Support</span>
            <span class="feature-tag">🔒 No-Slip Heel</span>
          </div>
          <p class="description">Technical running sock with strategic mesh zones and targeted arch compression for a locked-in feel.</p>
          <div class="specs">
            <div class="spec-item"><strong>Type:</strong> No-Show</div>
            <div class="spec-item"><strong>Support:</strong> High Arch</div>
            <div class="spec-item"><strong>Grip:</strong> Silicone Heel</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Our Jogology Selection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>No-Show Tab Performance</li>
              <li>Quarter Crew Sport</li>
              <li>Ankle Performance</li>
            </ul>
          </div>
        </div>
      `
    },
    'socks-dttab': {
      leftImg: '/image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
      rightImg: '/image/socks/no-show-tab-darn-tough.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge">Premium</span>
          <h2>Darn Tough No-Show Tab</h2>
          <div class="features">
            <span class="feature-tag">💎 Premium Build</span>
            <span class="feature-tag">🏃 Ultra Lightweight</span>
            <span class="feature-tag">🛡️ Blister-Free</span>
          </div>
          <p class="description">The perfect invisible sock. High-density knit and precision fit mean no blisters, ever.</p>
          <div class="specs">
            <div class="spec-item"><strong>Knit:</strong> High-Density</div>
            <div class="spec-item"><strong>Feel:</strong> Ultra Light</div>
            <div class="spec-item"><strong>Guarantee:</strong> Lifetime</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>No-Show Collection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>No-Show Tab Light Cushion</li>
              <li>No-Show Tab Ultra-Light</li>
              <li>Low Cut Tab Cushion</li>
            </ul>
          </div>
        </div>
      `
    },

    // COLD WEATHER ACCESSORIES (Page 2)
    'cold-balega': {
      leftImg: '/image/socks/balega-hidden-comfort.jpg',
      rightImg: '/image/accessories/gloves.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-winter">Winter Ready</span>
          <h2>Running Gloves</h2>
          <div class="features">
            <span class="feature-tag">🧤 Touch Screen Compatible</span>
            <span class="feature-tag">💨 Wind Resistant</span>
            <span class="feature-tag">🔥 Thermal Lining</span>
          </div>
          <p class="description">Keep your hands warm without overheating. Touch-screen compatible fingers let you control devices without removing gloves.</p>
          <div class="specs">
            <div class="spec-item"><strong>Material:</strong> Fleece Lined</div>
            <div class="spec-item"><strong>Temperature:</strong> 20-40°F</div>
            <div class="spec-item"><strong>Reflective:</strong> Yes</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Cold Weather Essentials</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>Lightweight Running Gloves</li>
              <li>Thermal Fleece Gloves</li>
              <li>Convertible Mittens</li>
              <li>Windproof Shell Gloves</li>
            </ul>
          </div>
        </div>
      `
    },
    'cold-darntough': {
      leftImg: '/image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
      rightImg: '/image/accessories/headband.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-winter">Winter Ready</span>
          <h2>Ear Warmers & Headbands</h2>
          <div class="features">
            <span class="feature-tag">👂 Ear Coverage</span>
            <span class="feature-tag">💨 Moisture Wicking</span>
            <span class="feature-tag">🎯 Stay-Put Fit</span>
          </div>
          <p class="description">Protect your ears from wind and cold without overheating. Moisture-wicking fabric keeps you comfortable mile after mile.</p>
          <div class="specs">
            <div class="spec-item"><strong>Material:</strong> Performance Fleece</div>
            <div class="spec-item"><strong>Width:</strong> 3-4 inches</div>
            <div class="spec-item"><strong>Reflective:</strong> Available</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Head & Ear Protection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>Thermal Headbands</li>
              <li>Ponytail Ear Warmers</li>
              <li>Windproof Ear Covers</li>
              <li>Reflective Headbands</li>
            </ul>
          </div>
        </div>
      `
    },
    'cold-jogology': {
      leftImg: '/image/socks/no-show-jocology.jpg',
      rightImg: '/image/accessories/beanie.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-winter">Winter Ready</span>
          <h2>Running Beanies</h2>
          <div class="features">
            <span class="feature-tag">🎩 Thermal Insulation</span>
            <span class="feature-tag">💨 Breathable</span>
            <span class="feature-tag">✨ Moisture Management</span>
          </div>
          <p class="description">Lightweight thermal beanies that regulate temperature. Won't slide or bounce during your run.</p>
          <div class="specs">
            <div class="spec-item"><strong>Material:</strong> Merino Blend</div>
            <div class="spec-item"><strong>Fit:</strong> Snug, Non-Slip</div>
            <div class="spec-item"><strong>Temperature:</strong> 15-35°F</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Beanie Collection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>Lightweight Performance Beanies</li>
              <li>Thermal Skull Caps</li>
              <li>Ponytail Beanies</li>
              <li>Windproof Running Hats</li>
            </ul>
          </div>
        </div>
      `
    },
    'cold-dttab': {
      leftImg: '/image/socks/no-show-tab-darn-tough.jpg',
      rightImg: '/image/accessories/neck-gaiter.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-winter">Winter Ready</span>
          <h2>Neck Gaiters & Buffs</h2>
          <div class="features">
            <span class="feature-tag">🧣 Versatile Coverage</span>
            <span class="feature-tag">💨 Wind Protection</span>
            <span class="feature-tag">😮‍💨 Breathable Fabric</span>
          </div>
          <p class="description">Multi-functional neck protection. Wear as neck warmer, face mask, headband, or beanie. Blocks wind without restricting breathing.</p>
          <div class="specs">
            <div class="spec-item"><strong>Material:</strong> Micro-Fleece</div>
            <div class="spec-item"><strong>Uses:</strong> 12+ Ways</div>
            <div class="spec-item"><strong>Reflective:</strong> Available</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Neck & Face Protection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>Lightweight Neck Gaiters</li>
              <li>Thermal Fleece Buffs</li>
              <li>Windproof Face Masks</li>
              <li>Multi-Use Neck Warmers</li>
            </ul>
          </div>
        </div>
      `
    },

    // JACKETS (Page 4) - Using generic defaults, update with actual products
    'jackets-balega': {
      leftImg: '/image/socks/balega-hidden-comfort.jpg',
      rightImg: '/image/jackets/windbreaker.jpg',
      leftText: `
        <div class="product-detail">
          <span class="badge badge-active">Performance</span>
          <h2>Windbreaker Jackets</h2>
          <div class="features">
            <span class="feature-tag">💨 Wind Resistant</span>
            <span class="feature-tag">💧 Water Repellent</span>
            <span class="feature-tag">📦 Packable</span>
          </div>
          <p class="description">Lightweight protection from wind and light rain. Packs into its own pocket for easy carrying.</p>
          <div class="specs">
            <div class="spec-item"><strong>Weight:</strong> 4-6 oz</div>
            <div class="spec-item"><strong>Packable:</strong> Yes</div>
            <div class="spec-item"><strong>Breathability:</strong> High</div>
          </div>
        </div>
      `,
      rightText: `
        <div class="product-detail">
          <h2>Jacket Collection</h2>
          <div class="carry-section">
            <h3>🏪 We Carry:</h3>
            <ul class="carry-list">
              <li>Lightweight Windbreakers</li>
              <li>Packable Running Jackets</li>
              <li>Reflective Night Jackets</li>
              <li>All-Weather Shell</li>
            </ul>
          </div>
        </div>
      `
    },

    // Add more categories as needed...
    // For now, creating fallback entries
    'jackets-darntough': { leftImg: '/image/socks/micro-crew-ultra-lightweight-darn tough.jpg', rightImg: '', leftText: '<div class="product-detail"><h2>Jackets</h2><p>Product details coming soon...</p></div>', rightText: '<div class="product-detail"><h2>Coming Soon</h2></div>' },
    'jackets-jogology': { leftImg: '/image/socks/no-show-jocology.jpg', rightImg: '', leftText: '<div class="product-detail"><h2>Jackets</h2><p>Product details coming soon...</p></div>', rightText: '<div class="product-detail"><h2>Coming Soon</h2></div>' },
    'jackets-dttab': { leftImg: '/image/socks/no-show-tab-darn-tough.jpg', rightImg: '', leftText: '<div class="product-detail"><h2>Jackets</h2><p>Product details coming soon...</p></div>', rightText: '<div class="product-detail"><h2>Coming Soon</h2></div>' },
  };

  let isAnimating = false;

  // Detect which page/category we're on
  function getCurrentCategory() {
    const pages = document.querySelectorAll('.page');
    for (const page of pages) {
      if (page.classList.contains('active') || page.style.display !== 'none') {
        const title = page.getAttribute('data-title') || '';
        const h2 = page.querySelector('h2')?.textContent || '';
        
        if (h2.includes('Running Socks')) return 'socks';
        if (h2.includes('Cold Weather')) return 'cold';
        if (h2.includes('Jackets')) return 'jackets';
        if (h2.includes('Warm Layers')) return 'layers';
        if (h2.includes('Nutrition')) return 'nutrition';
        if (h2.includes('Electronics')) return 'electronics';
        if (h2.includes('Lululemon')) return 'lululemon';
        if (h2.includes('Rabbit')) return 'rabbit';
        if (h2.includes('Injury Prevention')) return 'injury';
      }
    }
    return 'socks'; // default
  }

  function populateAndOpen({ leftSrc, rightSrc, leftHTML, rightHTML }) {
    if (isAnimating) return;
    isAnimating = true;

    leftImg.src = leftSrc || '';
    rightImg.src = rightSrc || '';
    leftBack.innerHTML = leftHTML || '';
    rightBack.innerHTML = rightHTML || '';

    leftCard.classList.remove('is-flipped');
    rightCard.classList.remove('is-flipped');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    setTimeout(() => {
      modal.classList.add('is-animating');
      setTimeout(() => {
        isAnimating = false;
        leftCard.style.animation = 'hint-flip 0.6s ease 1.2s';
        setTimeout(() => { leftCard.style.animation = ''; }, 1800);
      }, 400);
    }, 50);

    closeBtn?.focus({ preventScroll: true });
  }

  function openFromTile(tile) {
    const itemKey = tile.dataset.item;
    const category = getCurrentCategory();
    const productKey = `${category}-${itemKey}`;

    console.log('[modal] Looking for:', productKey);

    const prod = PRODUCTS[productKey];

    if (prod) {
      populateAndOpen({
        leftSrc: prod.leftImg,
        rightSrc: prod.rightImg,
        leftHTML: prod.leftText,
        rightHTML: prod.rightText
      });
      console.debug('[modal] Opened:', productKey);
      return;
    }

    // Fallback
    const imgEl = tile.querySelector('img');
    const tileSrc = imgEl?.getAttribute('src') || '';
    const alt = imgEl?.getAttribute('alt') || 'Product';

    populateAndOpen({
      leftSrc: tileSrc,
      rightSrc: tileSrc,
      leftHTML: `
        <div class="product-detail">
          <span class="badge badge-default">Coming Soon</span>
          <h2>${alt}</h2>
          <p class="description">Product details for ${category} - ${itemKey} coming soon. Add to PRODUCTS object in modal.js.</p>
          <div class="specs">
            <div class="spec-item"><strong>Key:</strong> <code>${productKey}</code></div>
            <div class="spec-item"><strong>Status:</strong> Needs Configuration</div>
          </div>
        </div>
      `,
      rightHTML: `<div class="product-detail"><h2>Add Details</h2><p>Configure <code>${productKey}</code> in PRODUCTS</p></div>`
    });

    console.warn('[modal] No mapping for:', productKey);
  }

  document.addEventListener('click', (e) => {
    const tile = e.target.closest?.('.gear-tile');
    if (!tile) return;

    e.preventDefault();
    e.stopPropagation();

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = tile.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    tile.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);

    openFromTile(tile);
  }, { capture: true });

  function flipCard(card) {
    if (isAnimating) return;
    card.classList.toggle('is-flipped');
  }

  leftCard.addEventListener('click', (e) => {
    e.stopPropagation();
    flipCard(leftCard);
  });

  rightCard.addEventListener('click', (e) => {
    e.stopPropagation();
    flipCard(rightCard);
  });

  function closeModal() {
    if (isAnimating) return;
    
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;

    switch(e.key) {
      case 'Escape':
        closeModal();
        break;
      case '1':
        flipCard(leftCard);
        break;
      case '2':
        flipCard(rightCard);
        break;
      case 'f':
      case 'F':
        leftCard.classList.toggle('is-flipped');
        rightCard.classList.toggle('is-flipped');
        break;
      case 'ArrowLeft':
        if (rightCard.classList.contains('is-flipped')) {
          rightCard.classList.remove('is-flipped');
        }
        leftCard.classList.add('is-flipped');
        break;
      case 'ArrowRight':
        if (leftCard.classList.contains('is-flipped')) {
          leftCard.classList.remove('is-flipped');
        }
        rightCard.classList.add('is-flipped');
        break;
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    /* Card flip mechanics */
    .modal__cardInner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform-style: preserve-3d;
      cursor: pointer;
    }
    
    .modal__cardInner.is-flipped {
      transform: rotateY(180deg);
    }
    
    .modal__cardInner:hover {
      transform: scale(1.02);
    }
    
    .modal__cardInner.is-flipped:hover {
      transform: rotateY(180deg) scale(1.02);
    }
    
    .modal__face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: 12px;
      overflow: hidden;
    }
    
    .modal__face--front {
      z-index: 2;
      background: #fff;
    }
    
    .modal__face--front img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    
    .modal__face--back {
      transform: rotateY(180deg);
      background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
      overflow-y: auto;
    }
    
    .modal__backInner {
      height: 100%;
      overflow-y: auto;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple-effect 0.6s ease-out;
      pointer-events: none;
      z-index: 100;
    }
    
    @keyframes ripple-effect {
      to {
        transform: translate(-50%, -50%) scale(15);
        opacity: 0;
      }
    }
    
    @keyframes hint-flip {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(12deg); }
    }
    
    .product-detail {
      padding: 1.5rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .badge {
      display: inline-block;
      padding: 0.35rem 0.8rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      width: fit-content;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }
    
    .badge-new {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .badge-sport {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    
    .badge-winter {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      color: #333;
    }
    
    .badge-active {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: #333;
    }
    
    .badge-default {
      background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
    }
    
    .product-detail h2 {
      margin: 0.5rem 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.3;
    }
    
    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.5rem 0;
    }
    
    .feature-tag {
      padding: 0.4rem 0.8rem;
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.2);
      border-radius: 12px;
      font-size: 0.8rem;
      color: #667eea;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .feature-tag:hover {
      background: rgba(102, 126, 234, 0.2);
      transform: translateY(-2px);
    }
    
    .description {
      flex: 1;
      line-height: 1.6;
      color: #555;
      font-size: 0.95rem;
    }
    
    .specs {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .spec-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: #666;
    }
    
    .spec-item strong {
      color: #333;
      font-weight: 600;
    }
    
    code {
      background: #f5f5f5;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
      color: #d63384;
    }
    
    .gear-tile {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .gear-tile:hover {
      transform: scale(1.02);
    }
    
    .carry-section {
      margin-top: 1rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      border-radius: 12px;
      border-left: 3px solid #667eea;
    }
    
    .carry-section h3 {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      font-weight: 700;
      color: #667eea;
    }
    
    .carry-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    
    .carry-list li {
      padding: 0.6rem 0.75rem;
      background: white;
      border-radius: 8px;
      font-size: 0.9rem;
      color: #333;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: relative;
      padding-left: 2rem;
      transition: all 0.2s ease;
    }
    
    .carry-list li:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transform: translateX(3px);
    }
    
    .carry-list li:before {
      content: '✓';
      position: absolute;
      left: 0.75rem;
      color: #667eea;
      font-weight: bold;
      font-size: 1.1em;
    }
  `;
  document.head.appendChild(style);

  const tiles = document.querySelectorAll('.gear-tile');
  console.log(`[modal] Ready! ${tiles.length} tiles detected`);
  console.log('[modal] Click cards to flip | F=flip both | 1/2=individual | ESC=close');
});