(function() {
    window.map = {};

    var _map = []; // Map Data
    var width = 80;
    var height = 40;
    var MIN_BORDER_DIST = 5;
    var RND_WALK_STEPS = (width * height) * 0.75;

    var NORTH = 0;
    var EAST = 1;
    var SOUTH = 2;
    var WEST = 3;
    var HEADING = 4;

    var SPACE = 'S';
    var PATH = ' ';

    map.generateMap = function() {
        var start = new Date();
        var startX, startY, curX, curY;

        var pickX = true;

        //startX = curX = 0;
        //pickX = false;


        while (pickX) {
            startX = curX = rand(width);
            if (startX > MIN_BORDER_DIST &&
                startX < width - MIN_BORDER_DIST) {
                pickX = false;
            }
        }

        var pickY = true;
        //startY = curY = 0;
        //pickY = false;

        while (pickY) {
            startY = curY = rand(height);
            if (startY > MIN_BORDER_DIST &&
                startY < height - MIN_BORDER_DIST) {
                pickY = false;
            }
        }

        for (var row = 0; row < height; row++) {
            _map[row] = [];
console.log(row);
            for (var col = 0; col < width; col++) {

                _map[row][col] = SPACE;
            }
        }



        //startX = curX = Math.round(width / 2);
        //startY = curY = Math.round(height / 2);

        console.log('Starting at ', startX, startY);
        _map[startY][startX] = '@';

        var curHeading = EAST;

        var nn = 0;
        var ee = 0;
        var ss = 0;
        var ww = 0;
        /*
_map[0][0] = 'A';
_map[0][1] = 'B';
_map[1][0] = 'D';
_map[1][1] = 'E';
_map[2][0] = 'G';
_map[2][1] = 'H';
*/
        //RND_WALK_STEPS = 0;

        for (var i = 0; i < RND_WALK_STEPS; i++) {
            var picking = true;

            while (picking) {
                var cardinal = rand(15);

                if (cardinal > WEST) {
                    cardinal = curHeading;
                }



                if (NORTH === cardinal &&
                    curY - 1 > 0) {

                    curY -= 1;

                    nn++;
                } else if (EAST === cardinal &&
                    curX + 1 < width) {
                    curX += 1;
                    ee++;
                } else if (SOUTH === cardinal &&
                    curY + 1 < height) {
                    curY += 1;
                    ss++;
                } else if (WEST === cardinal &&
                    curX - 1 > 0) {
                    curX -= 1;
                    ww++;
                } else {
                    picking = false;
                    continue;
                }
                if (i === 33) {
                    console.log(curY, curX);
                }
                try {
                    _map[curY][curX] = PATH;
                } catch (e) {
                    picking = false;
                    continue;
                }
                curHeading = cardinal;
                //console.log(curY, curX);
                picking = false;
                if (i < 30) {
                    console.log('writing to ', curY, curX);
                }
                _map[curY][curX] = PATH;
            }
        }
        console.log('nn=', nn, 'ee=', ee, 'ss=', ss, 'ww=', ww);
        var js = [];
        var b = "";
        for (var row = 0; row < height; row++) {
            b += row + ': ' + _map[row].join('') + '\n';
            js.push('[' + _map[row].join("','") + '],\n');

        }
        console.log(b);
        console.log('[', js.join(','), ']');
        console.log(_map);
        window._map = _map;


        console.log('Finished in ', new Date() - start, 'milliseconds');

    };

    map.moveAllowed = function(from, to) {

    };

    function rand(max) {
        return Math.round(Math.random() * (max - 1));
    }

})();