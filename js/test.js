/* global: test, equal, ok, deepEqual, astar */

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
      [' ', ' ', ' ', 'S', 'S'],
      ['S', ' ', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S']
    ],
    [
      ['S', 'S', 'S', 'S', 'S'],
      ['S', '!', '!', '!', 'S'],
      ['S', '!', '!', '!', 'S'],
      ['S', 'S', 'S', 'S', 'S']
    ]
  ];
  // Rotate pattern 90 should match upper left corner 0,8
  ok(util.is90Pattern(map, makeWalledRoom[0], 1, 0), 'Matches work at 90 clockwize');
  util.apply90Pattern(map, makeWalledRoom[1], 1, 0);
  var rot90Pat = [
    ['S', 'S', 'S', 'S'],
    ['S', '!', '!', 'S'],
    ['S', '!', '!', 'S'],
    ['S', '!', '!', 'S'],
    ['S', 'S', 'S', 'S']
  ];
  deepEqual(map[0].slice(1, 5), rot90Pat[0], 'We updated the map with the new pattern');
  deepEqual(map[1].slice(1, 5), rot90Pat[1]);
  deepEqual(map[2].slice(1, 5), rot90Pat[2]);
  deepEqual(map[3].slice(1, 5), rot90Pat[3]);
  deepEqual(map[4].slice(1, 5), rot90Pat[4]);

  // TODO ... I did this wrong!

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