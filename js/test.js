test( "hello test", function() {
  var map = [
    //0    1    2    3    4
    ['#', '#', '#', '#', '#'], // 0
    ['#', ' ', ' ', ' ', ' '], // 1
    ['#', ' ', '#', '#', ' '], // 2
    ['#', ' ', '#', ' ', ' '], // 3
    ['#', ' ', ' ', ' ', '#'], // 4
    ['#', ' ', '#', ' ', '#'], // 5
    ['#', ' ', '#', ' ', '#'], // 6
    ['#', '#', '#', '#', '#']  // 7
  ];
  var path1 = [[1,6], [1,5], [1,4], [2,4], [3,4], [3, 5], [3,6]];
  var start = new Date();
  deepEqual(astar(map, [1, 6], [3, 6]), path1, 'Picks the short path');

  var path2 = [[1,1], [1,2], [1,3], [1,4], [2,4], [3, 4], [3,5], [3,6]];
  deepEqual(astar(map, [1, 1], [3, 6]), path2, 'Picks the short path');

  var path2 = [[4, 1], [4,2], [4,3], [3,3], [3,4], [2,4], [1,4]];
  deepEqual(astar(map, [4, 1], [1, 4]), path2, 'Picks the short path');

  var path2 = [[4, 1], [3,1], [2,1], [1,1]];
  deepEqual(astar(map, [4, 1], [1, 1]), path2, 'Picks the short path');
});