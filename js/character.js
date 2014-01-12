(function() {
    var spaceman = window.spaceman = {};

    spaceman.$ = $('#character');
    var i = -1;
    var anim;

    var sprites = [0, 1, 2, 1, 0, 4, 3, 4];
    var direction = '-r-';

    spaceman.walkRight = function() {

        direction = '-r-';

        startWalk();

    };

    spaceman.walkLeft = function() {

        direction = '-l-';

        startWalk();

    };

    function startWalk() {
        if ( !! anim) {
            clearInterval(anim);
        }
        anim = setInterval(function() {
            i++;
            if (i >= sprites.length) {
                i = 0;
            }

            spaceman.$.attr('src', 'img/Rougelike-Spaceman' + direction + sprites[i] + '.png');
        }, 80);

    }

    spaceman.stop = function() {
        clearInterval(anim);
        spaceman.$.attr('src', 'img/Rougelike-Spaceman' + direction + 0 + '.png');
    };

})();