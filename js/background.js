(function() {

var width = 1100;
var height = 1500;

  bonsai.run(document.getElementById('background'), {
    code: function() {
      // width and height aren't defined here...
      // WTF bonsai ?!?
      var path = new Path();

      for(var i=0; i < 15; i++) {
        path.moveTo(0, i * 100)
            .lineTo(1100, i * 100);
      }
      for(var i=0; i < 11; i++) {
        path.moveTo(i * 100, 0)
            .lineTo(i * 100, 1500);
      }
      path.closePath()
          .stroke('black', 1)
          .addTo(stage);

      new Rect(10, 10, 100, 100)
        .addTo(stage)
        .attr('fillColor', 'green');

    },
    width: width,
    height: height
  });

})();