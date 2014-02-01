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
  var start = new Date();
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

  var path2 = [
    [4, 1],
    [4, 2],
    [4, 3],
    [3, 3],
    [3, 4],
    [2, 4],
    [1, 4]
  ];
  deepEqual(astar(map, [4, 1], [1, 4]), path2, 'Picks the short path');

  var path2 = [
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1]
  ];
  deepEqual(astar(map, [4, 1], [1, 1]), path2, 'Picks the short path');
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
asyncTest("Map decoration", function() {
  expect(12);
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

  var map = refreshMap();
  // Rotate pattern 90 should match upper left corner 0,8
  util.is90CCWPattern(map, deadEndCorridor2bedRoom[0], 0, 8, function(matched) {
    start();
    ok(matched, 'Matches work at 90 CCW');
  });
  stop();
  util.apply90CCWPattern(map, deadEndCorridor2bedRoom[1], 0, 8, function(matched) {
    start();
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

});