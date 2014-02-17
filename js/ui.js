(function() {
    window.ui = {
        showMessage: function(msg) {
            $('h1').show('fast');
            $('h1').text(msg);
            setTimeout(function() {
                $('h1').hide('slow');
            }, 1000);
        }
    };
})();