(function() {
  "use strict";

  window.map = {};

  var _map = []; // Map Data
  var startX;
  var startY;
  var curX;
  var curY;

  var NORTH = 0;
  var EAST = 1;
  var SOUTH = 2;
  var WEST = 3;

  var SPACE = 'S';
  var PATH = ' ';
  var AIRLOCK = 'a';
  var SLEEPING_QUARTERS = 'q';
  var BED = 'b';
  var RESTROOM = 'R';
  var SPACE2 = 'X';
  var SPARE_PART = 'p';
  var ENEMY = 'e';

  map.ready = false;

  /**
   * TODO: split map into a map generation and
   * map utility functions?
   */
  map.generateMap = function() {
    var mapDetails = map.mapByTile.generateMap();
    _map = mapDetails.map;
    startX = mapDetails.startX;
    startY = mapDetails.startY;
    curX = mapDetails.curX;
    curY = mapDetails.curY;
    map.ready = true;
  };

  map.startPos = function() {
    return [startX, startY];
  };

  /**
   * Safe to call on non-existant tiles
   */
  map.tileType = function(x, y) {
    try {
      return _map[y][x];
    } catch (e) {
      window._map = map;
      return null;
    }
  };

  map.setTileType = function(value, x, y) {
    if (!x || !y) {
      _map[curY][curX] = value;
    } else {
      _map[y][x] = value;
    }
  };

  function walkableTile(x, y) {
    console.log('walkableTile', x, y);
    return [PATH, AIRLOCK, SLEEPING_QUARTERS, RESTROOM, SPARE_PART, '@'].indexOf(_map[y][x]) !== -1;
  }

  map.moveUpAllowed = function() {
    try {
      return walkableTile(curX, curY - 1);
    } catch (e) {
      return false;
    }
  };

  map.moveRightAllowed = function() {
    try {
      return walkableTile(curX + 1, curY);
    } catch (e) {
      return false;
    }
  };

  map.moveDownAllowed = function() {
    try {
      return walkableTile(curX, curY + 1);
    } catch (e) {
      return false;
    }
  };

  map.moveLeftAllowed = function() {
    try {
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

  function isInventoryTile(x, y) {
    return [BED].indexOf(_map[y][x]) !== -1;
  }

  map.hasItemOnLeft = function() {
    try {
      return isInventoryTile(curX - 1, curY);
    } catch (e) {
      return false;
    }
  };

  map.hasItemOnRight = function() {
    try {
      return isInventoryTile(curX + 1, curY);
    } catch (e) {
      return false;
    }
  };

  map.hasItemUp = function() {
    try {
      return isInventoryTile(curX, curY - 1);
    } catch (e) {
      return false;
    }
  };

  map.hasItemDown = function() {
    try {
      return isInventoryTile(curX, curY + 1);
    } catch (e) {
      return false;
    }
  };

  function isEnemyTile(x, y) {
    return [ENEMY].indexOf(_map[y][x]) !== -1;
  }

  map.hasEnemyOnLeft = function() {
    try {
      return isEnemyTile(curX - 1, curY);
    } catch (e) {
      return false;
    }
  };

  map.hasEnemyOnRight = function() {
    try {
      return isEnemyTile(curX + 1, curY);
    } catch (e) {
      return false;
    }
  };

  map.hasEnemyUp = function() {
    try {
      return isEnemyTile(curX, curY - 1);
    } catch (e) {
      return false;
    }
  };

  map.hasEnemyDown = function() {
    try {
      return isEnemyTile(curX, curY + 1);
    } catch (e) {
      return false;
    }
  };

  map.currentCoordinates = function() {
    return [curX, curY];
  };

  map.nearestWalkableTile = function(x, y) {
    var coords = [x, y];
    // Is this possible? check for fat fingering a close by space
    if (!walkableTile(x, y)) {
      // TODO measure distance and pick the closest...
      if (walkableTile(x, y + 1)) {
        coords[1] += 1;
      } else if (walkableTile(x, y - 1)) {
        coords[1] -= 1;
      } else if (walkableTile(x + 1, y)) {
        coords[0] += 1;
      } else if (walkableTile(x - 1, y)) {
        coords[0] -= 1;
      } else {
        coords = [];
      }
    }
    console.log('nearest returning', coords);
    return coords;
  };

  map.map = _map;

  function rand(max) {
    return Math.round(Math.random() * (max - 1));
  }

})();