  bonsai.run(document.getElementById('character'), {
    code: function() {
      new Rect(15, 15, 100, 100)
        .addTo(stage)
        .attr('fillColor', 'red');
    },
    width: 500,
    height: 400
  });