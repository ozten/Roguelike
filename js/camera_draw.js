// TODO combine background.js and camera.js

(function() {
  window.camera.tileScale = 1;
  console.log('defining window.camera.draw');
  window.camera.draw = function() {
    /*
     * Figure out where in the map we're located
     * Translate that to screen pixels
     * Including determining the tileScale of a single tile
     * Draw a relevant amount of the world
     */

    // Goals
    var tileWidth = 11;
    var tileHeight = 15;

    // display pixels
    var width = window.innerWidth;
    var height = window.innerHeight;
    var screenRatio = width / height;
    console.log(screenRatio);
    if (screenRatio > (tileWidth / tileHeight)) {
      var tmp = tileWidth;
      tileWidth = tileHeight;
      tileHeight = tmp;
    }
    console.log('Aspect ratio', tileWidth, tileHeight);
    // TODO should be tileWidth / 2 - 1
    var tileBufferX = Math.floor(tileWidth / 2);
    var tileBufferY = Math.floor(tileHeight / 2);

    // Current X, Y in map coordinates of the top left of the screen
    camera.currentMapOrigin = function() {
      var coords = map.currentCoordinates();
      return [coords[0] - tileBufferX, coords[1] - tileBufferY];
    };


    console.log('Inset the screen by ', tileBufferX, tileBufferY);



    var tileScale = window.camera.tileScale = (window.innerWidth / tileWidth);
    /*if (screenRatio < tileWidth / tileHeight) {
      tileScale = window.camera.scale = (window.innerWidth / tileHeight);
    }*/

    var jCanvas = $('#display-background');
    if (jCanvas.length === 0 ||
      false === map.ready) {
      return;
    }
    var canvas = jCanvas.get(0);



    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.lineWidth = "1";
      ctx.strokeStyle = "rgb(255, 0, 0)";
      ctx.fillStyle = "rgb(25, 13, 17)";
      ctx.fillRect(0, 0, width * tileScale, height * tileScale);


      var coords = map.currentCoordinates();
      // TODO only need to do this in a resize event...

      $('#character').css({
        left: ((tileBufferX) * tileScale) + 'px',
        top: ((tileBufferY) * tileScale) + 'px',
        width: tileScale +'px'
      });

      for (var y = 0; y < tileHeight; y++) {
        for (var x = 0; x < tileWidth; x++) {


          switch (map.tileType(x + coords[0] - tileBufferX, y + coords[1] - tileBufferY)) {
            case 'S':
              ctx.fillStyle = "rgb(100,100,100)";
              break;
            case ' ':
              ctx.fillStyle = "rgb(255,100,100)";
              break;
            case '@':
              ctx.fillStyle = "rgb(255,200,200)";
              break;
            case 'q':
              ctx.fillStyle = "rgb(75,75,75)";
              break;
            case 'b':
              ctx.fillStyle = "rgb(0,175,175)";
              break;
            case 'a':
              ctx.fillStyle = "rgb(255,255,100)";
              break;
            case 'R':
              ctx.fillStyle = "rgb(100,149,237)"
              break;
            case 'X':
              ctx.fillStyle = "rgb(0,0,0)"
              break;
            default:
              console.log('UNKNOWN TIle Type', map.tileType(x + coords[0] - tileBufferX, y + coords[1] - tileBufferY));
              continue;
          }

          var screenX = x * tileScale;
          var screenY = y * tileScale;

          // 1, 6
          ctx.fillRect(screenX, screenY, tileScale, tileScale);
        }
      }


      /*
      for (var i = 0; i < height; i++) {
        ctx.beginPath();
        ctx.moveTo(0 * tileScale, i * 100 * tileScale);

        ctx.lineTo(width * 100 * tileScale, i * 100 * tileScale);

        ctx.closePath();
        ctx.stroke();

      }
      for (i = 0; i < width; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 100 * tileScale, 0 * tileScale);
        ctx.lineTo(i * 100 * tileScale, height * 100 * tileScale);
        ctx.closePath();
        ctx.stroke();

      }
      */
    }
  };
})();