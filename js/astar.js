(function() {

  function Space(pos) {
    if (typeof pos !== 'object' || !pos.join ||
      pos.length != 2) {
      throw new Error('pos must be a two element array, got', pos);
    }

    this.pos = pos;
  }

  Space.prototype.id = function() {
    return this.pos.join(',');
  };

  function heuristicCostEstimate(startPos, destPos) {
    return Math.abs(startPos[0] - destPos[0]) +
      Math.abs(startPos[1] - destPos[1]);
  }

  function distBetween(spaceA, spaceB) {
    return Math.abs(spaceA.pos[0] - spaceB.pos[0]) +
      Math.abs(spaceA.pos[1] - spaceB.pos[1]);
  }



  function findInOpenSet(needle, haystack) {
    for (var i = 0; i < haystack.length; i++) {
      if (needle.id() === haystack[i].id()) {
        return true;
      }
    }
    return false;
  }

  function reconstructPath(cameFrom, currentNode) {
    if (cameFrom[currentNode.id()]) {
      var p = reconstructPath(cameFrom, cameFrom[currentNode.id()]);
      p.push(currentNode.pos);
      return p;
    } else {
      return [currentNode.pos];
    }
  }

  function walkable(map, destPos, x, y) {
    if (x === destPos[0] && y === destPos[1]) {
      console.log('WHy that is our destiantion..');
      return true;
    }

    if (x > 0 && y > 0 &&
      x < map[0].length &&
      y < map.length &&
      (map[y][x] === ' ' ||
        map[y][x] === '@')) {
      console.log('Sure ', x, y, '[' + map[y][x] + ']');
      return true;
    }
    return false;
  }

  function neighborNodes(map, cur, destPos) {
    var nodes = [];
    var p = cur.pos;


    console.log('who are the neighbors?', p[0], p[1]);

    // North
    if (walkable(map, destPos, p[0], p[1] - 1)) {
      console.log('Adding', p[0], p[1] - 1);
      nodes.push(new Space([p[0], p[1] - 1]));

    }
    // East
    if (walkable(map, destPos, p[0] + 1, p[1])) {
      console.log('Adding', p[0] + 1, p[1]);
      nodes.push(new Space([p[0] + 1, p[1]]));
    }
    // South
    if (walkable(map, destPos, p[0], p[1] + 1)) {
      console.log('Adding', p[0], p[1] + 1);
      nodes.push(new Space([p[0], p[1] + 1]));
    }
    // West
    if (walkable(map, destPos, p[0] - 1, p[1])) {
      console.log('Adding', p[0] - 1, p[1]);
      nodes.push(new Space([p[0] - 1, p[1]]));
    }

    return nodes;
  }

  window.astar = function(map, curPos, destPos) {
    console.log('A* FROM', curPos, 'TO', destPos);
    var start = new Space(curPos);
    var goal = new Space(destPos);
    var closedSet = {};
    var openSet = [start];
    var cameFrom = {

    };

    // Cost from start along best known path.
    var gScore = {};
    gScore[start.id()] = 0;

    // Estimated total cost from start to goal through y.
    var fScore = {};

    function openSetSort(a, b) {
      var aF = fScore[a.id()];
      var bF = fScore[b.id()];
      if (aF < bF) {
        return -1;
      } else if (aF === bF) {
        return 0;
      } else {
        return 1;
      }
    }


    fScore[start.id()] = gScore[start.id()] +
      heuristicCostEstimate(curPos, destPos);

    while (openSet.length !== 0) {
      openSet.sort(openSetSort);
      var cur = openSet.shift();
      if (cur.id() === goal.id()) {
        return reconstructPath(cameFrom, goal);
      }
      closedSet[cur.id()] = cur;
      var neighbors = neighborNodes(map, cur, destPos);

      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (closedSet[neighbor.id()]) {
          continue;
        }
        var tGScore = gScore[cur.id()] + distBetween(cur, neighbor);
        if (false === findInOpenSet(neighbor, openSet) ||
          tGScore < gScore[neighbor.id()]) {
          cameFrom[neighbor.id()] = cur;
          gScore[neighbor.id()] = tGScore;
          fScore[neighbor.id()] = gScore[neighbor.id()] +
            heuristicCostEstimate(neighbor.pos, goal.pos);
          if (false === findInOpenSet(neighbor, openSet)) {
            openSet.push(neighbor);
          }
        }
      }
    }
    throw new Error('fail');
    //    return [[1, 6], [1, 5], [1, 4], [2, 4], [3, 4], [3, 5], [3, 6]];
  };
})();