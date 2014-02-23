(function() {
    // A list of item spaces by 'x,y' like items['10,13'] with values like
    // false - empty now
    // Recharger - currently has a recharger
    var items = {};
    var playerItems = {
        parts: 0
    };

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
            console.log('finished');
        }
    };

    function checkBedLocker(coords, cb) {
        items[coords[0] + ',' + coords[1]] = false;
        if (Math.random() < 0.9) {
            if (Math.random() < 0.25) {
                inventory.givePlayerParts(5);
            } else {
                inventory.givePlayerParts(1);
            }
        } else {
            cb(null);
        }
    }
})();