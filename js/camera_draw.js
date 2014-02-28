// TODO combine background.js and camera.js
(function() {
  window.camera.tileScale = 1;
  console.log('defining window.camera.draw');

  var SPACE = 'S';
  var PATH = ' ';
  var AIRLOCK = 'a';
  var SLEEPING_QUARTERS = 'q';
  var BED = 'b';
  var RESTROOM = 'R';
  var SPACE2 = 'X';
  var SPARE_PART = 'p';
  var ENEMY = 'e';
  var DINING_HALL = 'd';
  var CORRIDOR = 'c';
  var REPLACEDSPACE = 's';

  var partsImg = new Image();
  partsImg.src = '/img/parts.png';

  var enemyImg = new Image();
  enemyImg.src = '/img/enemy.png';



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
        width: tileScale + 'px'
      });

      for (var y = 0; y < tileHeight; y++) {
        for (var x = 0; x < tileWidth; x++) {
          switch (map.tileType(x + coords[0] - tileBufferX, y + coords[1] - tileBufferY)) {
            case SPACE:
              ctx.fillStyle = "rgb(175,175,175)";
              break;
            case PATH:
              ctx.fillStyle = "rgb(255,100,100)";
              break;
            case AIRLOCK:
              ctx.fillStyle = "rgb(255,255,100)";
              break;
            case SLEEPING_QUARTERS:
              ctx.fillStyle = "rgb(75,75,75)";
              break;
            case BED:
              ctx.fillStyle = "rgb(0,175,175)";
              break;
            case RESTROOM:
              ctx.fillStyle = "rgb(100,149,237)";
              break; 
            case SPACE2:
              ctx.fillStyle = "rgb(0,0,0)";
              break;
            case SPARE_PART:
              ctx.fillStyle = "rgb(250,250,0)";
              break;
            case ENEMY:
              ctx.fillStyle = "rgb(255,100,50)";
              break;
            case DINING_HALL:
              ctx.fillStyle = "rgb(255,128,0)";
              break; 
            case CORRIDOR:
              ctx.fillStyle = "rgb(220,150,150)";
              break;  
            case REPLACEDSPACE:
              ctx.fillStyle = "rgb(100,100,100)";
              break;  
            case '@':
              ctx.fillStyle = "rgb(255,200,200)";
              break;
            default:
              console.log('UNKNOWN TIle Type', tileType);
              continue;
          }

          var screenX = x * tileScale;
          var screenY = y * tileScale;

          // 1, 6
          ctx.fillRect(screenX, screenY, tileScale, tileScale);
          if (SPARE_PART === map.tileType) {
            ctx.drawImage(partsImg, screenX, screenY, tileScale, tileScale);
          } else if (ENEMY === map.tileType) {
            ctx.drawImage(enemyImg, screenX, screenY, tileScale, tileScale);
          }

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