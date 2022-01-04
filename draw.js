drawing = document.getElementById('drawing');

ctx = drawing.getContext('2d');

lastPointer = undefined;

isPointerDown = false;

drawing.addEventListener('pointerdown', event => isPointerDown = true);
drawing.addEventListener('pointerup', event => {
    isPointerDown = false;
    lastPointer = undefined;
});

drawing.addEventListener('pointermove', event => {
    if(isPointerDown) {
        positionInCanvas = getPositionInCanvas(event.clientX, event.clientY);
        draw(positionInCanvas.x, positionInCanvas.y, event.pressure);
    }
});

function draw(x, y, pressure) {
    console.log(`Drawing at: (${x}, ${y}) with pressure ${pressure}`);

    blobSize = Math.max(penSize + (pressure - 0.5) * 5, 1);

    if(lastPointer !== undefined) {
        ctx.beginPath();
        ctx.lineWidth = blobSize;
        ctx.strokeStyle = getWaterColour((((pressure + lastPointer.pressure) / 2) * 0.5) + 0.25);
        ctx.moveTo(lastPointer.x, lastPointer.y);
        ctx.quadraticCurveTo((x + lastPointer.x) / 2, (y + lastPointer.y) / 2, x, y);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, blobSize * 0.5, 0, 2 * Math.PI, false);
    ctx.fillStyle = getWaterColour((pressure * 0.5) + 0.25);
    ctx.fill();

    lastPointer = {x: x, y: y, pressure: pressure};
}

function getPositionInCanvas(x, y) {
    canvasBounds = drawing.getBoundingClientRect();
    return {
        x: x - canvasBounds.left,
        y: y - canvasBounds.top
    };
}
