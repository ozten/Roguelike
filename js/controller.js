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
        } else {
            console.log('Unknown key code', e.keyCode);
            return true;
        }
        return false;
    };

    //document.getElementById('viewport').mozRequestFullScreen();

    /*
    var viewport = document.getElementById('viewport');
    viewport.addEventListener('touchstart', function(e) {
        log(typeof e.preventDefault);
        e.preventDefault();
        log('touchstart', e);
    }, false);
    viewport.addEventListener('touchmove', function(e) {
        log('touchstart', e);
    }, false);
    viewport.addEventListener('touchend', function(e) {
        log('touchend', e);
    }, false);
    viewport.addEventListener('touchcancel', function(e) {
        log('touctouchcancelhstart', e);
    }, false);
*/

    //alert(document.getElementById('viewport'));

    var hammer = Hammer(document.getElementById('viewport'));

    hammer.on('swiperight', function(e) {
        e.preventDefault();
        e.gesture.preventDefault();
        goRight();
    });
    hammer.on('swipeup', function(e) {
        e.preventDefault();
        e.gesture.preventDefault();
        goUp();
    });
    hammer.on('swipeleft', function(e) {
        e.preventDefault();
        e.gesture.preventDefault();
        goLeft();
    });
    hammer.on('swipedown', function(e) {
        e.preventDefault();
        e.gesture.preventDefault();
        goDown();
    });
    hammer.on('touch', function(e) {
        camera.debugDraw(e.gesture.touches[0].pageX, e.gesture.touches[0].pageY);
    });

    /*
    ['drag, dragstart, dragend, dragup, dragdown, dragleft, dragright'].forEach(function(etype) {
        hammer.on(etype, function(e) {
            e.preventDefault();
            e.gesture.preventDefault();
        });
    });
    */
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