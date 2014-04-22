(function() {

  // Spaceship layout is randomly generated based on a grab
  // bag of rooms, each room being made out of 11x11 tiles.
  // These rooms must connect.

  var airlock = [
    ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
    ['S', 'a', 'a', ' ', ' ', ' ', 'S', 'S', 'S'],
    ['S', 'a', 'a', 'S', 'S', ' ', 'S', 'S', 'S'],
    ['S', 'a', 'a', 'S', 'S', ' ', 'S', 'S', 'S'],
    ['S', 'S', 'S', 'S', 'S', ' ', ' ', ' ', ' '],
    ['S', ' ', ' ', 'S', 'S', ' ', 'S', 'S', 'S'],
    ['S', ' ', ' ', 'S', 'S', ' ', 'S', 'S', 'S'],
    ['S', ' ', ' ', ' ', ' ', ' ', 'S', 'S', 'S'],
    ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
  ];

  var diningHall = [
    ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
    ['S', 'S', 'S', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', 'S', 'S', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', 'S', 'S', ' ', ' ', ' ', ' ', ' ', 'S'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', 'S', 'S', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', 'S', 'S', 'S', ' ', 'S', 'S', 'S', 'S'],
    ['S', 'S', 'S', 'S', ' ', 'S', 'S', 'S', 'S'],
    ['S', 'S', 'S', 'S', ' ', 'S', 'S', 'S', 'S']
  ];

  var sleepingQuarters = [
    ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
    ['S', 'b', 'b', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', ' ', ' ', ' ', ' ', 'S', 'b', 'b', 'S'],
    ['S', 'S', 'S', 'S', ' ', 'S', 'S', 'S', 'S'],
    ['S', 'S', 'S', 'S', ' ', ' ', ' ', ' ', ' '],
    ['S', 'S', 'S', 'S', ' ', 'S', 'S', 'S', 'S'],
    ['S', 'b', 'b', ' ', ' ', 'S', 'b', 'b', 'S'],
    ['S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
  ];

  var commandCenter = [
    ['S', 'S', 'S', 'S', ' ', 'S', 'S', 'S', 'S'],
    ['S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', ' ', 'S', 'S', 'S', 'S', 'S', ' ', 'S'],
    ['S', ' ', 'S', 'S', 'S', 'S', 'S', ' ', 'S'],
    [' ', ' ', 'S', 'S', 'S', 'S', 'S', ' ', ' '],
    ['S', ' ', 'S', 'S', 'S', 'S', 'S', ' ', 'S'],
    ['S', ' ', 'S', 'S', 'S', 'S', 'S', ' ', 'S'],
    ['S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S'],
    ['S', 'S', 'S', 'S', ' ', 'S', 'S', 'S', 'S']
  ];

  var possibleRooms;
  var map;
  var prevRoomCoords;
  var startX, startY, curX, curY;

  window.map.mapByTile = {
    generateMap: function() {

      // TODO this would be necissary plus a random amount of rooms
      possibleRooms = [
        //airlock, diningHall, sleepingQuarters, commandCenter
        commandCenter
      ];

      map = {};

      // Player starting position, will be adjusted to
      // a walkable tile with the nearest room
      startX = curX = 0;
      startY = curY = 0;


      chooseRoom(startX, startY);
      var _map = normalize(map);

      return _map;
    }
  };
  // Test accessors for private functions
  window.map.mapByTile.test = {};

  function chooseRoom(originX, originY) {
    var searching = true;
    while (searching) {


      var room = choose(possibleRooms);

      // Out of Rooms, finished!
      if (undefined === room) {
        return cleanup();
      }

      // How will we flip and/or rotate a room?
      var possibleOrientations = [
        // Normal
        'N', 'E', 'S', 'W'
        // Flipped
        //'FN', 'FE', 'FS', 'FW'
      ];

      var matches = [];



      // First time here!
      if (undefined === prevRoomCoords) {

        var orientation = choose(possibleOrientations);

        return placeRoom(room, orientation);
      }

      possibleOrientations.forEach(function(orientation) {
        if (testRoomOrientationAgainstMap(room, orientation)) {
          matches.push(orientation);
        }
      });

      if (0 === matches.length) {
        // TODO badFits.push(room);
      } else {
        searching = false;
        var orientation = choose(matches);
        curX = originX;
        curY = originY;
        console.log('AOK found a fit, placing at ', originX, originY, orientation);
        return placeRoom(room, orientation);
      }
    }
  }

  function placeRoom(room, orientation) {
    var tiles = flipAndRotate(room, orientation);
    //console.log('Setting ' + curX + ',' + curY + ' @' + orientation);
    var mapKey = curX + ',' + curY;
    //console.log('writing to map', mapKey);
    map[mapKey] = {
      x: curX,
      y: curY,
      tiles: tiles,
      connections: parseConnections(mapKey, tiles)
    };
    // TODO return badFits to possibleRooms
    growRandomConnection();
  }

  function flipAndRotate(room, orientation) {
    var rotated, row, x, y;
    // Treat North as ... North
    if ('N' === orientation) {
      return room;
      // Treat East as North (90CCW)
    } else if ('E' === orientation) {
      rotated = [];
      for (y = room[0].length - 1; y >= 0; y--) {
        row = [];
        for (x = 0; x < room.length; x++) {
          row.push(room[x][y]);
        }
        rotated.push(row);
      }

    } else if ('S' === orientation) {
      rotated = [];
      for (y = room.length - 1; y >= 0; y--) {
        row = [];
        for (x = room[0].length - 1; x >= 0; x--) {
          row.push(room[y][x]);
        }
        rotated.push(row);
      }


    } else if ('W' === orientation) {
      rotated = [];
      for (y = 0; y < room.length; y++) {
        row = [];
        for (x = room[0].length - 1; x >= 0; x--) {
          row.push(room[x][y]);
        }
        rotated.push(row);
      }

    }
    return rotated;
  }

  // Automated tests
  window.map.mapByTile.test.flipAndRotate = flipAndRotate;

  function growRandomConnection() {

    var mapKeys = Object.keys(map);
    var unconnected = [];
    mapKeys.forEach(function(mapKey) {
      map[mapKey].connections.forEach(function(conn) {
        if (null === conn.nextRoom) {

          unconnected.push(conn);
        }
      });
    });
    if (0 === unconnected.length) {
      return cleanup();
    }
    var nextConnection = choose(unconnected);

    var nextRoom = calcNextRoom(nextConnection);

    var prevRoom = map[nextConnection.mapKey];
    var nextRoomOriginCoors = tileToRoomOriginCoords(
      nextRoom[0],
      nextRoom[1],
      prevRoom.tiles[0].length - 1,
      prevRoom.tiles.length - 1);


    // TODO do we mean target room instead of current room?
    curX = nextRoomOriginCoors[0];
    curY = nextRoomOriginCoors[1];

    console.log('Were heading into ', curX, curY);

    nextConnection.nextRoom =
      nextRoomOriginCoors[0] + ',' + nextRoomOriginCoors[1];

    chooseRoom(nextRoomOriginCoors[0], nextRoomOriginCoors[1]);
  }



  /**
   * [origin, 0, X, 0, 0],
     [A,      0, 0, 0, B]
     [0,      0, Z, 0, 0]
   */
  function calcNextRoom(nextConnection) {
    prevRoomCoords = [curX, curY];
    var curRoom = map[nextConnection.mapKey];



    curX = curRoom.x;
    curY = curRoom.y;

    var x = nextConnection.connX;
    var y = nextConnection.connY;
    var tiles = curRoom.tiles;
    var height = tiles.length - 1;
    var width = tiles[0].length - 1;



    // Are we headed West?
    if (x === curX) {
      return [x - width, y];

      // Are we headed North?
    } else if (y === curY) {

      return [x, y - height];
      // Are we heade South?
    } else if (height + curY === y) {

      return [x, y + height];
      // Must be East
    } else {

      return [x + width, y];
    }
  }

  function parseConnections(mapKey, tiles) {

    // TODO iterate tiles
    // for each connection make
    // { nextRoom: null, mapKey: 'x,y',
    //   connX: 33, connY: -12
    //  }
    // mapKey is a room origin
    // Could be optimized to only look at X or Y === first or last...
    // that is assert.fail(actual, expected, message, operator, stackStartFunction);
    var conns = [];
    var xEdges = [0, tiles[0].length - 1];
    var yEdges = [0, tiles.length - 1];
    //console.log("looking for xs=", xEdges.join(','), 'ys=', yEdges.join(','));
    for (var y = 0; y < tiles.length; y++) {
      for (var x = 0; x < tiles[y].length; x++) {
        //console.log(x, y, tiles[y][x]);
        if (xEdges.indexOf(x) !== -1 ||
          yEdges.indexOf(y) !== -1) {
          if (' ' === tiles[y][x]) {
            //console.log('connection ', x, ',', y);
            conns.push({
              nextRoom: null,
              mapKey: mapKey,
              connX: x,
              connY: y
            });
          }
        }
      }
    }
    return conns;
  }

  function testRoomOrientationAgainstMap(room, orientation) {
    var compatible = false;
    var mapKey = curX + ',' + curY;
    console.log(curX, curY, room, orientation);


    var tiles = flipAndRotate(room, orientation);
    var adjacent = [];

    var width = room[0].length - 1;
    var height = room.length - 1;

    var northMapKey = curX + ',' + (curY - height);
    var eastMapKey = (curX + width) + ',' + curY;
    var southMapKey = curX + ',' + (curY + height);
    var westMapKey = (curX - width) + ',' + curY;



    if (map[northMapKey]) {
      adjacent.push(testRoomOrientation(
        southTiles(map[northMapKey].tiles),
        northTiles(room)
      ));
    }
    if (map[eastMapKey]) {

      adjacent.push(testRoomOrientation(
        westTiles(map[eastMapKey].tiles),
        eastTiles(room)
      ));
    }
    if (map[southMapKey]) {

      adjacent.push(testRoomOrientation(
        northTiles(map[southMapKey].tiles),
        southTiles(room)
      ));
    }
    if (map[westMapKey]) {

      adjacent.push(testRoomOrientation(
        eastTiles(map[westMapKey].tiles),
        westTiles(room)
      ));
    }


    for (var i = 0; i < adjacent.length; i++) {

      if (adjacent[i]) {
        console.log('AOK yay, compatible rooms');
        compatible = true;
      }
    }

    return compatible;
  }

  function northTiles(room) {
    return room[0];
  }

  function eastTiles(room) {
    var eastern = [];
    var x = room[0].length - 1;
    for (var i = 0; i < room.length; i++) {
      eastern.push(room[i][x]);
    }
    return eastern;
  }

  function southTiles(room) {
    return room[room.length - 1];
  }

  function westTiles(room) {
    var western = [];
    var x = 0;
    for (var i = 0; i < room.length; i++) {
      western.push(room[i][x]);
    }
    return western;
  }

  function testRoomOrientation(rowA, rowB) {
    console.log(rowA, rowB);
    var match = false;
    for (var i = 0; i < rowA.length; i++) {
      if (' ' === rowA[i] &&
        rowA[i] === rowB[i]) {
        match = true;
      }
    }
    return match;
  }

  function cleanup() {
    console.log('CLEANUP');
  }

  /**
   * Given a set of tile coordinates, return the upper left
   * tile coordinates of the current room.

   var roomOrigin = tileToRoomOriginCoords(startX, startY);

   */
  function tileToRoomOriginCoords(startX, startY, width, height) {


    //console.log(startX, startY, width, height, 'gives us', startX - (startX % width), startY - (startY % height));

    return [startX - (startX % width), startY - (startY % height)];
  }

  // Establish map dimensions
  function normalize(aMap) {
    var _map = [];
    var minX, maxX, minY, maxY;

    var keys = Object.keys(aMap);
    keys.forEach(function(mapKey) {
      var orig = mapKey.split(',');
      orig[0] = parseInt(orig[0], 10);
      orig[1] = parseInt(orig[1], 10);
      if (undefined === minX || minX > orig[0]) {
        minX = orig[0];
      }
      if (undefined === maxX ||
        maxX < orig[0]) {
        maxX = orig[0];
      }
      if (undefined === minY || minY > orig[1]) {
        minY = orig[1];
      }
      if (undefined === maxY ||
        maxY < orig[1]) {
        maxY = orig[1];
      }
    });

    // Bug if we switch to variable sized rooms...

    // Add width of a tile
    var tiles = map[keys[0]].tiles;
    var width = tiles[0].length - 1;
    var height = tiles[1].length - 1;
    //console.log('minX', minX, 'maxX', maxX, 'minY', minY, 'maxY', maxY);
    maxX += (width);
    maxY += (height);

    for (var y = 0; y < maxY - minY; y++) {
      _map.push([]);
      for (var x = 0; x < maxX - minY; x++) {
        //console.log('accessmap ', width, height);
        _map[y].push(accessMap(x + minX, y + minY, width, height));
      }
    }

    //console.log('minX', minX, 'maxX', maxX, 'minY', minY, 'maxY', maxY);
    //console.log(aMap);

    startX = Math.abs(minX);
    startY = Math.abs(minY);

    var findingHallway = true;
    while (findingHallway) {
      var r = Math.random();
      if (r < 0.25) {
        startX += 1;
      } else if (r < 0.5) {
        startY += 1;
      } else if (r < 0.75) {
        startX -= 1;
      } else {
        startY -= 1;
      }
      try {
        if (' ' === _map[startY][startX]) {
          findingHallway = false;
        }
      } catch (e) {}

    }

    debugPrintMap(_map);

    return {
      map: _map,
      startX: startX,
      startY: startY,
      curX: startX,
      curY: startY
    }
  }

  function accessMap(x, y, width, height) {
    //console.log('accessMap x=', x, 'y=', y, 'width=', width, 'height=', height);
    var orig = tileToRoomOriginCoords(x, y, width, height);
    //console.log('origin', orig);
    var mapKey = orig[0] + ',' + orig[1];

    if ( !! map[mapKey] && !! map[mapKey].tiles) {

      x = Math.abs(x % width);
      y = Math.abs(y % height);
      //console.log('tileis ', map[mapKey].tiles[y][x]);
      return map[mapKey].tiles[y][x];
    } else {
      // Solid wall?
      return 'S';
    }

  }

  function choose(list) {
    var i = Math.floor(Math.random() * list.length);
    return list.splice(i, 1)[0];
  }

  function rand(min, max) {
    if (undefined === max) {
      max = min;
      min = 0;
    }
    var range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
  }

  function debugPrintMap(map) {
    var js = [];
    var b = "";
    for (var row2 = 0; row2 < map.length; row2++) {
      b += row2 + ': ' + map[row2].join('') + '\n';
      js.push('[' + map[row2].join("','") + '],\n');

    }
    console.log(b);
  }
})();