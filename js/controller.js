(function() {
    var camera = window.camera;
    spaceman.stop();
    window.onkeypress = function(e) {
        if (e.keyCode === 37) {
            console.log('left');
            spaceman.walkLeft();
            setTimeout(function() {
                spaceman.stop();
            }, 300);
            camera.stepLeft();
        } else if (e.keyCode === 38) {
            console.log('up');
            camera.stepUp();
        } else if (e.keyCode === 39) {
            spaceman.walkRight();
            setTimeout(function() {
                spaceman.stop();
            }, 300);
            camera.stepRight();
            console.log('right');

        } else if (e.keyCode === 40) {
            camera.stepDown();
            console.log('down');
        } else {
            console.log('Unknown key code', e.keyCode);
        }
    }
})();