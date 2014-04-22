/* global: test, equal, ok, deepEqual, astar */
function debugPrintMap(map) {
  var js = [];
  var b = "\n";
  for (var row2 = 0; row2 < map.length; row2++) {
    b += row2 + ': ' + map[row2].join('') + '\n';
    js.push('[' + map[row2].join("','") + '],\n');

  }
  console.log(b);
}
test("Test A*", function() {
  var map = [
    //0    1    2    3    4
    ['#', '#', '#', '#', '#'], // 0
    ['#', ' ', ' ', ' ', ' '], // 1
    ['#', ' ', '#', '#', ' '], // 2
    ['#', ' ', '#', ' ', ' '], // 3
    ['#', ' ', ' ', ' ', '#'], // 4
    ['#', ' ', '#', ' ', '#'], // 5
    ['#', ' ', '#', ' ', '#'], // 6
    ['#', '#', '#', '#', '#'] // 7
  ];
  var path1 = [
    [1, 6],
    [1, 5],
    [1, 4],
    [2, 4],
    [3, 4],
    [3, 5],
    [3, 6]
  ];

  deepEqual(astar(map, [1, 6], [3, 6]), path1, 'Picks the short path');

  var path2 = [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [3, 5],
    [3, 6]
  ];
  deepEqual(astar(map, [1, 1], [3, 6]), path2, 'Picks the short path');

  var path3 = [
    [4, 1],
    [4, 2],
    [4, 3],
    [3, 3],
    [3, 4],
    [2, 4],
    [1, 4]
  ];
  deepEqual(astar(map, [4, 1], [1, 4]), path3, 'Picks the short path');

  var path4 = [
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1]
  ];
  deepEqual(astar(map, [4, 1], [1, 1]), path4, 'Picks the short path');
});

function refreshMap() {
  return [
    //0    1    2    3    4    5    6
    ['S', 'S', 'S', 'S', 'S', 'S', 'S'], // 0
    ['S', 'S', 'S', 'S', 'S', 'S', 'S'], // 1
    ['S', 'S', ' ', 'S', 'S', 'S', 'S'], // 2
    ['S', 'S', ' ', ' ', 'S', 'S', 'S'], // 3
    ['S', 'S', ' ', 'S', 'S', 'S', 'S'], // 4
    ['S', 'S', ' ', 'S', 'S', 'S', 'S'], // 5
    ['S', 'S', 'S', 'S', 'S', 'S', 'S'], // 6
    ['S', 'S', 'S', 'S', 'S', 'S', 'S'], // 7
    ['S', 'S', 'S', 'S', 'S', 'S', 'S'], // 8
    ['S', 'S', ' ', 'S', 'S', 'S', 'S'], // 9
    ['S', ' ', ' ', ' ', ' ', 'S', 'S'], // 10
    ['S', 'S', 'S', 'S', 'S', 'S', 'S'], // 11
    ['S', 'S', 'S', 'S', 'S', 'S', 'S'] // 12
  ];
}
test("Map decoration regular and 90CCW", function() {

  var util = window.mapDecoratorUtil;
  var map = refreshMap();
  var deadEndCorridor2bedRoom = [
    [
      ['S', 'S', 'S', 'S', 'S'],
      ['S', 'S', ' ', 'S', 'S'],
      ['S', 'S', ' ', ' ', 'S'],
      ['S', 'S', ' ', 'S', 'S']
    ],
    [
      ['*', '*', '*', '*', '*'],
      ['!', '!', '!', '!', '!'],
      ['S', ' ', ' ', ' ', 'S'],
      ['S', 's', ' ', ' ', 'S']
    ]
  ];
  equal(util.isPattern(map, deadEndCorridor2bedRoom[0], 0, 0), false, 'Mismatches do not match');
  equal(util.isPattern(map, deadEndCorridor2bedRoom[0], 0, 1), true, 'Matches work');
  util.applyPattern(map, deadEndCorridor2bedRoom[1], 0, 1);

  deepEqual(map[1].slice(0, 5), deadEndCorridor2bedRoom[1][0], 'We updated the map with the new pattern');
  deepEqual(map[2].slice(0, 5), deadEndCorridor2bedRoom[1][1]);
  deepEqual(map[3].slice(0, 5), deadEndCorridor2bedRoom[1][2]);
  deepEqual(map[4].slice(0, 5), deadEndCorridor2bedRoom[1][3]);

  map = refreshMap();
  // Rotate pattern 90 should match upper left corner 0,8
  ok(util.is90CCWPattern(map, deadEndCorridor2bedRoom[0], 0, 8), 'Matches work at 90 CCW');

  util.apply90CCWPattern(map, deadEndCorridor2bedRoom[1], 0, 8);
  var rot90CCWPat = [
    ['*', '!', 'S', 'S'],
    ['*', '!', ' ', ' '],
    ['*', '!', ' ', ' '],
    ['*', '!', ' ', 's'],
    ['*', '!', 'S', 'S']
  ];
  deepEqual(map[8].slice(0, 4), rot90CCWPat[0], 'We updated the map with the new pattern');
  deepEqual(map[9].slice(0, 4), rot90CCWPat[1]);
  deepEqual(map[10].slice(0, 4), rot90CCWPat[2]);
  deepEqual(map[11].slice(0, 4), rot90CCWPat[3]);
  deepEqual(map[12].slice(0, 4), rot90CCWPat[4]);
});

