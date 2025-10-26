console.log('[modal.js] Loading...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('[modal.js] DOM ready');
  
  const modal = document.getElementById('gearModal');
  if (!modal) {
    console.error('[modal] Modal not found!');
    return;
  }

  const overlay   = modal.querySelector('.modal__backdrop');
  const closeBtn  = modal.querySelector('.modal__close');
  const leftCard  = document.getElementById('gmCardLeft');
  const rightCard = document.getElementById('gmCardRight');
  const leftImg   = document.getElementById('gmImgLeft');
  const rightImg  = document.getElementById('gmImgRight');
  const leftBack  = document.getElementById('gmBackLeft');
  const rightBack = document.getElementById('gmBackRight');

  // ==========================
  // PRODUCTS
  // ==========================
 const PRODUCTS = {
  // ========= SOCKS (verbatim) =========
  
  'socks-darntough': {
    leftImg: 'image/logos/1-balega-logo-1.jpg',
    rightImg: 'image/socks/balega-hidden-comfort.jpg',
    leftText: `
     <div class="product-detail">
        <span class="badge">Premium</span>
        <h2>Balega</h2>
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
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Run</summary>
          <ul>
            <li>No Show Tab Ultra-LightWeight</li>
            <li>No Show Tab Ultra-Lightweight-with Cushion</li>
            <li>1/4 sock Ultra-Lightweight with Cushion</li>
            
          </ul>
        </details>
        <details class="dropdown">
          <summary>LifeStyle</summary>
          <ul>
            <li>Crew Lightweight</li>
            <li>Crew Lightweight with Cushion</li>
           
          </ul>
        </details>
        <details class="dropdown">
          <summary>Hike</summary>
          <ul>
            <li>Boot Sock Midweight with Cushion</li>
            <li>Micro Crew Lightweigth with Cushion</li>
            
          </ul>
        </details>
      </div>
    `
  },
  'socks-jogology': {
    leftImg: 'image/logos/jogology-logo.webp',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
     <div class="product-detail">
        <span class="badge">Premium</span>
        <h2>Jocology Socks</h2>
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
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Jocology</summary>
          <ul>
                   <li>No Show Ultra Light</li>
            <li>Crew</li>
         
          </ul>
        </details>
      
      </div>
    `
  },
  'socks-dttab': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
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
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Balega Socks</summary>
          <ul>
            <li>Hidden Comfort</li>
            <li>Enduro 1/4</li>
            <li>Enduro Crew</li>
            <li>Silver Crew</li>
          </ul>
        </details>
       
      </div>
    `
  },

  // ========= COLD WEATHER =========
  'head-bands': {
    leftImg: 'image/warm-winter/cep/cep-cold-headband.webp',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn%20tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Winter</span>
        <h2>Thermal Headbands</h2>
        <div class="features">
          <span class="feature-tag">❄️ Warm</span>
          <span class="feature-tag">🧵 Soft Interior</span>
          <span class="feature-tag">🏃‍♂️ No-Slip Fit</span>
        </div>
        <p class="description">Keep your ears warm without overheating — perfect for cold runs and brisk mornings.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <details class="dropdown">
          <summary>North Face</summary>
          <ul>
            <li>Base Headband</li>
            <li>Cold Weather Handband</li>
         
          </ul>
        </details>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Luxe Thermal Headband</li>
               
            
          </ul>
        </details>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Luxe Thermal Headband</li>
            
          </ul>
        </details>
      </div>
    `
  },
  'beanies': {
    leftImg: 'image/warm-winter/brooks/brooks-beanie.webp',
    rightImg: 'image/warm-winter/brooks/brooks-beanie.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge">Winter</span>
        <h2>Running Beanies</h2>
        <div class="features">
          <span class="feature-tag">🧣 Cozy</span>
          <span class="feature-tag">🫧 Breathable</span>
          <span class="feature-tag">🌫️ Wind-Resistant</span>
        </div>
        <p class="description">Lightweight, moisture-wicking warmth without bulk.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Our Hats</h2>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Notch Thermal Beanie</li>
            
          </ul>
        </details>
        <details class="dropdown">
          <summary>Cep</summary>
          <ul>
            <li>Hidden Gap for Ponytal</li>
           
          </ul>
        </details>
        <details class="dropdown">
          <summary>North face</summary>
          <ul>
            <li>Base Beanie</li>
            <li>Fairisle Beanie</li>
            <li>W Oh Mega Pom BNE</li>
            <li>Item 4</li>
          </ul>
        </details>
         <details class="dropdown">
          <summary>Headsweats</summary>
          <ul>
            <li>Fleet Feet Alpine </li>
            <li>Fleet Feet Alpine Reversible Beanie</li>
            
          </ul>
        </details>
         <details class="dropdown">
          <summary>Karitraa</summary>
          <ul>
            <li>Sundve Beanie</li>
            
          </ul>
        </details>
      </div>
    `
  },
  'gloves': {
    leftImg: 'image/warm-winter/north/Etip-Recycled-Gloves.avif',
    rightImg: 'image/warm-winter/north/Etip-Recycled-Gloves.avif',
    leftText: `
      <div class="product-detail">
        <span class="badge">Winter</span>
        <h2>Running Gloves</h2>
        <div class="features">
          <span class="feature-tag">📱 Touchscreen</span>
          <span class="feature-tag">💨 Wind Resistant</span>
          <span class="feature-tag">🧤 Thermal Lining</span>
        </div>
        <p class="description">Stay warm and connected on cold miles.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>CEP</summary>
          <ul>
            <li>Pro Run Gloves 2 in 1 </li>
            <li>Core Run Thermal Gloves</li>
            
          </ul>
        </details>
        <details class="dropdown">
          <summary>North Face</summary>
          <ul>
            <li>ETIP Trail Glove</li>
            <li>Shelbe Raschel Etip Mitt</li>
            <li>Etip TRail Glove</li>
          
          </ul>
        </details>
        <details class="dropdown">
          <summary>Brooks</summary>
          <ul>
            <li>Fusion Midweight Glove 2.0</li>
            <li>Shield Lobster Glove 2.0</li>
            
          </ul>
        </details>
      </div>
    `
  },

  // ========= JACKETS =========
  'jackets-nb': {
    leftImg: 'image/warm-winter/cep/cep-cold-headband.webp',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn%20tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Outerwear</span>
        <h2>New Balance Jackets</h2>
        <p class="description">Weather-resistant performance for all conditions.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Jacket 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Jacket 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Jacket 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'jackets-saucony': {
    leftImg: 'image/warm-winter/brooks/brooks-beanie.webp',
    rightImg: 'image/warm-winter/brooks/brooks-beanie.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge">Outerwear</span>
        <h2>Saucony Jackets</h2>
        <p class="description">Lightweight protection for fast-paced runs.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Jacket 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Jacket 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Jacket 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'jackets-brooks': {
    leftImg: 'image/warm-winter/north/Etip-Recycled-Gloves.avif',
    rightImg: 'image/warm-winter/north/Etip-Recycled-Gloves.avif',
    leftText: `
      <div class="product-detail">
        <span class="badge">Outerwear</span>
        <h2>Brooks Jackets</h2>
        <p class="description">Reliable weather protection for serious runners.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Jacket 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Jacket 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Jacket 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= WARM LAYERS =========
  'warm-thermal': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Layers</span>
        <h2>Thermal Base Layers</h2>
        <p class="description">Insulating warmth for cold weather training.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Layer 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Layer 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Layer 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'warm-fleece': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Layers</span>
        <h2>Fleece Mid-Layers</h2>
        <p class="description">Soft, breathable warmth for active comfort.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Fleece 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Fleece 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Fleece 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'warm-ls': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Layers</span>
        <h2>Long Sleeve Tops</h2>
        <p class="description">Versatile layering for variable conditions.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Top 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Top 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Top 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= NUTRITION =========
  'nutrition-hydration': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Fuel</span>
        <h2>Hydration</h2>
        <p class="description">Stay fueled and hydrated on the move.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Option 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Option 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Option 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'nutrition-bars': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Fuel</span>
        <h2>Energy Bars</h2>
        <p class="description">Convenient nutrition for training and racing.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Bar 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Bar 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Bar 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'nutrition-recovery': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Fuel</span>
        <h2>Recovery Nutrition</h2>
        <p class="description">Post-run fuel for optimal recovery.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Recovery 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Recovery 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Recovery 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= ELECTRONICS =========
  'elec-headphones': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Tech</span>
        <h2>Headphones</h2>
        <p class="description">Wireless audio for distraction-free miles.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Shokz</summary>
          <ul>
            <li>Open Move</li>
            <li>Open Pro 2</li>
            <li>Open Fit</li>
            <li>Open Swim</li>
          </ul>
        </details>
       
      </div>
    `
  },
  'elec-lights': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Tech</span>
        <h2>Running Lights</h2>
        <p class="description">Stay visible during early morning or evening runs.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Garmin</summary>
          <ul>
            <li>Forerunner 165 Music</li>
            <li>Forerunner 265s</li>
          
          </ul>
        </details>
        
       
      </div>
    `
  },
  'elec-watches': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Tech</span>
        <h2>GPS Watches</h2>
        <p class="description">Track your performance with precision.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Thera</summary>
          <ul>
            <li>Thera Gun Mini</li>
            <li>Thera Gun Prime</li>
            
          </ul>
        </details>
       
      </div>
    `
  },

  // ========= LULULEMON =========
  'lulu-bottoms': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Apparel</span>
        <h2>Bottoms</h2>
        <p class="description">High-performance tights and shorts.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Bottom 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Bottom 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Bottom 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'lulu-accessories': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Apparel</span>
        <h2>Accessories</h2>
        <p class="description">Essential add-ons for every workout.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Accessory 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Accessory 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Accessory 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'lulu-outerwear': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Apparel</span>
        <h2>Outerwear</h2>
        <p class="description">Weather-ready layers for urban miles.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Outerwear 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Outerwear 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Outerwear 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= RABBIT =========
  'rabbit-tops': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Rabbit</span>
        <h2>Tops</h2>
        <p class="description">Feathery soft, runner-made essentials.</p>
      </div>
    `,
    rightText: `
       <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Top 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Top 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Top 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'rabbit-gear': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Rabbit</span>
        <h2>Gear</h2>
        <p class="description">Shorts, caps, and go-fast accessories.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Gear 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Gear 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Gear 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'rabbit-accessories': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Rabbit</span>
        <h2>Accessories</h2>
        <p class="description">Everyday run add-ons that work hard.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Accessory 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Accessory 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Accessory 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= INJURY PREVENTION =========
  'injury-massage': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Recovery</span>
        <h2>Massage Tools</h2>
        <p class="description">Rollers and percussion for sore spots.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Tool 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Tool 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Tool 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'injury-compression': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Recovery</span>
        <h2>Compression</h2>
        <p class="description">Targeted support for calves and ankles.</p>
      </div>
    `,
    rightText: `
       <div class="product-detail">
        <h2>Picks</h2>
        <details class="dropdown">
          <summary>Compression 1</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Compression 2</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
        <details class="dropdown">
          <summary>Compression 3</summary>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </details>
      </div>
    `
  },
  'injury-super-feet': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Recovery</span>
        <h2>Super Feet</h2>
        <p class="description">Work smarter between sessions.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <details class="dropdown">
          <summary>Super Feet We Carry</summary>
          <ul class="carry-list">
            <li>Green</li>
            <li>Pink</li>
            <li>Blue</li>
            <li>Orange</li>
            <li>Dynamic</li>
            <li>Green Hiking</li>
            <li>Hiking Pink</li>
            <li>Copper</li>
            <li>Grey</li>
          </ul>
        </details>
      </div>
    `
  },

  // ========= FALLBACK =========
  default: {
    leftImg: 'image/logos/darn-tough-2.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `<div class="product-detail"><h2>Featured Product</h2></div>`,
    rightText: `<div class="product-detail"><h2>Visit Us</h2></div>`
  }
};

  // ==========================
  // PAGE-SCOPED ITEM MAP (all 9 pages)
  // ==========================
  const ITEM_MAP = {
    'Running Socks': {
      darntough: 'socks-darntough',
      jogology:  'socks-jogology',
      dttab:     'socks-dttab',
    },
    'Cold Weather': {
      'head-bands': 'head-bands',
      beanies:      'beanies',
      gloves:       'gloves',
    },
    'Jackets': {
      darntough: 'jackets-nb',
      jogology:  'jackets-saucony',
      dttab:     'jackets-brooks',
    },
    'Warm Layers': {
      darntough: 'warm-thermal',
      jogology:  'warm-fleece',
      dttab:     'warm-ls',
    },
    'Nutrition': {
      darntough: 'nutrition-hydration',
      jogology:  'nutrition-bars',
      dttab:     'nutrition-recovery',
    },
    'Electronics': {
      darntough: 'elec-headphones',
      jogology:  'elec-lights',
      dttab:     'elec-watches',
    },
    'Lululemon': {
      darntough: 'lulu-bottoms',
      jogology:  'lulu-accessories',
      dttab:     'lulu-outerwear',
    },
    'Rabbit': {
      darntough: 'rabbit-tops',
      jogology:  'rabbit-gear',
      dttab:     'rabbit-accessories',
    },
    'Injury Prevention': {
      darntough: 'injury-massage',
      jogology:  'injury-compression',
      dttab:     'injury-super-feet',
    },
  };

  // ==========================
  // Modal open/close
  // ==========================
  function openModal(productKey) {
    console.log('[modal] Opening:', productKey);
    const data = PRODUCTS[productKey] || PRODUCTS.default;
    
    if (leftImg)  leftImg.src  = data.leftImg;
    if (rightImg) rightImg.src = data.rightImg;
    if (leftBack)  leftBack.innerHTML  = data.leftText;
    if (rightBack) rightBack.innerHTML = data.rightText;
    
    if (leftCard)  leftCard.classList.remove('is-flipped');
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
  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });
  if (overlay) overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // ==========================
  // Card flip (with guard to ignore dropdown area)
  // ==========================
  function setupCardFlip(card) {
    if (!card) return;
    card.addEventListener('click', (e) => {
      // If click originated inside product-detail (dropdowns, labels, etc.), ignore
      if (e.target.closest('.product-detail')) return;
      e.stopPropagation();
      card.classList.toggle('is-flipped');
    });
  }
  setupCardFlip(leftCard);
  setupCardFlip(rightCard);

  // ==========================
  // Tile listeners (mobile + desktop)
  // ==========================
  function attachTileListeners() {
    const tiles = document.querySelectorAll('.gear-tile');
    console.log('[modal] Found tiles:', tiles.length);
    
    tiles.forEach((tile) => {
      const page = tile.closest('.page');
      const pageTitle = page ? (page.getAttribute('data-title') || '').trim() : '';
      const item = tile.getAttribute('data-item');

      // Resolve via page map → raw item → default
      const sectionMap = ITEM_MAP[pageTitle] || {};
      let productKey = sectionMap[item] || item;
      if (!PRODUCTS[productKey]) {
        console.warn('[modal] No PRODUCT for key:', productKey, '(page:', pageTitle, 'item:', item, ') — using default');
        productKey = 'default';
      }

      tile.dataset.modalProduct = productKey; // for debugging

      // Mobile: capture taps
      tile.addEventListener('touchstart', (e) => {
        const now = Date.now();
        tile.dataset.touchStartTime = now.toString();
        tile.dataset.touchStartX = e.touches[0].clientX.toString();
        tile.dataset.touchStartY = e.touches[0].clientY.toString();
      }, { capture: true, passive: true });
      
      tile.addEventListener('touchend', (e) => {
        if (!tile.dataset.touchStartTime) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openModal(productKey);
          return;
        }
        const startTime = parseInt(tile.dataset.touchStartTime, 10);
        const startX = parseFloat(tile.dataset.touchStartX);
        const startY = parseFloat(tile.dataset.touchStartY);
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const duration = Date.now() - startTime;
        const distance = Math.hypot(endX - startX, endY - startY);

        if (duration < 800 && distance < 50) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          openModal(productKey);
        }

        delete tile.dataset.touchStartTime;
        delete tile.dataset.touchStartX;
        delete tile.dataset.touchStartY;
      }, { capture: true, passive: false });

      // Desktop click (guard against clicks inside an embedded product-detail)
      tile.addEventListener('click', (e) => {
        if (e.target.closest('.product-detail')) return;
        e.stopPropagation();
        openModal(productKey);
      });
    });
    
    console.log('[modal] Listeners attached');
  }

  // Delay to allow other scripts to attach
  setTimeout(attachTileListeners, 200);

  // ==========================
  // Delegated guards inside modal (capture)
  // - Prevent dropdown/label interactions from bubbling to flips or tiles
  // - Works for dynamically-inserted content (via innerHTML)
  // ==========================
  (function installModalGuards() {
    const SAFE_SELECTOR = '.product-detail, .product-detail *';
    const stopEvents = [
      'click',
      'mousedown','mouseup',
      'pointerdown','pointerup',
      'touchstart','touchend',
      'keydown','keyup'
    ];
    stopEvents.forEach(evt => {
      modal.addEventListener(evt, (e) => {
        if (e.target.closest(SAFE_SELECTOR)) {
          // Contain event without breaking native control behavior
          e.stopPropagation();
          e.stopImmediatePropagation?.();
        }
      }, { capture: true, passive: evt.startsWith('touch') ? true : false });
    });
  })();

  console.log('[modal] Setup complete');
});
