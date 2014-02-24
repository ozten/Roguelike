(function() {
    // A list of item spaces by 'x,y' like items['10,13'] with values like
    // false - empty now
    // Recharger - currently has a recharger
    var items = {};
    var playerItems = {
        parts: 0
    };

<<<<<<< HEAD
    function checkBedLocker(coords, cb) {
        items[coords[0] + ',' + coords[1]] = false;
        if (Math.random() < 0.7) {
            if (Math.random() < 0.15) {
                playerItems.parts += 5; // Five Parts!
                cb('Player got 5 parts!');
            } else {
                playerItems.parts += 1;
                cb('Player got 1 part');
            }
            $('#inventory span').text(playerItems.parts);
        } else {
            cb('You got nothing!');
        }
    }

=======
>>>>>>> 08586e0d777e04de48bd1dcd237e2da5d5cc9716
    window.inventory = {
        checkForItem: function(coords, cb) {
            if (false === items[coords[0] + ',' + coords[1]]) {
                return cb(null);
            }
            var tileType = map.tileType(coords[0], coords[1]);
            if ('b' === tileType) {
                checkBedLocker(coords, cb);
            }
        },
        givePlayerParts: function(num, cb) {
            playerItems.parts += num; // Five Parts!
            $('#inventory span').text(playerItems.parts);
            cb('Player got ' + num + ' parts!');
        }
    };

    function checkBedLocker(coords, cb) {
        items[coords[0] + ',' + coords[1]] = false;
        if (Math.random() < 0.9) {
            if (Math.random() < 0.25) {
                inventory.givePlayerParts(5, cb);
            } else {
                inventory.givePlayerParts(1, cb);
            }
        } else {
            cb(null);
        }
    }
})();