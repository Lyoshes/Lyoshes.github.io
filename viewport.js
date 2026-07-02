// Fix iOS standalone PWA viewport + Android fullscreen nav bar.
// Loaded as a classic script from <head> (before body renders) so --vh is
// set before first layout; kept external so the CSP can stay script-src 'self'.
(function(){
  var isStandalone = (window.navigator.standalone === true) || window.matchMedia('(display-mode: standalone)').matches;
  var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  function getH(){
    if(isIOS && isStandalone){
      var isPortrait = window.innerHeight > window.innerWidth;
      return isPortrait ? screen.height : screen.width;
    }
    return window.innerHeight;
  }
  function update(){
    var h = getH();
    var root = document.documentElement;
    root.style.setProperty('--vh', h*0.01+'px');
    // On iOS standalone, --nav-bottom = 0 (env(safe-area-inset-bottom) handles it via CSS)
    // On Android fullscreen, --nav-bottom = screen gap behind nav buttons
    if(!isIOS){
      // Android fullscreen: screen.height may equal innerHeight even when
      // system nav bar overlays content. Use visualViewport if available.
      var visH = (window.visualViewport) ? window.visualViewport.height : window.innerHeight;
      var gap = window.innerHeight - visH;
      // If visualViewport doesn't help, detect standalone and add safe fallback
      if(gap <= 0 && isStandalone) gap = 48;
      root.style.setProperty('--nav-bottom', (gap > 0 ? gap : 0) + 'px');
    }
    var gc = document.getElementById('gameContainer');
    if(gc) gc.style.height = h + 'px';
  }
  update();
  window.addEventListener('resize', update);
  if(window.visualViewport) window.visualViewport.addEventListener('resize', update);
  setTimeout(update,50);setTimeout(update,150);
  document.addEventListener('DOMContentLoaded', update);
})();
