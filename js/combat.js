(function() {


    var SPACE = 'S';
    var PATH = ' ';
    var AIRLOCK = 'a';
    var SLEEPING_QUARTERS = 'q';
    var BED = 'b';
    var RESTROOM = 'R';
    var SPACE2 = 'X';
    var SPARE_PART = 'p';
    var ENEMY = 'e';


    var playerHealth = 5;

    function updateHealth() {
        $('#health span.val').text(playerHealth);
    }

    var enemies = {};

    function createRandEnemy(coords) {
        var enemy = {
            health: Math.floor(Math.random() * 2) + 1,
            combat: Math.floor(Math.random() * 2) + 1
        };
        return enemy;
    }

    var fightClubInt;

    function fightClub(origCoords, enemy, enemyCoords) {
        var origX = origCoords[0];
        var origY = origCoords[1];

        var cur = map.currentCoordinates();
        curX = cur[0];
        curY = cur[1];

        if (curX === origX &&
            curY === origY) {
            // TODO add in combat and armor
            var ourAttack = Math.random();
            var enemyAttack = Math.random();
            console.log(ourAttack, '>=', enemyAttack);
            if (ourAttack >= enemyAttack) {
                enemy.health -= 1;
                if (enemy.health <= 0) {
                    ui.showMessage('Boom!');
                    map.setTileType(PATH, enemyCoords[0], enemyCoords[1]);
                    window.camera.draw();
                    console.log('AOK', fightClubInt);
                    console.log('AOK', clearInterval(fightClubInt));
                    fightClubInt = undefined;
                    console.log('AOK', fightClubInt);
                    console.log('AOK enemy dead, clearing fight interval');
                    return;
                }
                console.log('Enemy takes damage! ' + enemy.health);
                ui.showMessage('Enemy takes damage! ' + enemy.health);
            } else {
                // combat and armor
                playerHealth -= 1;
                ui.showMessage('Ouch');
                updateHealth();
                if (playerHealth <= 0) {
                    clearInterval(fightClubInt);
                    fightClubInt = undefined;
                    // TODO make a game over controller
                    setTimeout(function() {
                        $('h1').text('Game Over').show();
                    }, 1000);
                    mazeController.stopMainMazeScene();
                    console.log('Game over fight interval');
                    return;
                }

            }

        } else {
            console.log('Moved, clearing fight interval');
            clearInterval(fightClubInt);
            fightClubInt = undefined;
            return;
        }
    }

    window.combat = {
        fight: function(ourCoords, theirCoords) {
            var enemyKey = theirCoords[0] + ',' + theirCoords[1];
            if (!enemies[enemyKey]) {
                enemies[enemyKey] = createRandEnemy(theirCoords);
            }
            var enemy = enemies[enemyKey];
            console.log("AOK ", fightClubInt);
            if (!fightClubInt) {

                fightClubInt = setInterval(function() {
                    console.log('Fight club yall');
                    fightClub(ourCoords, enemy, theirCoords);
                }, 1000);
            } else {

            }

        }
    }
})();