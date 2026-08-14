/* ===========================================================
   FluyLab · comportamiento compartido
   Nav, reveals, contadores y spotlight que sigue el cursor
   =========================================================== */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- nav con estado al hacer scroll ---- */
  var nav = document.getElementById('topnav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- reveals al entrar en pantalla ---- */
  var revealEls = document.querySelectorAll('.rv');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- contadores ---- */
  var counters = document.querySelectorAll('[data-count]');
  if (reduceMotion) {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  } else if (counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1100, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(step); else el.textContent = target;
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- spotlight que sigue el cursor ---- */
  if (!reduceMotion) {
    document.querySelectorAll('.card').forEach(function (card) {
      var glow = card.querySelector('.card-glow');
      if (!glow) return;
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        glow.style.left = (e.clientX - r.left) + 'px';
        glow.style.top = (e.clientY - r.top) + 'px';
      }, { passive: true });
    });
  }
})();
