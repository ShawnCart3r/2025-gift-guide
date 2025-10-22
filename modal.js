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
  // ============================================
  // PAGE 1: RUNNING SOCKS
  // ============================================
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

  // ============================================
  // PAGE 2: COLD WEATHER ACCESSORIES
  // ============================================
  'cold-balega': {
    leftImg: 'image/warm-winter/brooks/brooks-beanie.webp',
    rightImg: 'image/warm-winter/brooks/brooks-beanie.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-winter">Winter Ready</span>
        <h2>Running Beanies</h2>
        <p class="description">Keep your head warm on cold runs.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Brooks Beanies</h2>
        <ul class="carry-list">
          <li>Lightweight Running Beanie</li>
          <li>Thermal Fleece Beanie</li>
        </ul>
      </div>
    `
  },

  'cold-darntough': {
    leftImg: 'image/warm-winter/cep/cep-cold-headband.webp',
    rightImg: 'image/warm-winter/cep/cep-cold-headband.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-winter">Winter Ready</span>
        <h2>Running Headbands</h2>
        <p class="description">Ear protection without the bulk.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>CEP Headbands</h2>
        <ul class="carry-list">
          <li>Cold Weather Headband</li>
          <li>Reflective Headband</li>
        </ul>
      </div>
    `
  },

  'cold-jogology': {
    leftImg: 'image/warm-winter/north/Summit-Series-DOTKNIT-Balaclava.avif',
    rightImg: 'image/warm-winter/north/Summit-Series-DOTKNIT-Balaclava.avif',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-winter">Extreme Cold</span>
        <h2>Balaclavas</h2>
        <p class="description">Maximum protection for harsh conditions.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>The North Face Balaclavas</h2>
        <ul class="carry-list">
          <li>Summit Series DOTKNIT Balaclava</li>
          <li>Winter Running Balaclava</li>
        </ul>
      </div>
    `
  },

  'cold-dttab': {
    leftImg: 'image/warm-winter/north/Etip-Recycled-Gloves.avif',
    rightImg: 'image/warm-winter/north/Etip-Recycled-Gloves.avif',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-winter">Winter Ready</span>
        <h2>Running Gloves</h2>
        <p class="description">Keep your hands warm and functional.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>The North Face Gloves</h2>
        <ul class="carry-list">
          <li>Etip Recycled Gloves</li>
          <li>Lightweight Running Gloves</li>
          <li>Thermal Fleece Gloves</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // PAGE 3: JACKETS
  // ============================================
  'jackets-balega': {
    leftImg: 'image/logos/brooks-logo.png',
    rightImg: 'image/logos/brooks-logo.png',
    leftText: `
      <div class="product-detail">
        <span class="badge">Windproof</span>
        <h2>Brooks Windbreakers</h2>
        <p class="description">Lightweight protection from wind and light rain.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Brooks Windbreaker Collection</h2>
        <ul class="carry-list">
          <li>Canopy Jacket</li>
          <li>Shield Hybrid Jacket</li>
        </ul>
      </div>
    `
  },

  'jackets-darntough': {
    leftImg: 'image/logos/New-Balance-Logo-1.png',
    rightImg: 'image/logos/New-Balance-Logo-1.png',
    leftText: `
      <div class="product-detail">
        <span class="badge">All-Weather</span>
        <h2>New Balance Running Jackets</h2>
        <p class="description">Technical jackets for serious runners.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>New Balance Jacket Collection</h2>
        <ul class="carry-list">
          <li>Impact Run Jacket</li>
          <li>Q Speed Running Jacket</li>
        </ul>
      </div>
    `
  },

  'jackets-jogology': {
    leftImg: 'image/logos/saucony-logo.png',
    rightImg: 'image/logos/saucony-logo.png',
    leftText: `
      <div class="product-detail">
        <span class="badge">Waterproof</span>
        <h2>Saucony Rain Shells</h2>
        <p class="description">Stay dry in any weather.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Saucony Shell Collection</h2>
        <ul class="carry-list">
          <li>Vitarun Rain Jacket</li>
          <li>Packable Shell</li>
        </ul>
      </div>
    `
  },

  'jackets-dttab': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Versatile</span>
        <h2>Running Vests</h2>
        <p class="description">Core warmth without restricting arm movement.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Running Vest Collection</h2>
        <ul class="carry-list">
          <li>Insulated Vests</li>
          <li>Windproof Vests</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // PAGE 4: WARM LAYERS
  // ============================================
  'layers-balega': {
    leftImg: 'image/socks/balega-hidden-comfort.jpg',
    rightImg: 'image/socks/balega-hidden-comfort.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-winter">Base Layer</span>
        <h2>Base Layers</h2>
        <p class="description">Foundation for cold weather running.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Base Layer Selection</h2>
        <ul class="carry-list">
          <li>Merino Wool Base Layers</li>
          <li>Synthetic Base Layers</li>
        </ul>
      </div>
    `
  },

  'layers-darntough': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-winter">Thermal</span>
        <h2>Thermal Tops</h2>
        <p class="description">Extra warmth for the coldest days.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Thermal Top Collection</h2>
        <ul class="carry-list">
          <li>Half-Zip Thermal</li>
          <li>Crew Neck Thermal</li>
        </ul>
      </div>
    `
  },

  'layers-jogology': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-winter">Fleece</span>
        <h2>Fleece Layers</h2>
        <p class="description">Cozy mid-layer warmth.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Fleece Collection</h2>
        <ul class="carry-list">
          <li>Quarter-Zip Fleece</li>
          <li>Full-Zip Fleece</li>
        </ul>
      </div>
    `
  },

  'layers-dttab': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge">Versatile</span>
        <h2>Long Sleeve Shirts</h2>
        <p class="description">Essential year-round running tops.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Long Sleeve Selection</h2>
        <ul class="carry-list">
          <li>Technical Long Sleeves</li>
          <li>Thermal Long Sleeves</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // PAGE 5: NUTRITION
  // ============================================
  'nutrition-balega': {
    leftImg: 'image/nutrition/birthday.webp',
    rightImg: 'image/nutrition/birthday.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Energy</span>
        <h2>Energy Gels</h2>
        <p class="description">Quick fuel for long runs.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Energy Gel Selection</h2>
        <ul class="carry-list">
          <li>GU Energy Gels</li>
          <li>Maurten Gels</li>
          <li>Honey Stinger Gels</li>
        </ul>
      </div>
    `
  },

  'nutrition-darntough': {
    leftImg: 'image/nutrition/honey-chews.webp',
    rightImg: 'image/nutrition/honey-chews.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Hydration</span>
        <h2>Hydration Products</h2>
        <p class="description">Stay hydrated on the run.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Hydration Selection</h2>
        <ul class="carry-list">
          <li>Electrolyte Drinks</li>
          <li>Energy Chews</li>
          <li>Hydration Tablets</li>
        </ul>
      </div>
    `
  },

  'nutrition-jogology': {
    leftImg: 'image/nutrition/tail.webp',
    rightImg: 'image/nutrition/tail.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Fuel</span>
        <h2>Energy Bars</h2>
        <p class="description">Solid fuel for sustained energy.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Energy Bar Selection</h2>
        <ul class="carry-list">
          <li>CLIF Bars</li>
          <li>RX Bars</li>
          <li>Trail Mix Bars</li>
        </ul>
      </div>
    `
  },

  'nutrition-dttab': {
    leftImg: 'image/nutrition/honey-bar.webp',
    rightImg: 'image/nutrition/honey-bar.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Recovery</span>
        <h2>Recovery Products</h2>
        <p class="description">Recover faster after hard efforts.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Recovery Selection</h2>
        <ul class="carry-list">
          <li>Protein Bars</li>
          <li>Recovery Drinks</li>
          <li>BCAA Supplements</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // PAGE 6: ELECTRONICS
  // ============================================
  'electronics-balega': {
    leftImg: 'image/electronics/garmin-265.webp',
    rightImg: 'image/electronics/garmin-265.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-tech">GPS</span>
        <h2>GPS Running Watches</h2>
        <p class="description">Track your runs with precision.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>GPS Watch Selection</h2>
        <ul class="carry-list">
          <li>Garmin Forerunner 265</li>
          <li>Garmin Forerunner 955</li>
          <li>COROS Pace 3</li>
        </ul>
      </div>
    `
  },

  'electronics-darntough': {
    leftImg: 'image/electronics/shokz.webp',
    rightImg: 'image/electronics/shokz.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-tech">Audio</span>
        <h2>Running Headphones</h2>
        <p class="description">Safe, comfortable audio for running.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Headphone Selection</h2>
        <ul class="carry-list">
          <li>Shokz OpenRun Pro</li>
          <li>Shokz OpenFit</li>
          <li>Bone Conduction Headphones</li>
        </ul>
      </div>
    `
  },

  'electronics-jogology': {
    leftImg: 'image/electronics/mini-thera.webp',
    rightImg: 'image/electronics/mini-thera.webp',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-tech">Safety</span>
        <h2>Running Lights</h2>
        <p class="description">Be seen and stay safe.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Light Selection</h2>
        <ul class="carry-list">
          <li>Headlamps</li>
          <li>Chest Lights</li>
          <li>Clip-On Lights</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // PAGE 7: LULULEMON
  // ============================================
  'lululemon-balega': {
    leftImg: 'image/socks/balega-hidden-comfort.jpg',
    rightImg: 'image/socks/balega-hidden-comfort.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-premium">Premium</span>
        <h2>Lululemon Tops</h2>
        <p class="description">Technical running shirts and tanks.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Lululemon Top Selection</h2>
        <ul class="carry-list">
          <li>Metal Vent Tech</li>
          <li>Swiftly Tech</li>
          <li>Fast and Free Tops</li>
        </ul>
      </div>
    `
  },

  'lululemon-darntough': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-premium">Premium</span>
        <h2>Lululemon Bottoms</h2>
        <p class="description">Performance running shorts and tights.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Lululemon Bottom Selection</h2>
        <ul class="carry-list">
          <li>Fast and Free Tights</li>
          <li>Surge Shorts</li>
          <li>Pace Breaker Shorts</li>
        </ul>
      </div>
    `
  },

  'lululemon-jogology': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-premium">Premium</span>
        <h2>Lululemon Accessories</h2>
        <p class="description">Complete your running outfit.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Lululemon Accessory Selection</h2>
        <ul class="carry-list">
          <li>Run Hats</li>
          <li>Headbands</li>
          <li>Running Belts</li>
        </ul>
      </div>
    `
  },

  'lululemon-dttab': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-premium">Premium</span>
        <h2>Lululemon Outerwear</h2>
        <p class="description">Weather protection with style.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Lululemon Outerwear Selection</h2>
        <ul class="carry-list">
          <li>Define Jacket</li>
          <li>Running Vests</li>
          <li>Rain Jackets</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // PAGE 8: RABBIT
  // ============================================
  'rabbit-balega': {
    leftImg: 'image/socks/balega-hidden-comfort.jpg',
    rightImg: 'image/socks/balega-hidden-comfort.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Performance</span>
        <h2>Rabbit Running Shorts</h2>
        <p class="description">Lightweight, comfortable running shorts.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Rabbit Short Selection</h2>
        <ul class="carry-list">
          <li>EZ Shorts</li>
          <li>No Swim Shorts</li>
          <li>Half-Tights</li>
        </ul>
      </div>
    `
  },

  'rabbit-darntough': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Performance</span>
        <h2>Rabbit Tops</h2>
        <p class="description">Technical running shirts for all conditions.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Rabbit Top Selection</h2>
        <ul class="carry-list">
          <li>FKT Shirt</li>
          <li>Lightweight Tanks</li>
          <li>Long Sleeve Tees</li>
        </ul>
      </div>
    `
  },

  'rabbit-jogology': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Performance</span>
        <h2>Rabbit Running Gear</h2>
        <p class="description">Complete running apparel collection.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Rabbit Gear Selection</h2>
        <ul class="carry-list">
          <li>Running Tights</li>
          <li>Training Apparel</li>
          <li>Race Day Gear</li>
        </ul>
      </div>
    `
  },

  'rabbit-dttab': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-sport">Performance</span>
        <h2>Rabbit Accessories</h2>
        <p class="description">Complete your Rabbit kit.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Rabbit Accessory Selection</h2>
        <ul class="carry-list">
          <li>Running Hats</li>
          <li>Arm Sleeves</li>
          <li>Running Belts</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // PAGE 9: INJURY PREVENTION
  // ============================================
  'injury-balega': {
    leftImg: 'image/socks/balega-hidden-comfort.jpg',
    rightImg: 'image/socks/balega-hidden-comfort.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-recovery">Recovery</span>
        <h2>Foam Rollers</h2>
        <p class="description">Self-myofascial release for recovery.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Foam Roller Selection</h2>
        <ul class="carry-list">
          <li>Standard Foam Rollers</li>
          <li>Textured Rollers</li>
          <li>Vibrating Rollers</li>
        </ul>
      </div>
    `
  },

  'injury-darntough': {
    leftImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-recovery">Recovery</span>
        <h2>Massage Tools</h2>
        <p class="description">Target specific muscle groups.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Massage Tool Selection</h2>
        <ul class="carry-list">
          <li>Massage Balls</li>
          <li>Massage Sticks</li>
          <li>Percussion Massagers</li>
        </ul>
      </div>
    `
  },

  'injury-jogology': {
    leftImg: 'image/socks/no-show-jocology.jpg',
    rightImg: 'image/socks/no-show-jocology.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-recovery">Recovery</span>
        <h2>Compression Gear</h2>
        <p class="description">Improve circulation and recovery.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Compression Selection</h2>
        <ul class="carry-list">
          <li>Compression Socks</li>
          <li>Compression Sleeves</li>
          <li>Compression Tights</li>
        </ul>
      </div>
    `
  },

  'injury-dttab': {
    leftImg: 'image/socks/no-show-tab-darn-tough.jpg',
    rightImg: 'image/socks/no-show-tab-darn-tough.jpg',
    leftText: `
      <div class="product-detail">
        <span class="badge badge-recovery">Recovery</span>
        <h2>Recovery Tools</h2>
        <p class="description">Complete recovery toolkit.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Recovery Tool Selection</h2>
        <ul class="carry-list">
          <li>Ice Packs</li>
          <li>Heating Pads</li>
          <li>KT Tape</li>
          <li>Stretching Straps</li>
        </ul>
      </div>
    `
  },

  // ============================================
  // DEFAULT FALLBACK
  // ============================================
  'default': {
    leftImg: 'image/logos/darn-tough-2.jpg',
    rightImg: 'image/socks/micro-crew-ultra-lightweight-darn tough.jpg',
    leftText: `
      <div class="product-detail">
        <h2>Featured Product</h2>
        <p class="description">Explore our running gear collection.</p>
      </div>
    `,
    rightText: `
      <div class="product-detail">
        <h2>Visit Us</h2>
        <p class="description">Come see our full selection in store.</p>
      </div>
    `
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
