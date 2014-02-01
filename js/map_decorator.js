(function() {

  var deadEndCorridor2bedRoom = [
    [
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S']
    ],
    [
      ['*', '*', '*', '*', '*'],
      ['!', '!', '!', '!', '!'],
      ['S', ' ', ' ', ' ', 'S'],
      ['S', 's', ' ', ' ', 'S'],
      ['S', 's', ' ', ' ', 'S'],
      ['S', 's', ' ', ' ', 'S']
    ]
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
        if (isPattern(dMap, deadEndCorridor2bedRoom[0], x1, y1)) {
          applyPattern(dMap, deadEndCorridor2bedRoom[1], x1, y1);
        }

      }
    }

    debugPrintMap(dMap);
    return dMap;
  };

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
    console.log('BOO Ya');
    return true;
  };
  window.mapDecoratorUtil = {};
  window.mapDecoratorUtil.isPattern = isPattern;

  /**
   * cb called on each cell function(err, mapX, mapY, patternX, patternY)
   * finCb called if there were never any errors iterating over cells
   */
  function iter90CCW(map, pattern, x, y, cb, finCb) {
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
          return cb('out of range');
        } else {             // Map x,  Map y Pattern x, y
          if (false === cb(null, xx + x, mapY + y, xx, yy)) {
            // Iterator bailing
            return;
          }
        }
      }
      mapY++;
    }
    return finCb();
  }

  /**
   * 90CCW x, y of map are normal top left
   */
  function is90CCWPattern(map, pattern, x, y, cb) {
    iter90CCW(map, pattern, x, y, function(err, mapX, mapY, patternX, patternY) {
      if (map[mapY][mapX] !== pattern[patternX][patternY]) {
        cb(false);
        // Bail
        return false;
      }
      // Continue iterating
      return true;
    }, function() {
      cb(true);
    });
  }
  window.mapDecoratorUtil.is90CCWPattern = is90CCWPattern;

  function applyPattern(map, pattern, x, y) {
    for (var yy = 0; yy < pattern.length; yy++) {
      for (var xx = 0; xx < pattern[yy].length; xx++) {
        map[yy + y][xx + x] = pattern[yy][xx];
      }
    }
  }
  window.mapDecoratorUtil.applyPattern = applyPattern;

  function apply90CCWPattern(map, pattern, x, y, cb) {
    for (var yy = 0; yy < pattern.length; yy++) {
      for (var xx = 0; xx < pattern[yy].length; xx++) {
        map[yy + y][xx + x] = pattern[yy][xx];
      }
    }
  }
  window.mapDecoratorUtil.applyPattern = applyPattern;

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