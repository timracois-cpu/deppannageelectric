(function () {
  var words = ['télés', 'ordinateurs', 'fours', 'antennes', 'lave-linge'];
  var rotate = document.getElementById('heroRotate');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function splitChars(word) {
    return Array.prototype.slice.call(word);
  }

  function renderWord(word, animateIn) {
    var wrap = document.createElement('span');
    wrap.className = 'hero-rotate-word';
    splitChars(word).forEach(function (ch, i) {
      var span = document.createElement('span');
      span.className = 'hero-rotate-char';
      span.textContent = ch === ' ' ? ' ' : ch;
      if (animateIn && !reduceMotion) {
        span.style.animationDelay = (i * 28) + 'ms';
      } else if (reduceMotion) {
        span.style.animation = 'none';
      }
      wrap.appendChild(span);
    });
    return wrap;
  }

  if (rotate) {
    var index = 0;
    rotate.innerHTML = '';
    rotate.appendChild(renderWord(words[0], true));

    if (!reduceMotion) {
      setInterval(function () {
        var current = rotate.querySelector('.hero-rotate-word');
        if (current) {
          Array.prototype.forEach.call(current.children, function (span, i) {
            span.classList.add('is-out');
            span.style.animationDelay = (i * 20) + 'ms';
          });
        }
        setTimeout(function () {
          index = (index + 1) % words.length;
          rotate.innerHTML = '';
          rotate.appendChild(renderWord(words[index], true));
        }, 260);
      }, 2600);
    }
  }

  // Mouse-parallax floating photos
  var floats = Array.prototype.slice.call(document.querySelectorAll('.hero-float'));
  var heroEl = document.getElementById('top');
  if (!floats.length || !heroEl || reduceMotion || window.matchMedia('(max-width: 760px)').matches) return;

  var target = { x: 0, y: 0 };
  var current = floats.map(function () { return { x: 0, y: 0 }; });
  var ease = 0.08;

  heroEl.addEventListener('mousemove', function (e) {
    var rect = heroEl.getBoundingClientRect();
    target.x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    target.y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
  });

  heroEl.addEventListener('mouseleave', function () {
    target.x = 0;
    target.y = 0;
  });

  function tick() {
    floats.forEach(function (el, i) {
      var depth = parseFloat(el.dataset.depth) || 1;
      var strength = depth * 18;
      var tx = target.x * strength;
      var ty = target.y * strength;
      current[i].x += (tx - current[i].x) * ease;
      current[i].y += (ty - current[i].y) * ease;
      el.style.transform = 'translate3d(' + current[i].x.toFixed(1) + 'px,' + current[i].y.toFixed(1) + 'px,0)';
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
