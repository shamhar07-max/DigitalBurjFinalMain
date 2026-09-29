/* <cinema-bg variant="signal|grid|network" intensity="1"> — procedural cinematic background loop.
   Pauses offscreen, honours prefers-reduced-motion, listens for window 'cinema-bg:toggle'. */
(function () {
  if (customElements.get('cinema-bg')) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paused = reduce;
  var INK = [11, 16, 14], RED = [242, 58, 29], EMBER = [255, 122, 69];

  if (!document.getElementById('cinema-bg-css')) {
    var st = document.createElement('style');
    st.id = 'cinema-bg-css';
    st.textContent = '@keyframes cbGrain{0%{background-position:0 0}20%{background-position:-37px 21px}40%{background-position:23px -41px}60%{background-position:-19px -13px}80%{background-position:41px 33px}100%{background-position:0 0}}';
    document.head.appendChild(st);
  }
  var grainURL = (function () {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var x = c.getContext('2d'), d = x.createImageData(128, 128);
    for (var i = 0; i < d.data.length; i += 4) { var v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 22; }
    x.putImageData(d, 0, 0); return c.toDataURL();
  })();
  var rgba = function (c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; };

  class CinemaBg extends HTMLElement {
    static get observedAttributes() { return ['variant']; }
    connectedCallback() {
      if (this._init) return; this._init = true;
      this.style.cssText += ';display:block;position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none;background:#0b100e';
      this.cv = document.createElement('canvas');
      this.cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;transform:translateZ(0)';
      var grain = document.createElement('div');
      grain.style.cssText = 'position:absolute;inset:0;background-image:url(' + grainURL + ');opacity:.35;will-change:background-position;animation:cbGrain 1.2s steps(5) infinite';
      var vig = document.createElement('div');
      vig.style.cssText = 'position:absolute;inset:0;background:radial-gradient(ellipse 85% 75% at 50% 45%,transparent 45%,rgba(5,8,7,.78) 100%)';
      this.append(this.cv, grain, vig);
      this.ctx = this.cv.getContext('2d');
      this.mx = 0; this.my = 0; this.tmx = 0; this.tmy = 0;
      this.onMove = (e) => { var r = this.getBoundingClientRect(); this.tmx = ((e.clientX - r.left) / r.width - .5); this.tmy = ((e.clientY - r.top) / r.height - .5); };
      addEventListener('pointermove', this.onMove, { passive: true });
      this.onToggle = () => { paused = !paused; if (!paused) this.kick(); };
      addEventListener('cinema-bg:toggle', this.onToggle);
      this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this);
      this.io = new IntersectionObserver((es) => { this.visible = es[0].isIntersecting; if (this.visible) this.kick(); }); this.io.observe(this);
      this.t0 = performance.now(); this.resize();
    }
    disconnectedCallback() { removeEventListener('pointermove', this.onMove); removeEventListener('cinema-bg:toggle', this.onToggle); this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); cancelAnimationFrame(this.raf); this._init = false; }
    attributeChangedCallback() { if (this.ctx) this.setup(); }
    resize() {
      var r = this.getBoundingClientRect(); if (!r.width) return;
      var s = Math.min(devicePixelRatio || 1, 1.25) * 0.8;
      this.W = Math.round(r.width * s); this.H = Math.round(r.height * s);
      this.cv.width = this.W; this.cv.height = this.H; this.setup(); this.frame(performance.now());
    }
    kick() { if (this.running) return; this.running = true; var loop = (t) => { if (!this.visible || paused) { this.running = false; return; } this.frame(t); this.raf = requestAnimationFrame(loop); }; this.raf = requestAnimationFrame(loop); }
    setup() {
      var v = this.getAttribute('variant') || 'signal', W = this.W, H = this.H; this.v = v;
      if (!W) return;
      var rnd = (a, b) => a + Math.random() * (b - a);
      if (v === 'signal') {
        this.p = []; for (var i = 0; i < Math.round(W * H / 5200); i++) this.p.push({ x: rnd(0, W), y: rnd(0, H), l: rnd(60, 260), c: Math.random() < .72 ? RED : (Math.random() < .6 ? EMBER : [246, 245, 241]) });
        this.bokeh = []; for (var j = 0; j < 14; j++) this.bokeh.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(W * .02, W * .07), s: rnd(.1, .35), a: rnd(.04, .12) });
        var g = this.ctx; g.fillStyle = rgba(INK, 1); g.fillRect(0, 0, W, H);
      }
      if (v === 'network') {
        this.n = []; var cnt = Math.round(Math.min(70, W * H / 16000));
        for (var k = 0; k < cnt; k++) this.n.push({ x: rnd(0, W), y: rnd(0, H), z: rnd(.3, 1), vx: rnd(-.12, .12), vy: rnd(-.08, .08) });
        this.pulses = [];
      }
    }
    frame(now) {
      var t = (now - this.t0) / 1000, g = this.ctx, W = this.W, H = this.H; if (!W) return;
      this.mx += (this.tmx - this.mx) * .04; this.my += (this.tmy - this.my) * .04;
      if (this.v === 'grid') return this.grid(g, W, H, t);
      if (this.v === 'network') return this.network(g, W, H, t);
      return this.signal(g, W, H, t);
    }
    signal(g, W, H, t) {
      g.globalCompositeOperation = 'source-over';
      g.fillStyle = rgba(INK, .085); g.fillRect(0, 0, W, H);
      g.globalCompositeOperation = 'lighter';
      for (var b of this.bokeh) {
        b.y -= b.s; if (b.y < -b.r) { b.y = H + b.r; b.x = Math.random() * W; }
        var bx = b.x + this.mx * 40 * b.s * 3, gr = g.createRadialGradient(bx, b.y, 0, bx, b.y, b.r);
        gr.addColorStop(0, rgba(EMBER, b.a * .35)); gr.addColorStop(1, rgba(EMBER, 0)); g.fillStyle = gr; g.beginPath(); g.arc(bx, b.y, b.r, 0, 6.283); g.fill();
      }
      var sc = 1 / Math.max(W, H);
      g.lineWidth = Math.max(1, W / 900); g.lineCap = 'round';
      for (var p of this.p) {
        var nx = p.x * sc, ny = p.y * sc;
        var a = Math.sin(nx * 5.2 + t * .09) * 1.4 + Math.cos(ny * 6.1 - t * .07) * 1.2 + Math.sin((nx + ny) * 3.1 + t * .05) + this.mx * .6;
        var sp = W / 520, x2 = p.x + Math.cos(a) * sp, y2 = p.y + Math.sin(a) * sp * .55 - sp * .15;
        g.strokeStyle = rgba(p.c, p.c[0] === 246 ? .1 : .22);
        g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(x2, y2); g.stroke();
        p.x = x2; p.y = y2; p.l--;
        if (p.l < 0 || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) { p.x = Math.random() * W; p.y = Math.random() * H; p.l = 60 + Math.random() * 200; }
      }
      g.globalCompositeOperation = 'source-over';
    }
    grid(g, W, H, t) {
      var bg = g.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#07090a'); bg.addColorStop(.5, '#0e1412'); bg.addColorStop(1, '#0b100e');
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      var hz = H * (.46 + this.my * .04), cx = W * (.5 - this.mx * .06);
      var glow = g.createRadialGradient(cx, hz, 0, cx, hz, W * .6);
      glow.addColorStop(0, rgba(RED, .32)); glow.addColorStop(.35, rgba(RED, .08)); glow.addColorStop(1, rgba(RED, 0));
      g.fillStyle = glow; g.fillRect(0, 0, W, H);
      var rows = 28, cols = 36, spd = (t * .22) % 1;
      g.lineWidth = Math.max(1, W / 1400);
      var pts = [];
      for (var r = 0; r < rows; r++) {
        var z = (rows - r - spd) / rows; if (z <= 0.02) continue;
        var row = [], pz = 1 / (z * 6 + .15);
        for (var c = 0; c <= cols; c++) {
          var u = (c / cols - .5) * 2, wx = u * 9;
          var wz = r + spd + t * 0;
          var hgt = (Math.sin(wx * .7 + (r - t * 1.3) * .35) * .5 + Math.cos(wx * .33 - (r - t * 1.3) * .21) * .8) * Math.min(1, Math.abs(u) * 1.4 + .15);
          var sx = cx + wx * pz * W * .09, sy = hz + (1.2 - hgt * .9) * pz * H * .09;
          row.push([sx, sy]);
        }
        pts.push({ row: row, z: z });
      }
      for (var i = 0; i < pts.length; i++) {
        var R = pts[i], al = Math.pow(1 - R.z, 1.6) * .9;
        g.strokeStyle = rgba(RED, al * .8); g.beginPath();
        R.row.forEach((q, j) => j ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.stroke();
        if (i > 0) { var P = pts[i - 1]; g.strokeStyle = rgba(EMBER, al * .35); g.beginPath();
          for (var j = 0; j < R.row.length; j += 2) { g.moveTo(P.row[j][0], P.row[j][1]); g.lineTo(R.row[j][0], R.row[j][1]); } g.stroke(); }
      }
      var fog = g.createLinearGradient(0, hz - H * .08, 0, hz + H * .12);
      fog.addColorStop(0, 'rgba(11,16,14,0)'); fog.addColorStop(.5, 'rgba(11,16,14,.55)'); fog.addColorStop(1, 'rgba(11,16,14,0)');
      g.fillStyle = fog; g.fillRect(0, hz - H * .08, W, H * .2);
    }
    network(g, W, H, t) {
      g.fillStyle = '#0b100e'; g.fillRect(0, 0, W, H);
      var gl = g.createRadialGradient(W * .72, H * .3, 0, W * .72, H * .3, W * .55);
      gl.addColorStop(0, rgba(RED, .18)); gl.addColorStop(1, rgba(RED, 0)); g.fillStyle = gl; g.fillRect(0, 0, W, H);
      var n = this.n, max = Math.min(W, H) * .24, ox = this.mx * 30, oy = this.my * 20;
      for (var a of n) { a.x += a.vx * a.z * 2; a.y += a.vy * a.z * 2; if (a.x < -40) a.x = W + 40; if (a.x > W + 40) a.x = -40; if (a.y < -40) a.y = H + 40; if (a.y > H + 40) a.y = -40; a.sx = a.x + ox * a.z; a.sy = a.y + oy * a.z; }
      g.lineWidth = Math.max(1, W / 1500);
      var edges = [];
      for (var i = 0; i < n.length; i++) for (var j = i + 1; j < n.length; j++) {
        var dx = n[i].sx - n[j].sx, dy = n[i].sy - n[j].sy, d = Math.sqrt(dx * dx + dy * dy);
        if (d < max) { var al = (1 - d / max) * .35 * Math.min(n[i].z, n[j].z); g.strokeStyle = rgba([246, 245, 241], al * .6); g.beginPath(); g.moveTo(n[i].sx, n[i].sy); g.lineTo(n[j].sx, n[j].sy); g.stroke(); edges.push([i, j]); }
      }
      if (edges.length && Math.random() < .08 && this.pulses.length < 18) { var e = edges[(Math.random() * edges.length) | 0]; this.pulses.push({ a: e[0], b: e[1], p: 0, s: .006 + Math.random() * .01 }); }
      g.globalCompositeOperation = 'lighter';
      this.pulses = this.pulses.filter((q) => {
        q.p += q.s; if (q.p >= 1) return false;
        var A = n[q.a], B = n[q.b], x = A.sx + (B.sx - A.sx) * q.p, y = A.sy + (B.sy - A.sy) * q.p, rr = Math.max(2, W / 360);
        var pg = g.createRadialGradient(x, y, 0, x, y, rr * 5); pg.addColorStop(0, rgba(EMBER, .9)); pg.addColorStop(1, rgba(RED, 0));
        g.fillStyle = pg; g.beginPath(); g.arc(x, y, rr * 5, 0, 6.283); g.fill(); return true;
      });
      for (var k of n) { var r = Math.max(1.2, W / 700) * k.z * 1.6; g.fillStyle = rgba(k.z > .8 ? RED : [246, 245, 241], .35 + k.z * .5); g.beginPath(); g.arc(k.sx, k.sy, r, 0, 6.283); g.fill(); }
      g.globalCompositeOperation = 'source-over';
    }
  }
  customElements.define('cinema-bg', CinemaBg);
})();
