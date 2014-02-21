(function() {
  var camera = window.camera = {};

  var scale = 1.0;

  camera.updateScale = function(s) {
    scale = s;

    $('#character').css({
      width: (7 * scale) + 'px',
      height: (7 * scale) + 'px'
    });
  };


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

  // TODO remove calls to update and implement a renderLoop
  function update() {

    window.camera.draw();

    if (showMapOverlay) {
      var dCtx = displayCanvas.getContext('2d');
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

  camera.screenPointToMapCoord = function(x, y) {

    // map tiles are 100 * scale

    //curX and curY are map coordinates, not pixels
    console.log('screenPointToMapCoord x=', x, 'y=', y, 'tileScale=', camera.tileScale);
    var mapX = Math.floor(x / camera.tileScale);
    var mapY = Math.floor(y / camera.tileScale);

    console.log('mapX', mapX, 'mapY=', mapY);

    // Top Left in map space
    var origin = camera.currentMapOrigin();
    console.log(origin, mapX, mapY);
    console.log('nearestWalkableTile called with', origin[0] + mapX, origin[1] + mapY);
console.log('Calculated', map.nearestWalkableTile(origin[0] + mapX, origin[1] + mapY));
    return map.nearestWalkableTile(origin[0] + mapX, origin[1] + mapY);
  };

  camera.debugDraw = function(x, y) {
    var dCtx = displayCanvas.getContext('2d');
    dCtx.save();
    dCtx.fillStyle = '#00FF00';
    dCtx.fillRect(x - 25, y - 25, 50, 50);
    dCtx.restore();
  }

})();