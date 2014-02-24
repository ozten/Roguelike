(function() {

<<<<<<< HEAD
    var corridor2bedRoom = [
=======

  var SPACE = 'S';
  var PATH = ' ';
  var AIRLOCK = 'a';
  var SLEEPING_QUARTERS = 'q';
  var BED = 'b';
  var RESTROOM = 'R';
  var SPACE2 = 'X';
  var SPARE_PART = 'p';
  var ENEMY = 'e';

  var corridor2bedRoom = [
>>>>>>> 08586e0d777e04de48bd1dcd237e2da5d5cc9716
    // Sleeping quarters
    [
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S']
    ],
    [
      ['s', 's', 'q', 's', 's'],
      ['s', 'b', 'q', 'q', 's'],
      ['s', 'b', 'q', 'q', 's'],
      ['s', 'q', 'q', 'b', 's'],
      ['s', 'q', 'q', 'b', 's'],
      ['s', 's', 'q', 's', 's']
    ]
  ];

  var corridor3bedRoom = [
    // Sleeping quarters
    [
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', 'S', 'S', 'S'],
      [' ', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S']
    ],
    [
      ['s', 'q', 'q', 'q', 's'],
      ['s', 'b', 'q', 'q', 'q'],
      ['s', 'b', 'q', 'b', 'b'],
      ['s', 'q', 'q', 'q', 'q'],
      ['s', 'q', 'q', 'b', 'b'],
      ['s', 'q', 'q', 'q', 'q']
    ]
  ];

  var deadEndCorridor2Airlock = [

    [
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S']
    ],
    [
      ['s', 's', 'a', 's', 's'],
      ['s', 'a', 'a', 's', 's'],
      ['s', 'a', 'a', 's', 's'],
      ['s', 'a', 's', 's', 's'],
      ['s', 's', 's', 's', 's'],
      ['s', 's', 's', 's', 's']
    ]
  ];

  var Restroom = [
    // Restroom
    [
      [' ', 'S', ' ', 'S', 'S'],
      [' ', 'S', ' ', 'S', 'S'],
      [' ', 'S', ' ', 'S', 'S'],
      [' ', 'S', ' ', 'S', 'S'],
      [' ', 'S', ' ', 'S', 'S'],
      [' ', 'S', ' ', 'S', 'S']
    ],
    [
      ['s', 's', 's', 'R', 'R'],
      ['s', 's', 's', 'R', 'R'],
      ['s', 's', 's', 'R', 'R'],
      ['R', 'R', 'R', 'R', 'R'],
      ['R', 'R', 'R', 'R', 'b'],
      ['s', 'R', 'R', 's', 's']
    ]
  ];
  var DiningHall = [
    // Dining Hall
    [
      [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ',' ', ' ', ' ', 'S', ' '],
      [' ', ' ', ' ', ' ',' ', ' ', ' ', 'S', ' '],
      [' ', ' ', ' ', ' ',' ', ' ', ' ', 'S', ' '] 
    ],
    [
      ['s', 's', 'b', 'd', 'b', 'd', 'b', 's', 's'],
      ['s', 's', 'b', 'd', 'b', 'd', 'b', 's', 's'],
      ['d', 'd', 'd', 'd', 'd', 'd', 'b', 's', 's'],
      ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'],
      ['s', 's', 'b', 'b', 'b', 'd', 'd', 'd', 'd'] 
    ],
  ];
  var corridor1 = [
    // corridor 1
    [
      ['S', ' ', ' '],
      ['S', ' ', ' '],
      ['S', ' ', 'S']
    ],
    [
      ['s', 'c', 'c'],
      ['s', 'c', 'c'],
      ['s', 'c', 'b']
    ],
  ];
  var corridor2 = [
    // corridor 2
    [
      ['S', ' ', 'S', ' '],
      ['S', ' ', 'S', ' '],
      [' ', ' ', 'S', ' '],
      ['S', 'S', 'S', ' ']
    ],
    [
      ['s', 'b', 'c', 'c'],
      ['s', 'c', 'c', 'c'],
      ['c', 'c', 'c', 'c'],
      ['s', 's', 's', 'c']
    ],
  ];
  var corridor3 = [
    // corridor 3
    [
      ['S', 'S', 'S', ' ', 'S'],
      ['S', 'S', 'S', ' ', 'S'],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      ['S', 'S', 'S', ' ', ' ']
    ],
    [
      ['s', 's', 's', ' ', 's'],
      ['s', 's', 's', ' ', 's'],
      ['s', 's', 's', ' ', ' '],
      ['s', 's', 's', ' ', ' '],
      ['s', 's', 's', 's', 's']
    ],
  ];
  var corridor4 = [
    // corridor 4
    [
      ['S', 'S', 'S', ' ', ' ', ' '],
      ['S', 'S', 'S', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' '],
      ['S', 'S', 'S', ' ', 'S', ' '],
      ['S', 'S', 'S', ' ', 'S', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ']
    ],
    [
      ['S', 'S', 'S', ' ', 'S', ' '],
      ['S', 'S', 'S', ' ', 'S', ' '],
      ['S', 'S', 'S', ' ', 'S', ' '],
      ['S', 'S', 'S', ' ', 'S', ' '],
      ['S', 'S', 'S', ' ', 'S', ' '],
      ['S', 'S', 'S', ' ', 'S', ' ']
    ],
   ];
  var corridor5 = [
    // corridor 2
    [
      ['S', ' ', 'S', ' '],
      ['S', ' ', 'S', ' '],
      ['S', ' ', 'S', ' '],
      ['S', ' ', ' ', ' ']
    ],
    [
      ['c', 'c', 'c', 'c'],
      ['c', 's', 's', 'c'],
      ['c', 's', 's', 'c'],
      ['c', 'c', 'c', 'c']
    ],
  ];   
  var fill1 = [
    // Space Fill 1
    [
      [' ', 'S', 'S', 'S'],
      [' ', 'S', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ']
    ],
    [
      ['s', 's', 's', 's'],
      ['s', 's', 's', 's'],
      ['s', 's', 's', 's'],
      ['s', 's', 's', 's']
    ],
  ];


  window.mapDecorator = function(map) {
    var dMap = [];
    for (var y = 0; y < map.length; y++) {
      dMap.push([]);
      for (var x = 0; x < map[0].length; x++) {
        dMap[y].push(map[y][x]);
      }
    }
    for (var y1 = 0; y1 < map.length; y1++) {
      for (var x1 = 0; x1 < map[0].length; x1++) {
        tryPattern(dMap, x1, y1, deadEndCorridor2Airlock);
        tryPattern(dMap, x1, y1, corridor2bedRoom);
        tryPattern(dMap, x1, y1, corridor3bedRoom);
        tryPattern(dMap, x1, y1, Restroom);
        tryPattern(dMap, x1, y1, DiningHall);
        tryPattern(dMap, x1, y1, corridor1);
        tryPattern(dMap, x1, y1, corridor2);
        tryPattern(dMap, x1, y1, corridor3);
        tryPattern(dMap, x1, y1, corridor4);
        tryPattern(dMap, x1, y1, corridor5);
        tryPattern(dMap, x1, y1, fill1);
      }
    }

    for (var y2 = 0; y2 < map.length; y2++) {
      for (var x2 = 0; x2 < map[0].length; x2++) {
        if (' ' === dMap[y2][x2]) {
          if (Math.random() < 0.1) {
            // Drop a spare part
            dMap[y2][x2] = SPARE_PART;
          } else if (Math.random() < 0.1) {
            dMap[y2][x2] = ENEMY;
          }
        }

      }
    }
    debugPrintMap(dMap);
    return dMap;
  };

  function tryPattern(dMap, x1, y1, pattern) {
    if (isPattern(dMap, pattern[0], x1, y1)) {
      applyPattern(dMap, pattern[1], x1, y1);
    }
    if (is90CCWPattern(dMap, pattern[0], x1, y1)) {
      apply90CCWPattern(dMap, pattern[1], x1, y1);
    }
    if (is90Pattern(dMap, pattern[0], x1, y1)) {
      apply90Pattern(dMap, pattern[1], x1, y1);
    }
    if (is180Pattern(dMap, pattern[0], x1, y1)) {
      apply180Pattern(dMap, pattern[1], x1, y1);
    }
  }

  /**
   * Compare a pattern (NxN multi-dimensional array) against
   * a map (multi-dimensional array) starting at the upper
   * left corner.
   */
  function isPattern(map, pattern, x, y) {
    for (var yy = 0; yy < pattern.length; yy++) {
      for (var xx = 0; xx < pattern[0].length; xx++) {
        if (yy + y >= map.length ||
          xx + x > map[0].length ||
          map[yy + y][xx + x] !== pattern[yy][xx]) {
          return false;
        }
      }
    }
    return true;
  }
  window.mapDecoratorUtil = {};
  window.mapDecoratorUtil.isPattern = isPattern;

  /**
   * Iterates a pattern at 90 counter clockwize
   * cb called on each cell function(err, mapX, mapY, patternX, patternY)
   * function returns true if there were never any errors iterating over cells
   */
  function iter90CCW(map, pattern, x, y, cb) {
    // swap x and y
    // iterate y backwards
    // so
    // 1, 0 should actually be 0, 3
    // 3, 2 should actually be 2, 1
    var mapY = 0;
    for (var yy = pattern[0].length - 1; yy >= 0; yy--) {
      for (var xx = 0; xx < pattern.length; xx++) {
        if (mapY + y >= map.length ||
          xx + x > map[0].length) {
          // We're done, never call finCb
          return false;
        } else { // Map x,  Map y Pattern x, y
          if (false === cb(xx + x, mapY + y, yy, xx)) {
            // Iterator bailing
            return false;
          }
        }
      }
      mapY++;
    }
    return true;
  }

  /**
   * Iterates a pattern at 90 clockwize
   * cb called on each cell function(err, mapX, mapY, patternX, patternY)
   * function returns true if there were never any errors iterating over cells
   */
  function iter90(map, pattern, x, y, cb) {
    // swap x and y
    // iterate x backwards
    for (var yy = 0; yy < pattern[0].length; yy++) {
      var mapX = 0;
      for (var xx = pattern.length - 1; xx > 0; xx--) {
        if (yy + y >= map.length ||
          mapX + x > map[0].length) {
          // Bail
          return false;
        } else { // Map x,  Map y Pattern x, y
          if (false === cb(mapX + x, yy + y, yy, xx)) {
            // Iterator bailing
            return false;
          }
        }
        mapX++;
      }
    }
    return true;
  }

  /**
   * Iterates a pattern at 180 rotated
   * cb called on each cell function(err, mapX, mapY, patternX, patternY)
   * function returns true if there were never any errors iterating over cells
   */
  function iter180(map, pattern, x, y, cb) {
    // iterate x and y backwards
    var mapY = 0;
    for (var yy = pattern.length - 1; yy >= 0; yy--) {
      var mapX = 0;
      for (var xx = pattern[0].length - 1; xx >= 0; xx--) {
        if (mapY + y >= map.length ||
          mapX + x > map[0].length) {
          // Bail
          return false;
        } else {

          if (false === cb(mapX + x, mapY + y, xx, yy)) {
            // Iterator bailing
            return false;
          }
        }
        mapX++;
      }
      mapY++;
    }
    return true;
  }

  function isPatternFn(map, pattern) {
    return function(mapX, mapY, patternX, patternY) {
      if (map[mapY][mapX] !== pattern[patternY][patternX]) {
        // Bail
        return false;
      }

      // Continue iterating
      return true;
    };
  }

  /**
   * 90CCW x, y of map are normal top left
   */
  function is90CCWPattern(map, pattern, x, y) {
    return iter90CCW(map, pattern, x, y, isPatternFn(map, pattern));
  }
  window.mapDecoratorUtil.is90CCWPattern = is90CCWPattern;

  /**
   * 90 clockwize x, y of map are normal top left
   */
  function is90Pattern(map, pattern, x, y) {
    return iter90(map, pattern, x, y, isPatternFn(map, pattern));
  }
  window.mapDecoratorUtil.is90Pattern = is90Pattern;

  /**
   * 180 x, y of map are normal top left
   */
  function is180Pattern(map, pattern, x, y) {
    return iter180(map, pattern, x, y, isPatternFn(map, pattern));
  }
  window.mapDecoratorUtil.is180Pattern = is180Pattern;

  function applyPattern(map, pattern, x, y) {
    for (var yy = 0; yy < pattern.length; yy++) {
      for (var xx = 0; xx < pattern[yy].length; xx++) {
        map[yy + y][xx + x] = pattern[yy][xx];
        //console.log(xx + x, yy + y, ' now ', map[yy+y][xx+x]);
      }
    }
  }
  window.mapDecoratorUtil.applyPattern = applyPattern;

  function applyPatternFn(map, pattern) {
    return function(mapX, mapY, patternX, patternY) {
      map[mapY][mapX] = pattern[patternY][patternX];
      //console.log(mapX, mapY, 'now', map[mapY][mapX]);
      // Continue iterating
      return true;
    };
  }

  function apply90CCWPattern(map, pattern, x, y) {
    return iter90CCW(map, pattern, x, y, applyPatternFn(map, pattern));
  }
  window.mapDecoratorUtil.apply90CCWPattern = apply90CCWPattern;

  function apply90Pattern(map, pattern, x, y) {
    return iter90(map, pattern, x, y, applyPatternFn(map, pattern));
  }
  window.mapDecoratorUtil.apply90Pattern = apply90Pattern;

  function apply180Pattern(map, pattern, x, y) {
    return iter180(map, pattern, x, y, applyPatternFn(map, pattern));
  }
  window.mapDecoratorUtil.apply180Pattern = apply180Pattern;

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