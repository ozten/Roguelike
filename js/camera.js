(function() {
  var camera = window.camera = {};

  var scale = 1.0;

  camera.updateScale = function(s) {
    scale = s;

    $('#character').css({
      width: (100 * scale) + 'px',
      height: (100 * scale) + 'px'
    });
  };

  var canvas;
  camera.setBackground = function(aCanvas) {
    canvas = aCanvas;
  }

  camera.x = 0;
  camera.y = 0;

  $('#canvas').append('<canvas id="display-background" width="' + window.innerWidth +
    '" height="' + window.innerHeight + '"></canvas>');
  var displayCanvas = document.getElementById('display-background');

  update();

  camera.stepLeft = function() {
    camera.x += 100 * scale;
    update();
  };

  camera.stepUp = function() {
    camera.y += 100 * scale;
    update();
  };

  camera.stepRight = function() {
    camera.x -= 100 * scale;
    update();
  };

  camera.stepDown = function() {
    camera.y -= 100 * scale;
    update();
  };

  // From top left
  camera.scrollTo = function(x, y) {
    camera.x = 0 - x * 100 * scale;
    camera.y = 0 - y * 100 * scale;
    update();
  };

  function update() {
    if (! canvas) return;
    var dCtx = displayCanvas.getContext('2d');
    dCtx.save();
    dCtx.translate(camera.x, camera.y);
    dCtx.drawImage(canvas, 0, 0);
    dCtx.restore();
  }

  camera.debugDraw = function(x, y) {
        var dCtx = displayCanvas.getContext('2d');
    dCtx.save();
    dCtx.fillStyle = '#00FF00';
    dCtx.fillRect(x, y, 50, 50);
    dCtx.restore();
  }

})();