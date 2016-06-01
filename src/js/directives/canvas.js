angular
.module("sketchApp")
.directive("canvasDraw", drawOnCanvas);

function drawOnCanvas() {
  return {
    restrict: "A",
    scope: {
      color:  "=",
      size:   "="
    },
    link: function(scope, element) {
      var ctx     = element[0].getContext("2d");
      var drawing = false;
      var lastX;
      var lastY;
      var socket  = io();

      element.bind("mousedown", function(event) {
        if (event.offsetX !== undefined) {
          lastX = event.offsetX;
          lastY = event.offsetY;
        }

        ctx.beginPath();
        drawing = true;
      });

      element.bind("mousemove", function(event) {
        if (drawing) {
          if (event.offsetX !== undefined) {
            currentX = event.offsetX;
            currentY = event.offsetY;
          }

          draw(lastX, lastY, currentX, currentY);

          lastX = currentX;
          lastY = currentY;
        }
      });

      element.bind("mouseup", function(event) {
        drawing = false;
      });

      function reset() {
        element[0].width = element[0].width;
      }

      function draw(lX, lY, cX, cY) {
        socket.emit("drawing", {
          lX: lX,
          lY: lY,
          cX: cX,
          cY: cY,
          color: scope.color,
          size: scope.size
        });
      }

      socket.on("drawing", function(imgProps) {
        ctx.moveTo(imgProps.lX, imgProps.lY);
        ctx.lineTo(imgProps.cX, imgProps.cY);
        ctx.strokeStyle = imgProps.color;
        ctx.lineWidth   = imgProps.size;
        ctx.stroke();
      });
    }
  };
}
