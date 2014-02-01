
(function() {
  "use strict";

  window.map = {};

  var _map = []; // Map Data
  var width = map.width = 80;
  var height = map.height = 40;
  var startX;
  var startY;
  var curX;
  var curY;
  var MIN_BORDER_DIST = 5;
  var RND_WALK_STEPS = (width * height) * 0.75;

  var NORTH = 0;
  var EAST = 1;
  var SOUTH = 2;
  var WEST = 3;


  var SPACE = 'S';
  var PATH = ' ';

  map.startPos = function() {
    return [startX, startY];
  };

  map.tileType = function(x, y) {
    return _map[y][x];
  };

  map.generateMap = function() {
    var start = new Date();


    var pickX = true;

    //startX = curX = 0;
    //pickX = false;


    while (pickX) {
      startX = curX = rand(width);
      if (startX > MIN_BORDER_DIST &&
        startX < width - MIN_BORDER_DIST) {
        pickX = false;
      }
    }

    var pickY = true;
    //startY = curY = 0;
    //pickY = false;

    while (pickY) {
      startY = curY = rand(height);
      if (startY > MIN_BORDER_DIST &&
        startY < height - MIN_BORDER_DIST) {
        pickY = false;
      }
    }

    for (var row = 0; row < height; row++) {
      _map[row] = [];
      console.log(row);
      for (var col = 0; col < width; col++) {

        _map[row][col] = SPACE;
      }
    }



    //startX = curX = Math.round(width / 2);
    //startY = curY = Math.round(height / 2);

    console.log('Starting at ', startX, startY);
    _map[startY][startX] = '@';

    var curHeading = EAST;

    var nn = 0;
    var ee = 0;
    var ss = 0;
    var ww = 0;
    /*
_map[0][0] = 'A';
_map[0][1] = 'B';
_map[1][0] = 'D';
_map[1][1] = 'E';
_map[2][0] = 'G';
_map[2][1] = 'H';
*/
    //RND_WALK_STEPS = 0;

    for (var i = 0; i < RND_WALK_STEPS; i++) {
      var picking = true;

      while (picking) {
        var cardinal = rand(15);

        if (cardinal > WEST) {
          cardinal = curHeading;
        }



        if (NORTH === cardinal &&
          curY - 1 > 0) {

          curY -= 1;

          nn++;
        } else if (EAST === cardinal &&
          curX + 1 < width) {
          curX += 1;
          ee++;
        } else if (SOUTH === cardinal &&
          curY + 1 < height) {
          curY += 1;
          ss++;
        } else if (WEST === cardinal &&
          curX - 1 > 0) {
          curX -= 1;
          ww++;
        } else {
          picking = false;
          continue;
        }
        if (i === 33) {
          console.log(curY, curX);
        }
        try {
          _map[curY][curX] = PATH;
        } catch (e) {
          picking = false;
          continue;
        }
        curHeading = cardinal;
        //console.log(curY, curX);
        picking = false;
        if (i < 30) {
          console.log('writing to ', curY, curX);
        }
        _map[curY][curX] = PATH;
      }
    }
    console.log('nn=', nn, 'ee=', ee, 'ss=', ss, 'ww=', ww);
    var js = [];
    var b = "";
    for (var row2 = 0; row2 < height; row2++) {
      b += row2 + ': ' + _map[row2].join('') + '\n';
      js.push('[' + _map[row2].join("','") + '],\n');

    }
    console.log(b);
    console.log('[', js.join(','), ']');
    console.log(_map);
    window._map = _map;
    var dMap = mapDecorator(_map);

    _map[startY][startX] = '@';
    curX = startX;
    curY = startY;
    console.log('Finished in ', new Date() - start, 'milliseconds');

  };

  function walkableTile(x, y) {
    return [' ', '@'].indexOf(_map[y][x]) !== -1;
  }

  map.moveUpAllowed = function() {
    try {
      console.log('Move up allowed? from', curX, curY, ' to ', _map[curY - 1][curX]);
      return walkableTile(curX, curY - 1);
    } catch (e) {
      return false;
    }
  };

  map.moveRightAllowed = function() {
    try {
      console.log('Move right allowed? from', curX, curY, ' to ', _map[curY][curX + 1]);
      return walkableTile(curX + 1, curY);
    } catch (e) {
      return false;
    }
  };

  map.moveDownAllowed = function() {
    try {
      console.log('Move down allowed? from', curX, curY, ' to ', _map[curY + 1][curX]);
      return walkableTile(curX, curY + 1);
    } catch (e) {
      return false;
    }
  };

  map.moveLeftAllowed = function() {
    try {
      console.log('Move left allowed? from', curX, curY, ' to ', _map[curY][curX - 1]);
      return walkableTile(curX - 1, curY);
    } catch (e) {
      return false;
    }
  };

  map.moveUp = function() {
    curY -= 1;
  };

  map.moveRight = function() {
    curX += 1;
  };

  map.moveDown = function() {
    curY += 1;
  };


  map.moveLeft = function() {
    curX -= 1;
  };

  map.currentCoordinates = function() {
    return [curX, curY];
  };

  map.screenPointToMapCoord = function(x, y) {
    var scale = background.scale;
    // map tiles are 100 * scale

    //curX and curY are map coordinates, not pixels
    var cameraOffsetX = 200 * scale;
    var cameraOffsetY = 200 * scale;
    console.log('curX=', curX, 'curY=', curY, 'x=', x, 'y=', y);
    console.log('Xs=', curX + x, 'Ys=', curY + y);


    var tileWidth = scale * 100;

    var coords = [curX + Math.floor((x - cameraOffsetX) / tileWidth), curY + Math.floor((y - cameraOffsetY) / tileWidth)];
    console.log('raw', coords);
    // Is this possible? check for fat fingering a close by space
    if (!walkableTile(coords[0], coords[1])) {
      // TODO measure distance and pick the closest...
      if (walkableTile(coords[0], coords[1] + 1)) {
        coords[1] += 1;
      } else if (walkableTile(coords[0], coords[1] - 1)) {
        coords[1] -= 1;
      } else if (walkableTile(coords[0] + 1, coords[1])) {
        coords[0] += 1;
      } else if (walkableTile(coords[0] - 1, coords[1])) {
        coords[0] -= 1;
      } else {
        coords = [];
      }
    }
    return coords;
  };

  map.map = _map;

  function rand(max) {
    return Math.round(Math.random() * (max - 1));
  }

})();