(function () {
  var track = document.getElementById('avisStackTrack');
  if (!track) return;

  var root = document.documentElement;
  var cards = Array.prototype.slice.call(track.children);
  var order = cards.map(function (el, i) { return i; });

  function cardSize() {
    return window.matchMedia('(min-width: 640px)').matches ? 365 : 290;
  }

  function render() {
    var size = cardSize();
    root.style.setProperty('--avis-card-size', size + 'px');
    var len = order.length;

    order.forEach(function (cardIndex, i) {
      var position = len % 2 ? i - (len + 1) / 2 : i - len / 2;
      var isCenter = position === 0;
      var el = cards[cardIndex];

      el.classList.toggle('is-active', isCenter);
      el.dataset.position = position;
      var translateY = isCenter ? -32 : (position % 2 ? 12 : -12);
      var rotate = isCenter ? 0 : (position % 2 ? 2.5 : -2.5);
      el.style.transform =
        'translate(-50%, -50%) ' +
        'translateX(' + (size / 1.5) * position + 'px) ' +
        'translateY(' + translateY + 'px) ' +
        'rotate(' + rotate + 'deg)';
      el.style.zIndex = isCenter ? 10 : 1;
    });
  }

  function move(steps) {
    if (steps > 0) {
      for (var i = 0; i < steps; i++) order.push(order.shift());
    } else {
      for (var j = 0; j > steps; j--) order.unshift(order.pop());
    }
    render();
  }

  cards.forEach(function (el) {
    el.addEventListener('click', function () {
      move(parseInt(el.dataset.position, 10));
    });
  });

  document.querySelectorAll('.avis-stack-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      move(parseInt(btn.dataset.dir, 10));
    });
  });

  window.addEventListener('resize', render);
  render();
})();
