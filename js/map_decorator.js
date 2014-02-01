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

  function iter90CCW(pattern, map, cb) {

  }

  /**
   * 90CCW x, y of map are normal top left
   */
  function is90CCWPattern(map, pattern, x, y) {
    // swap x and y
    // iterate y backwards
    // so
    // 1, 0 should actually be 0, 3
    // 3, 2 should actually be 2, 1
console.log('BIZAROOO WORLD');
    var mapY = 0;
    for (var yy = pattern[0].length - 1; yy >= 0; yy--) {
      for (var xx = 0; xx < pattern.length; xx++) {
        if (mapY + y >= map.length ||
          xx + x > map[0].length ||
          map[mapY + y][xx + x] !== pattern[xx][yy]) {
          console.log('bailing on mapY=', mapY, 'yy=', yy, 'xx=', xx, 'pattern[xx][yy]=[' + pattern[xx][yy] + ']');
          return false;
        }
        console.log('PASSED on mapY=', mapY, 'yy=', yy, 'xx=', xx, 'pattern[xx][yy]=[' + pattern[xx][yy] + ']');
      }
      console.log('---------------------');
      mapY++;
    }
    console.log('BOO Ya');
    return true;
  }
  window.mapDecoratorUtil.is90CCWPattern = is90CCWPattern;
/*
var a =
[[0, 1, 2],  [[6, 3, 0],  [[8, 7, 6],
 [3, 4, 5],   [7, 4, 1],   [5, 4, 3],
 [6, 7, 8]]   [8, 5, 2]]   [2, 1, 0]]

// 0, 0 - 0  --- 0
// 0, 1 - 1  --- 3
// 0, 2 - 2  --- 6
// 1, 0 - 3  --- 1
// 1, 1 - 4  --- 4
// 1, 2 - 5  --- 7
*/
  function applyPattern(map, pattern, x, y) {
    for (var yy = 0; yy < pattern.length; yy++) {
      for (var xx = 0; xx < pattern[yy].length; xx++) {
        console.log('REPLACING')
        console.log(map[yy+y][xx+x], pattern[yy][xx]);
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