(function() {
    var camera = window.camera;
    window.onkeypress = function(e) {
        if (e.keyCode === 37) {
            console.log('left');
            camera.stepLeft();
        } else if (e.keyCode === 38) {
            console.log('up');
            camera.stepUp();
        } else if (e.keyCode === 39) {
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