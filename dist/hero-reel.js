/* Responsive, accessible crossfade for the DigitalBurj photo series.
   Only the first slide loads up front; each next slide is fetched one interval ahead. */
(function () {
  if (customElements.get('hero-reel')) return;
  const css = 'hero-reel .db-reel-slide{position:absolute;inset:0;display:block;opacity:0;transition:opacity 1600ms cubic-bezier(.22,.8,.24,1)}hero-reel .db-reel-slide img{display:block;width:100%;height:100%;object-fit:cover;object-position:center;transform:scale(1.025);transition:transform 8s linear}hero-reel .db-reel-slide.is-current{opacity:1}hero-reel .db-reel-slide.is-current img{transform:scale(1.1)}@media(prefers-reduced-motion:reduce){hero-reel .db-reel-slide,hero-reel .db-reel-slide img{transition:none!important;transform:none!important}}';
  if (!document.getElementById('hero-reel-css')) { const s = document.createElement('style'); s.id = 'hero-reel-css'; s.textContent = css; document.head.appendChild(s); }
  class HeroReel extends HTMLElement {
    connectedCallback() {
      if (this.initialized) return;
      this.initialized = true;
      const ids = (this.getAttribute('slides') || '01').split(',').map(s => s.trim()).filter(Boolean);
      this.style.cssText += ';display:block;position:absolute;inset:0;overflow:hidden;background:#0b100e';
      this.slides = ids.map((id, i) => {
        const picture = document.createElement('picture');
        picture.className = 'db-reel-slide';
        const source = document.createElement('source');
        source.media = '(max-width: 700px)';
        const img = document.createElement('img');
        img.alt = ''; img.decoding = 'async';
        picture.append(source, img); this.append(picture);
        picture._load = () => { if (picture._ok) return; picture._ok = true; source.srcset = `media/${id}-m.webp`; img.src = `media/${id}-d.webp`; };
        if (!i) { img.fetchPriority = 'high'; img.loading = 'eager'; picture._load(); }
        return picture;
      });
      this.index = 0; this.slides[0]?.classList.add('is-current');
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.interval = Math.max(5000, Number(this.getAttribute('interval')) || 7000);
      this.visible = true; this.paused = reduced;
      this.onToggle = () => { this.paused = !this.paused; this.schedule(); };
      addEventListener('cinema-bg:toggle', this.onToggle);
      this.observer = new IntersectionObserver(([entry]) => { this.visible = entry.isIntersecting; this.schedule(); });
      this.observer.observe(this); this.schedule();
    }
    schedule() {
      clearTimeout(this.timer);
      if (!this.visible || this.paused || this.slides.length < 2) return;
      const next = this.slides[(this.index + 1) % this.slides.length];
      next._load();
      this.timer = setTimeout(() => {
        const img = next.querySelector('img');
        const go = () => {
          this.slides[this.index].classList.remove('is-current');
          this.index = (this.index + 1) % this.slides.length;
          this.slides[this.index].classList.add('is-current');
          this.schedule();
        };
        (img.decode ? img.decode().catch(() => {}) : Promise.resolve()).then(go);
      }, this.interval);
    }
    disconnectedCallback() { clearTimeout(this.timer); this.observer?.disconnect(); removeEventListener('cinema-bg:toggle', this.onToggle); this.initialized = false; }
  }
  customElements.define('hero-reel', HeroReel);
})();
