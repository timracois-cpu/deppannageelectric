(function () {
  var track = document.querySelector('.parallax-track');
  if (!track) return;

  var imgs = Array.prototype.slice.call(track.querySelectorAll('.parallax-img'));
  var scales = [4, 5, 6, 5, 6, 8, 9];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileQuery = window.matchMedia('(max-width: 760px)');
  var ticking = false;

  function update() {
    ticking = false;
    if (reduceMotion || mobileQuery.matches) return;

    var scrollRange = track.offsetHeight - window.innerHeight;
    var progress = scrollRange > 0
      ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / scrollRange))
      : 0;

    for (var i = 0; i < imgs.length; i++) {
      var max = scales[i % scales.length];
      var scale = 1 + progress * (max - 1);
      imgs[i].style.transform = 'scale(' + scale + ')';
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
