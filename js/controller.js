if (!window.console) {
    window.console = {
        log: function() {}
    };
}

// Disable iOS Safari jank
// Works for Safari full screenmode
// but not for Add to homescreen mode
// https://gist.github.com/amolk/1599412
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
});

(function() {
    var camera = window.camera;
    mazeController.startMainMazeScene();
})();