test("Map decorator 90", function() {
  var util = window.mapDecoratorUtil;
  var map = refreshMap();

  /* Snapshot of map at 1,0
       1    2    3    4
    [ 'S', 'S', 'S', 'S', 0
    [ 'S', 'S', 'S', 'S', 1
    [ 'S', ' ', 'S', 'S', 2
    [ 'S', ' ', ' ', 'S', 3
    [ 'S', ' ', 'S', 'S', 4
    */

  var makeWalledRoom = [
    [
      ['S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', ' ', 'S'],
      ['S', 'S', ' ', ' ', ' '],
      ['S', 'S', 'S', 'S', 'S']
    ],
    [
      ['S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', '@', 'S'],
      ['S', '!', '!', '!', '!'],
      ['S', 'S', 'S', 'S', 'S']
    ]
  ];
  // Rotate pattern 90 should match upper left corner 0,8
  ok(util.is90Pattern(map, makeWalledRoom[0], 1, 0), 'Matches work at 90 clockwize');
  util.apply90Pattern(map, makeWalledRoom[1], 1, 0);
  var rot90Pat = [
    ['S', 'S', 'S', 'S'],
    ['S', '!', 'S', 'S'],
    ['S', '!', 'S', 'S'],
    ['S', '!', '@', 'S'],
    ['S', '!', 'S', 'S']
  ];
  deepEqual(map[0].slice(1, 5), rot90Pat[0], 'We updated the map with the new pattern');
  deepEqual(map[1].slice(1, 5), rot90Pat[1]);
  deepEqual(map[2].slice(1, 5), rot90Pat[2]);
  deepEqual(map[3].slice(1, 5), rot90Pat[3]);
  deepEqual(map[4].slice(1, 5), rot90Pat[4]);

});

