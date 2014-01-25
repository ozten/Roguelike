if (!window.console) {
    window.console = {
        log: function() {}
    };
}

(function() {
    var camera = window.camera;
    spaceman.stop();
    /*
    window.onkeypress = function(e) {
        if (e.keyCode === 37 ||
            e.keyCode === 97) {
            console.log('Going Left');
            goLeft();
        } else if (e.keyCode === 38 ||
            e.keyCode === 119) {
            goUp();
        } else if (e.keyCode === 39 ||
            e.keyCode === 100) {
            goRight();

        } else if (e.keyCode === 40 ||
            e.keyCode === 115) {
            goDown();
        } else {
            console.log('Unknown key code', e.keyCode);
        }
    };
*/
    document.onkeydown = function(e) {
        if (e.keyCode === 37 ||
            e.keyCode === 97) {
            console.log('Going Left');
            goLeft();
        } else if (e.keyCode === 38 ||
            e.keyCode === 119) {
            goUp();
        } else if (e.keyCode === 39 ||
            e.keyCode === 100) {
            goRight();

        } else if (e.keyCode === 40 ||
            e.keyCode === 115) {
            goDown();
        } else {
            console.log('Unknown key code', e.keyCode);
        }
    };

    var hammertime = Hammer(document.getElementById('viewport'));
    hammertime.on('swipeleft', goLeft);
    hammertime.on('swipeup', goUp);
    hammertime.on('swiperight', goRight);
    hammertime.on('swipedown', goDown);

    function goLeft() {
        if (map.moveLeftAllowed()) {
            map.moveLeft();
            spaceman.walkLeft();
            setTimeout(function() {
                spaceman.stop();
            }, 300);
            camera.stepLeft();
        }

    }

    function goUp() {
        console.log('Go up triggered');
        if (map.moveUpAllowed()) {
            map.moveUp();
            console.log('Allowed');
            camera.stepUp();
        } else {
            console.log('Denied');
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

        }
    }

    function goDown() {

        if (map.moveDownAllowed()) {
            map.moveDown();
            camera.stepDown();
        }
    }

    if (window.map) map.generateMap();
    background.draw();
    var scale = background.scale;
    camera.updateScale(scale);
    var cords = map.startPos();
    camera.scrollTo(cords[0] - 2, cords[1] - 2);
    $('#character').css({
        top: (200 * scale) + 'px',
        left: (200 * scale) + 'px'
    })
})();