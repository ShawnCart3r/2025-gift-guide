// main.js
document.addEventListener('DOMContentLoaded', () => {
  // ---------- Resolve PageFlip constructor across builds ----------
  function getPageFlipCtor() {
    const candidates = [
      () => (window.St && window.St.PageFlip),
      () => window.PageFlip,
      () => (window.pageFlip && window.pageFlip.PageFlip),
      () => (window.pageFlip && window.pageFlip.default),
      () => window.StPageFlip,
      () => window.stPageFlip,
    ];
    for (const pick of candidates) {
      try {
        const C = pick();
        if (typeof C === 'function') return C;
      } catch {}
    }
    return null;
  }

  const PageFlipCtor = getPageFlipCtor();

  // ---------- DOM refs ----------
  const bookEl = document.getElementById('book');
  if (!bookEl) {
    console.error('[flip] #book container not found');
    return;
  }
  const pages  = Array.from(bookEl.querySelectorAll('.page'));
  const prev   = document.getElementById('prev');
  const next   = document.getElementById('next');
  const dots   = Array.from(document.querySelectorAll('.dot'));
  const pnum   = document.getElementById('pnum');
  const ptotal = document.getElementById('ptotal');

  // We might not have a .book-wrap wrapper in your markup; guard for it
  const wrap = document.querySelector('.book-wrap') || bookEl;

  // ---------- Covers tagging ----------
  function tagCovers() {
    pages.forEach(p => p.classList.remove('cover--front','cover--back'));
    if (pages.length) {
      pages[0].classList.add('cover--front');
      pages[pages.length - 1].classList.add('cover--back');
    }
  }
  tagCovers();

  // ---------- Drag hint (dog-ear) ----------
  const dragHintRight = document.createElement('div');
  dragHintRight.className = 'drag-hint right';
  dragHintRight.innerHTML = '<div class="ear"></div><div class="label">Drag to flip</div>';
  const dragHintLeft = document.createElement('div');
  dragHintLeft.className = 'drag-hint left';
  dragHintLeft.innerHTML = '<div class="ear"></div><div class="label">Drag to flip</div>';
  bookEl.appendChild(dragHintRight);
  bookEl.appendChild(dragHintLeft);

  const HINT_KEY = 'ff_seen_drag_hint';
  let hintDismissed = localStorage.getItem(HINT_KEY) === '1';

  function updateDragHints(idx, total) {
    if (hintDismissed) {
      dragHintLeft.className = 'drag-hint left';
      dragHintRight.className = 'drag-hint right';
      return;
    }
    const hasPrev = idx > 0;
    const hasNext = idx < total - 1;
    dragHintLeft.classList.toggle('show', hasPrev);
    dragHintRight.classList.toggle('show', hasNext);
    dragHintLeft.classList.toggle('pulse', hasPrev);
    dragHintRight.classList.toggle('pulse', hasNext);
  }
  function dismissHintsForever() {
    if (hintDismissed) return;
    hintDismissed = true;
    localStorage.setItem(HINT_KEY, '1');
    dragHintLeft.classList.remove('show', 'pulse');
    dragHintRight.classList.remove('show', 'pulse');
  }

  // ---------- Dots + page number ----------
  function updateDotsUI(idx) {
    if (pnum) pnum.textContent = String(idx + 1);
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
  }

  // ---------- Height control (avoid jump on resize) ----------
  function freezeDesktopHeight() {
    if (window.innerWidth > 430) {
      const h = Math.ceil(bookEl.getBoundingClientRect().height);
      if (h > 0) bookEl.style.height = h + 'px';
    } else {
      bookEl.style.height = ''; // mobile uses CSS svh
    }
  }

  // ---------- Corner/edge click helper ----------
  function setupCornerEdgeClicks(onDecisionFn) {
    const EDGE = 80; // px
    function onUp(e) {
      if (!window.flipRef) return;
      const rect = bookEl.getBoundingClientRect();
      const src  = (e.changedTouches && e.changedTouches[0]) || e;
      const x = src.clientX, y = src.clientY;
      if (x == null || y == null) return;
      const nearBottom = y > rect.bottom - EDGE;
      const nearRight  = x > rect.right - EDGE;
      const nearLeft   = x < rect.left  + EDGE;
      if (nearBottom && nearRight) onDecisionFn('next');
      else if (nearBottom && nearLeft) onDecisionFn('prev');
    }
    bookEl.addEventListener('pointerup', onUp);
    bookEl.addEventListener('touchend', onUp, { passive: true });
  }

  // ---------- Fallback (no PageFlip lib present) ----------
  let current = 0;
  let fbFlipping = false;

  function fallbackRender() {
    pages.forEach((p, i) => p.style.display = (i === current ? 'block' : 'none'));
    if (ptotal) ptotal.textContent = String(pages.length);
    updateDotsUI(current);
    updateDragHints(current, pages.length);
  }
  function fbGuardFlip(to) {
    if (fbFlipping) return;
    fbFlipping = true;
    current = Math.max(0, Math.min(pages.length - 1, to));
    fallbackRender();
    setTimeout(() => fbFlipping = false, 200);
  }

  // ---------- Modal (click socks) ----------
  // (CSS already locks background with body.modal-open)
  const modal = document.getElementById('sockModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalAlt = document.getElementById('modalAlt');

  function openModalFromTile(tile){
    const img = tile.querySelector('img');
    if(!img) return;
    modalImg.src = img.getAttribute('src') || '';
    modalImg.alt = img.getAttribute('alt') || '';
    modalTitle.textContent = img.dataset.title || img.getAttribute('alt') || 'Product';
    modalAlt.textContent = img.dataset.caption || '';
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden','false');
  }

  function closeModal(){
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
  }

  // Backdrop/close button
  if (modal) {
    modal.addEventListener('click', (e)=>{
      if (e.target.hasAttribute('data-close')) closeModal();
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  // Guard to stop PageFlip seeing tile events
  function guardTileEvent(ev){
    const tile = ev.target.closest?.('.gear-tile');
    if (!tile) return;
    ev.stopPropagation();
    if (ev.type !== 'touchstart') ev.preventDefault();
  }

  // Open modal on click (capture so it beats the flip lib)
  bookEl.addEventListener('click', function(e){
    const tile = e.target.closest && e.target.closest('.gear-tile');
    if(!tile) return;
    e.stopPropagation();
    e.preventDefault();
    openModalFromTile(tile);
  }, {capture:true});

  // Also block earliest interactions so flip never receives them
  ['mousedown','pointerdown','touchstart','dblclick'].forEach(t=>{
    bookEl.addEventListener(t, guardTileEvent, {capture:true, passive: t==='touchstart'});
  });

  // ---------- Initialize PageFlip or fallback ----------
  if (!PageFlipCtor) {
    console.warn('[flip] PageFlip constructor not found. Running in fallback mode.');
    fallbackRender();

    prev?.addEventListener('click', () => fbGuardFlip(current - 1));
    next?.addEventListener('click', () => fbGuardFlip(current + 1));
    dots.forEach(d => d.addEventListener('click', () => fbGuardFlip(Number(d.dataset.index))));

    // keyboard
    bookEl.addEventListener('keydown', (e) => {
      if (fbFlipping) return;
      if (e.key === 'ArrowLeft')  fbGuardFlip(current - 1);
      if (e.key === 'ArrowRight') fbGuardFlip(current + 1);
    });

    // corner edges
    setupCornerEdgeClicks((dir) => fbGuardFlip(current + (dir === 'next' ? 1 : -1)));

    // swallow dblclick everywhere
    [bookEl, prev, next, ...dots].forEach(el => {
      el?.addEventListener('dblclick', (e) => { e.preventDefault(); e.stopPropagation(); }, { capture: true });
    });

    // dismiss hint on any interaction
    bookEl.addEventListener('pointerdown', dismissHintsForever, { passive: true });
    bookEl.addEventListener('touchstart',  dismissHintsForever, { passive: true });

    return; // done in fallback
  }

  // ---------- PageFlip init ----------
  const flip = new PageFlipCtor(bookEl, {
    width: 980,
    height: 640,
    size: 'stretch',
    minWidth: 360,
    maxWidth: 1200,
    minHeight: 420,
    maxHeight: 900,
    flippingTime: 800,
    maxShadowOpacity: 0.35,
    drawShadow: true,
    showCover: true,
    mobileScrollSupport: true,
    swipeDistance: 20,
  });
  flip.loadFromHTML(pages);
  window.flipRef = flip;

  // Height + totals
  freezeDesktopHeight();
  window.addEventListener('resize', freezeDesktopHeight);
  if (ptotal) ptotal.textContent = String(flip.getPageCount());

  // Sync UI with flip index
  function syncFromFlip(e) {
    const idx = (e && typeof e.data === 'number') ? e.data : flip.getCurrentPageIndex();
    updateDotsUI(idx);
    updateDragHints(idx, flip.getPageCount());
  }
  syncFromFlip();
  flip.on('flip', () => { syncFromFlip(); dismissHintsForever(); });

  // ---------- Flip lock (prevents spam during animation) ----------
  let flipping = false;
  let flipUnlockTimer = null;

  function lockUI() {
    flipping = true;
    prev?.setAttribute('disabled', 'true');
    next?.setAttribute('disabled', 'true');
    wrap?.classList.add('is-flipping');
  }
  function unlockUI() {
    flipping = false;
    if (flipUnlockTimer) { clearTimeout(flipUnlockTimer); flipUnlockTimer = null; }
    prev?.removeAttribute('disabled');
    next?.removeAttribute('disabled');
    wrap?.classList.remove('is-flipping');
  }
  function startFlipLock() {
    if (flipping) return;
    lockUI();
    const dur = (flip?.options?.flippingTime ?? 800) + 160;
    flipUnlockTimer = setTimeout(unlockUI, dur);
  }

  // Controls
  prev?.addEventListener('click', () => {
    if (flipping) return;
    try { flip.stopFlip?.(); } catch {}
    startFlipLock();
    flip.flipPrev();
  });
  next?.addEventListener('click', () => {
    if (flipping) return;
    try { flip.stopFlip?.(); } catch {}
    startFlipLock();
    flip.flipNext();
  });
  dots.forEach(d => d.addEventListener('click', () => {
    if (flipping) return;
    try { flip.stopFlip?.(); } catch {}
    startFlipLock();
    flip.flip(Number(d.dataset.index));
  }));

  // Keyboard nav
  bookEl.addEventListener('keydown', (e) => {
    if (flipping) return;
    if (e.key === 'ArrowLeft')  { startFlipLock(); flip.flipPrev(); }
    if (e.key === 'ArrowRight') { startFlipLock(); flip.flipNext(); }
  }, { capture: true });

  // Corner edge clicks
  setupCornerEdgeClicks((dir) => {
    if (flipping) return;
    try { flip.stopFlip?.(); } catch {}
    startFlipLock();
    if (dir === 'next') flip.flipNext(); else flip.flipPrev();
  });

  // Swallow native double-clicks as extra safety
  [bookEl, prev, next, ...dots].forEach(el => {
    el?.addEventListener('dblclick', (e) => { e.preventDefault(); e.stopPropagation(); }, { capture: true });
  });

  // Kill dummy/hash links inside pages
  bookEl.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = (a.getAttribute('href') || '').trim();
    if (href === '' || href === '#' || href.startsWith('#')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { capture: true });

  // Dismiss hint on interaction
  bookEl.addEventListener('pointerdown', dismissHintsForever, { passive: true });
  bookEl.addEventListener('touchstart',  dismissHintsForever, { passive: true });

  // iPhone-friendly front-cover tap: tap right half to advance
  function handleFrontCoverTap(e) {
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    if (!coarse) return;
    const idx = flip.getCurrentPageIndex();
    if (idx !== 0) return; // only on front cover

    const rect = bookEl.getBoundingClientRect();
    const src  = (e.changedTouches && e.changedTouches[0]) || e;
    const x = src?.clientX, y = src?.clientY;
    if (x == null || y == null) return;

    const rightHalf = x > rect.left + rect.width * 0.5;
    const nearRightBottom = (x > rect.right - 100) && (y > rect.bottom - 120);
    if (rightHalf || nearRightBottom) {
      e.preventDefault();
      e.stopImmediatePropagation();
      startFlipLock();
      try { flip.stopFlip?.(); } catch {}
      flip.flipNext();
    }
  }
  bookEl.addEventListener('touchend', handleFrontCoverTap, { capture: true });
  bookEl.addEventListener('click',     handleFrontCoverTap, { capture: true });

  // Small polish: stop scroll-into-view jumps on interactive clicks while flipping
  ['pointerdown','pointerup','touchend'].forEach(type => {
    bookEl.addEventListener(type, (e) => {
      if (!flipping) return;
      e.stopImmediatePropagation();
      if (type !== 'touchend') e.preventDefault();
    }, { capture: true });
  });
});
