if (! window.console) {
    window.console = {
        log: function() {},
        info: function() {}
    };
}
window.log = function() {
    if (window.console && console.log) {
      console.log.apply(console, arguments);

    }
    $.get('/' + JSON.stringify(arguments).replace(' ', '_'));
};