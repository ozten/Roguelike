(function() {

  window.background = {};

  background.draw = function() {
    // Number of tiles visible on screen
    var tileWidth = 11;
    var tileHeight = 15;
    var width = map.width;
    var height = map.height;
    //console.log('Width will be ', width * (window.innerWidth / 11)  / 100);
    var scale = background.scale = (window.innerWidth / 11) / 100;

    var canvas = document.createElement('canvas');
    canvas.width = (width * 100 * scale);
    canvas.height = (height * 100 * scale);

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.lineWidth = "1";
      ctx.strokeStyle = "rgb(255, 0, 0)";
      ctx.clearRect(0, 0, width * scale, height * scale);


      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {


          switch (map.tileType(x, y)) {
            case 'S':
              ctx.fillStyle = "rgb(100,100,100)";
              break;
            case ' ':
              ctx.fillStyle = "rgb(255,100,100)";
              break;
            case '@':
              ctx.fillStyle = "rgb(255,200,200)";
              break;
            case 'q':
              ctx.fillStyle = "rgb(75,75,75)";
              break;
            case 'b':
              ctx.fillStyle = "rgb(0,175,175)";
              break;
            case 'a':
              ctx.fillStyle = "rgb(255,255,100)";
              break;  
            case 'R':
              ctx.fillStyle = "rgb(100,149,237)"  
              break;
            case 'X':
              ctx.fillStyle = "rgb(0,0,0)"  
              break;  
            default:
              console.log('UNKNOWN TIle Type');
              break;
          }
          // 1, 6
          ctx.fillRect(x * 100 * scale, y * 100 * scale,
            100 * scale, 100 * scale);
        }
      }



      for (var i = 0; i < height; i++) {
        ctx.beginPath();
        ctx.moveTo(0 * scale, i * 100 * scale);

        ctx.lineTo(width * 100 * scale, i * 100 * scale);

        ctx.closePath();
        ctx.stroke();

      }
      for (i = 0; i < width; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 100 * scale, 0 * scale);
        ctx.lineTo(i * 100 * scale, height * 100 * scale);
        ctx.closePath();
        ctx.stroke();

      }

      camera.setBackground(canvas);
    }
  };
})();