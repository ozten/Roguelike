(function() {

    spaceman.stop();
    var movementInterval;
    var hammer;
    var queuedMoves = [];

    window.mazeController = {
        startMainMazeScene: function() {
            $('#display-background, #character').show();
            document.onkeydown = handleKeyDown;
            hammer = Hammer(document.getElementById('canvas'), {
                drag: false
            });

            hammer.on('swiperight', mazeController.swiperight);
            hammer.on('swipeup', mazeController.swipeup);
            hammer.on('swipeleft', mazeController.swipeleft);
            hammer.on('swipedown', mazeController.swipedown);
            hammer.on('tap', mazeController.tap);



            queuedMoves = [];
            movementInterval = setInterval(function() {
                var move = queuedMoves.shift();
                if ( !! move) {
                    goByCoordinates(map.currentCoordinates(), move);
                    console.log('QUEUED MOVES LEN', queuedMoves.length);
                }
            }, 300);

            if (window.map) map.generateMap();

            handleResize();

            window.onresize = handleResize;

            ui.showMessage('Spaceman');

        },
        stopMainMazeScene: function() {
            $('#display-background, #character').hide();
            document.onkeydown = null;
            clearInterval(movementInterval);
            // TODO This doesn't actually disable hammer...
            hammer.off('swiperight');
            hammer.off('swipeup');
            hammer.off('swipeleft');
            hammer.off('swipedown');
            hammer.off('tap');
            hammer = null;
            queuedMoves = null;
            window.onresize = null;
        },
        swiperight: function(e) {
            e.preventDefault();
            e.gesture.preventDefault();
            goRight();
        },
        swipeup: function(e) {
            e.preventDefault();
            e.gesture.preventDefault();
            goUp();
        },
        swipeleft: function(e) {
            e.preventDefault();
            e.gesture.preventDefault();
            goLeft();
        },
        swipedown: function(e) {
            e.preventDefault();
            e.gesture.preventDefault();
            goDown();
        },
        tap: function(e) {
            e.gesture.preventDefault();
            goToScreenPoint(e.gesture.touches[0].pageX, e.gesture.touches[0].pageY);
        }
    };

    function handleKeyDown(e) {
        if (e.keyCode === 37 ||
            e.keyCode === 97) {
            console.log('Going Left');
            e.preventDefault();
            goLeft();
        } else if (e.keyCode === 38 ||
            e.keyCode === 119) {
            e.preventDefault();
            goUp();
        } else if (e.keyCode === 39 ||
            e.keyCode === 100) {
            e.preventDefault();
            goRight();

        } else if (e.keyCode === 40 ||
            e.keyCode === 115) {
            e.preventDefault();
            goDown();
            // m key
        } else if (e.keyCode === 77) {
            e.preventDefault();
            camera.toggleMapOverlay();
        } else {
            console.log('Unknown key code', e.keyCode);
            return true;
        }
        return false;
    };

    function goUp() {
        //console.log('Go up triggered');
        if (map.moveUpAllowed()) {
            map.moveUp();
            camera.stepUp();
            fireNewPositionEvents();
        } else if (map.hasItemUp()) {
            var coords = map.currentCoordinates();
            coords[1] = coords[1] - 1;
            inventory.checkForItem(coords, function(item) {
                if (null !== item) {
                    ui.showMessage(item);
                }
            });
        }
    }

    function goRight() {
        if (map.moveRightAllowed()) {
            map.moveRight();
            spaceman.walkRight();
            setTimeout(function() {
                spaceman.stop();
            }, 300);
            camera.stepRight();
            fireNewPositionEvents();
        } else if (map.hasItemOnRight()) {

            var coords = map.currentCoordinates();
            coords[0] = coords[0] + 1;
            inventory.checkForItem(coords, function(item) {
                if (null !== item) {
                    ui.showMessage(item);
                }
            });

        }
    }

    function goDown() {
        if (map.moveDownAllowed()) {
            map.moveDown();
            camera.stepDown();
            fireNewPositionEvents();
        } else if (map.hasItemDown()) {
            var coords = map.currentCoordinates();
            coords[1] = coords[1] + 1;
            inventory.checkForItem(coords, function(item) {
                if (null !== item) {
                    ui.showMessage(item);
                }
            });
        }
    }

    function goLeft() {
        if (map.moveLeftAllowed()) {
            map.moveLeft();
            spaceman.walkLeft();
            setTimeout(function() {
                spaceman.stop();
            }, 300);
            camera.stepLeft();
            fireNewPositionEvents();
        } else if (map.hasItemOnLeft()) {
            console.log('Checked for inventory on the left', map.currentCoordinates());
            var coords = map.currentCoordinates();
            coords[0] = coords[0] - 1;

            console.log(window.inventory);

            inventory.checkForItem(coords, function(item) {
                console.log('Checked for items... got', item);
                if (null !== item) {
                    ui.showMessage(item);
                }
            });
        }
    }

    function goToScreenPoint(x, y) {
        camera.debugDraw(x, y);
        console.log('screen', x, y);
        var coords = camera.screenPointToMapCoord(x, y);
        console.log(map.currentCoordinates());
        console.log(coords);
        if (coords.length === 2) {
            var moves = astar(map.map, map.currentCoordinates(), coords);
            queuedMoves = [];

            while (moves.length > 0) {
                queuedMoves.push(moves.shift());
                console.log('MOVES LEN', moves.length);
            }
        }
    }

    var handleResize = function() {
        console.log('Resizing ' + new Date().getTime());
        camera.draw();
        var scale = camera.scale;
        camera.updateScale(scale);
        camera.handleResize();
        var cords = map.currentCoordinates();
    };
    var previousCoords = [-1, -1];

    function fireNewPositionEvents() {
        var coords = map.currentCoordinates();
        if (previousCoords[0] !== coords[0] ||
            previousCoords[1] !== coords[1]) {
            previousCoords = coords;
            var tileType = map.tileType(coords[0], coords[1]);
            if ('a' === tileType) {
                mazeController.stopMainMazeScene();
                inventoryController.startInventoryScene();
            }
        }
    }

    function goByCoordinates(from, to) {
        if (from[0] > to[0]) {
            console.log('going left');
            goLeft();
        } else if (from[1] > to[1]) {
            console.log('going up');
            goUp();
        } else if (from[0] < to[0]) {
            console.log('going right');
            goRight();
        } else if (from[1] < to[1]) {
            console.log('going down');
            goDown();
        }
    }


})();