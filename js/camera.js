(function() {
  var camera = window.camera = {};

  var scale = 1.0;

  camera.updateScale = function(s) {
    scale = s;

    $('#character').css({
      width: (100*scale) + 'px',
      height: (100*scale) + 'px'
    });
  };

  camera.x = 0;
  camera.y = 0;

  update();

  camera.stepLeft = function() {
    camera.x -= 100 * scale;
    update();
  };

  camera.stepUp = function() {
    camera.y -= 100 * scale;
    update();
  };

  camera.stepRight = function() {
    camera.x += 100 * scale;
    update();
  };

  camera.stepDown = function() {
    camera.y += 100 * scale;
    update();
  };

  // From top left
  camera.scrollTo = function(x, y) {
    camera.x = x * 100 * scale;
    camera.y = y * 100 * scale;
    update();
  };

  function update() {
    $('#canvas').css({
      transition: '0.3s linear',
      transform: 'translate(' + (0 - camera.x) + 'px, ' + (0 - camera.y) + 'px)'
    });
  }

})();