test("Map decorator 180", function() {

  var util = window.mapDecoratorUtil;
  var map = refreshMap();

  /* Snapshot of map at 1,0
       1    2    3    4
    [ 'S', 'S', 'S', 'S', 0
    [ 'S', 'S', 'S', 'S', 1
    [ 'S', ' ', 'S', 'S', 2
    [ 'S', ' ', ' ', 'S', 3
    [ 'S', 'x', 'S', 'S', 4
    */

  var makeWalledRoom = [
    [ // 0   1     2    3
      ['S', 'S', ' ', 'S'], // 0
      ['S', ' ', ' ', 'S'], // 1
      ['S', 'S', ' ', 'S'], // 2
      ['S', 'S', 'S', 'S'], // 3
      ['S', 'S', 'S', 'S'] // 4
    ],
    [
      ['S', 'S', 'S', 'S'],
      ['S', '!', '!', 'S'],
      ['S', '!', '!', 'S'],
      ['S', ' ', ' ', 'S'],
      ['S', ' ', 'S', 'S']
    ]
  ];
  // Rotate pattern 90 should match upper left corner 0,8
  ok(util.is180Pattern(map, makeWalledRoom[0], 1, 0), 'Matches work at 180 rotation');

  util.apply180Pattern(map, makeWalledRoom[1], 1, 0);
  var rot180Pat = [
    ['S', 'S', ' ', 'S'],
    ['S', ' ', ' ', 'S'],
    ['S', '!', '!', 'S'],
    ['S', '!', '!', 'S'],
    ['S', 'S', 'S', 'S']
  ];
  deepEqual(map[0].slice(1, 5), rot180Pat[0], 'We updated the map with the new pattern');
  deepEqual(map[1].slice(1, 5), rot180Pat[1]);
  deepEqual(map[2].slice(1, 5), rot180Pat[2]);
  deepEqual(map[3].slice(1, 5), rot180Pat[3]);
  deepEqual(map[4].slice(1, 5), rot180Pat[4]);

});

test('Test map_by_tile flipAndRotate', function() {
  var flipAndRotate = window.map.mapByTile.test.flipAndRotate;
  var room = [
    ['A', 'S', 'S', 'S', 'N', 'S', 'S', 'S', 'B'],
    ['S', 'a', 'a', ' ', ' ', ' ', 'S', 'S', 'S'],
    ['S', 'a', 'a', 'S', 'S', ' ', 'S', 'S', 'S'],
    ['S', 'a', 'a', 'S', 'S', ' ', 'S', 'S', 'E'],
    ['S', 'S', 'S', 'S', 'S', ' ', ' ', ' ', ' '],
    ['W', ' ', ' ', 'S', 'S', ' ', 'S', 'S', 'S'],
    ['S', ' ', ' ', 'S', 'S', ' ', 'S', 'S', 'S'],
    ['S', ' ', ' ', ' ', ' ', ' ', 'S', 'S', 'S'],
    ['C', 'S', 'S', 'S', 's', 'S', 'S', 'S', 'D']
  ];

  deepEqual(room, flipAndRotate(room, 'N'));

  /* East
0: BSSE SSSD
1: SSSS SSSS
2: SSSS SSSS
3: S       S
4: N SSSSS s
5: S SSSSS S
6: SaaaS   S
7: SaaaS   S
8: ASSSSWSSC
*/

  var eRoom = flipAndRotate(room, 'E');
  var eRow1 = ['B', 'S', 'S', 'E', ' ', 'S', 'S', 'S', 'D'];
  deepEqual(eRow1, eRoom[0]);

  var eLastRow = ['A', 'S', 'S', 'S', 'S', 'W', 'S', 'S', 'C'];
  deepEqual(eLastRow, eRoom[8]);



  /* South
0: DSSSsSSSC
1: SSS     S
2: SSS SS  S
3: SSS SS  W
4:     SSSSS
5: ESS SSaaS
6: SSS SSaaS
7: SSS   aaS
8: BSSSNSSSA
*/
  var sRoom = flipAndRotate(room, 'S');

  var sRow1 = ['D', 'S', 'S', 'S', 's', 'S', 'S', 'S', 'C'];
  deepEqual(sRow1, sRoom[0]);

  var sLastRow = ['B', 'S', 'S', 'S', 'N', 'S', 'S', 'S', 'A'];
  deepEqual(sLastRow, sRoom[8]);

/* West
0: CSSWSSSSA
1: S   SaaaS
2: S   SaaaS
3: S SSSSS S
4: s SSSSS N
5: S       S
6: SSSS SSSS
7: SSSS SSSS
8: DSSS ESSB
*/
  var wRoom = flipAndRotate(room, 'W');
  var wRow1 = ['C','S','S','W','S','S','S','S','A'];
deepEqual(wRow1, wRoom[0]);
  var wLastRow = ['D','S','S','S',' ','E','S','S','B'];
  deepEqual(wLastRow, wRoom[8]);
  debugPrintMap(wRoom);

});