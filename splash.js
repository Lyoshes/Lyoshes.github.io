// Splash screen boot logic; kept external so the CSP can stay script-src 'self'.
(function() {
  var SHOW_SPLASH_TITLE = false;

  var img = document.getElementById('splash-icon');
  if (!SHOW_SPLASH_TITLE) document.getElementById('splash-title').style.display = 'none';

  function showIcon() { img.style.opacity = '1'; }

  img.onload = showIcon;
  img.onerror = function() {
    img.onload = showIcon;
    img.src = 'src/img/splash_icon.png';
  };
  img.src = 'img/splash_icon.png';

  var el = document.getElementById('splash-screen');
  setTimeout(function() {
    el.classList.add('fade-out');
    setTimeout(function() { el.remove(); }, 520);
  }, 4100);
})();
