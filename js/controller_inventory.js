(function() {

    function handleContinue(e) {
        e.preventDefault();
        inventoryController.stopInventoryScene();
        mazeController.startMainMazeScene();
    }
    window.inventoryController = {
        startInventoryScene: function() {
            $('#viewport').append('<div id="inventory-screen"><h2>Inventory</h2><button id="inventory-continue">Continue</button></div>')
            $('#inventory-continue').click(handleContinue);
        },
        stopInventoryScene: function() {
            $('#inventory-continue').unbind('click');
            $('#inventory-screen').remove();

        }
    };
})();