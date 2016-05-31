angular
.module("sketchApp")
.directive("canvas-draw", drawOnCanvas);

function drawOnCanvas() {
  console.log("hello");
  return {
    restrict: "A",
    link: function(scope, element) {
      var ctx     = element[0].getContext("2d");
      var drawing = false;
      var lastX;
      var lastY;

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
        ctx.moveTo(lX,lY);
        ctx.lineTo(cX,cY);
        ctx.strokeStyle = "black";
        ctx.stroke();
      }
    }
  };
}
