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

  var displayCanvas;
  camera.handleResize = function() {
    $('#display-background').remove();
    $('#canvas').append('<canvas id="display-background" width="' + window.innerWidth +
      '" height="' + window.innerHeight + '"></canvas>');
    console.log('AOK window size', window.innerWidth, window.innerHeight);
    displayCanvas = document.getElementById('display-background');
    console.log('Resize CAMERA X', camera.x);
    update();
  }



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
    if (!canvas) return;
    var dCtx = displayCanvas.getContext('2d');
    dCtx.save();
    console.log('CAMERA X', camera.x);
    dCtx.translate(camera.x, camera.y);
    console.log(canvas, 0, 0, dCtx.width, dCtx.height);
    dCtx.drawImage(canvas, 0, 0);
    dCtx.restore();
    if (showMapOverlay) {
      dCtx.save();
      //dCtx.scale(1/11, 1/11);
      console.log();
      dCtx.fillStyle = '#00FF00';

      var moWidth, moHeight;
      if (displayCanvas.width < (displayCanvas.height * 11 / 15)) {
        moWidth = displayCanvas.width;
        moHeight = displayCanvas.width * 15 / 11;
      } else {
        moWidth = displayCanvas.height * 11 / 15;
        moHeight = displayCanvas.height;
      }
      dCtx.fillRect(15, 15, moWidth - 30, moHeight - 30);

      dCtx.drawImage(canvas, 20, 20, moWidth - 40, moHeight - 40);
      dCtx.restore();
    }
  }

  var showMapOverlay = false;
  camera.toggleMapOverlay = function() {
    showMapOverlay = !showMapOverlay;
    $('#character').toggle();
    update();
  };

  camera.debugDraw = function(x, y) {
    var dCtx = displayCanvas.getContext('2d');
    dCtx.save();
    dCtx.fillStyle = '#00FF00';
    dCtx.fillRect(x, y, 50, 50);
    dCtx.restore();
  }

})();