(function() {
    var camera = window.camera;
    spaceman.stop();
    window.onkeypress = function(e) {
        if (e.keyCode === 37) {
            goLeft();
        } else if (e.keyCode === 38) {
            goUp();
        } else if (e.keyCode === 39) {
            goRight();

        } else if (e.keyCode === 40) {
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
        console.log('left');
        spaceman.walkLeft();
        setTimeout(function() {
            spaceman.stop();
        }, 300);
        camera.stepLeft();
    }

    function goUp() {
        console.log('up');
        camera.stepUp();
    }

    function goRight() {

        spaceman.walkRight();
            setTimeout(function() {
                spaceman.stop();
            }, 300);
            camera.stepRight();
            console.log('right');

    }

    function goDown() {
        camera.stepDown();
        console.log('down');
    }

    map.generateMap();
})();