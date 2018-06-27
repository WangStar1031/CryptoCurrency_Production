var nSvgWidth = 0, nSvgHeight = 0;
var xPos = 0, yPos = 0;

(function() {
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    xPos = event.clientX;
    yPos = event.clientY;
}
})();