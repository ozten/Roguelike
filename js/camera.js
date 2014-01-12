(function() {
  var camera = window.camera = {};

  camera.x = 200;
  camera.y = 200;

  update();


  camera.stepLeft = function() {
    camera.x -= 100;
    update();
  };

  camera.stepUp = function() {
    camera.y -= 100;
    update();
  };

  camera.stepRight = function() {
    camera.x += 100;
    update();
  };

  camera.stepDown = function() {
    camera.y += 100;
    update();
  };

  function update() {
    $('#canvas').css({
      transition: '0.3s linear',
      transform: 'translate(' + (0 - camera.x) + 'px, ' + (0 - camera.y) + 'px)'
    });
  }

})();