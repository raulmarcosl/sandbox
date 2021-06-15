$(document).ready(function () {
    class Point {
        constructor (x, y) { this.x = x; this.y = y }
      }
      
    function createBoundingBox (n, width, height, center) {
      var radians = [];
      for (var i = 0; i < n; i++) {
        radians[i] = (i / n) * (2 * Math.PI);
      }

      var box = [];
      box[0] = new Point(center.x + width * Math.cos(radians[0]), center.y);
      for (i = 1; i < n; i++) {
        box[i] = new Point(
          center.x + width * Math.cos(radians[i]),
          center.y + height * Math.sin(radians[i])
        );
      }
      return box;
    }

    function createConvexPolygon (box) {
      var polygon = [];
      for (var i = 0; i < box.length; i++) {
        var xOffset = Math.random() * (box[(i + 1) % box.length].x - box[i].x);
        var yOffset = Math.random() * (box[(i + 1) % box.length].y - box[i].y);
        if (Math.random() > 0.5) {
          polygon[i] = new Point(box[i].x - xOffset, box[i].y - yOffset);
        } else {
          polygon[i] = new Point(box[i].x + xOffset, box[i].y + yOffset);
        }
      }
      return polygon;
    }

    function drawPolygon (ctx, polygon, color, lines, ratio) {
      ctx.beginPath();

      ctx.moveTo(polygon[0].x, polygon[0].y)
      for (var i = 1; i <= polygon.length; i++) {
        ctx.lineTo(polygon[i % polygon.length].x, polygon[i % polygon.length].y);
      }

      ctx.moveTo(polygon[polygon.length - 1].x, polygon[polygon.length - 1].y)
      for (i = 0; i < lines; i++) {
        var r = ratio;
        var x = polygon[i].x + r * (polygon[i + 1].x - polygon[i].x);
        var y = polygon[i].y + r * (polygon[i + 1].y - polygon[i].y);
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);

        
        polygon[polygon.length] = new Point(x, y)
        
      }
      // Go to the end of the polygon
      ctx.stroke();
      ctx.moveTo(polygon[0].x, polygon[0].y)
    }

    function shuffle(array) {
      var currentIndex = array.length;
      var randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    function draw(lines, ratio) {
      var canvas = document.getElementById('doodle');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var center = new Point(canvas.width / 2, canvas.height / 2);
      var height = canvas.height;
      var width = canvas.width;

      var n = 6;

      var box = createBoundingBox(n, width / 3, height / 3, center);
      var polygon = createConvexPolygon(box);

      // var colors = shuffle(["#394053","#4e4a59","#6e6362","#839073","#7cae7a","#97ead2","#8cc7a1"]);
      var colors = ["#FF008C", "#A3005A", "#7A0043", "#000DFF", "#0008A3", "#00067A", "#000566"];

      drawPolygon(ctx, polygon, colors[0], lines, ratio);

      var a = [
        new Point(polygon[0].x, polygon[0].y),
        new Point(width, polygon[0].y),
        new Point(width, height),
        new Point(polygon[1].x, height),
        new Point(polygon[1].x, polygon[1].y)
      ];
      drawPolygon(ctx, a, colors[1], lines, ratio);

      var b = [
        new Point(polygon[1].x, polygon[1].y),
        new Point(polygon[1].x, height),
        new Point(0, height),
        new Point(0, polygon[2].y),
        new Point(polygon[2].x, polygon[2].y)
      ];
      drawPolygon(ctx, b, colors[2], lines, ratio);

      var c = [
        new Point(polygon[2].x, polygon[2].y),
        new Point(0, polygon[2].y),
        new Point(0, polygon[3].y),
        new Point(polygon[3].x, polygon[3].y)
      ];
      drawPolygon(ctx, c, colors[3], lines, ratio);

      var e = [
        new Point(polygon[3].x, polygon[3].y),
        new Point(0, polygon[3].y),
        new Point(0, 0),
        new Point(polygon[4].x, 0),
        new Point(polygon[4].x, polygon[4].y)
      ];
      drawPolygon(ctx, e, colors[4], lines, ratio);

      var f = [
          new Point(polygon[4].x, polygon[4].y),
          new Point(polygon[4].x, 0),
          new Point(width, 0),
          new Point(width, polygon[5].y),
          new Point(polygon[5].x, polygon[5].y)
      ];
      drawPolygon(ctx, f, colors[5], lines, ratio);

      var g = [
          new Point(polygon[5].x, polygon[5].y),
          new Point(width, polygon[5].y),
          new Point(width, polygon[0].y),
          new Point(polygon[0].x, polygon[0].y)
      ];
      drawPolygon(ctx, g, colors[6], lines, ratio);
    }
    
    function reDraw() {
      var lines = $("#slider-lines").slider("value");
      var ratio = $("#slider-ratio").slider("value");
      console.log('lines: ', lines);
      console.log('ratio: ', ratio);
      draw(lines, ratio);
    }

    $( "#slider-lines" ).slider({
      min: 50,
      max: 1000,
      step: 10,
      slide: reDraw,
      change: reDraw 
    });

    $( "#slider-ratio" ).slider({
      min: 0.005,
      max: 0.06,
      step: 0.001,
      slide: reDraw,
      change: reDraw
    });

    reDraw();
  });