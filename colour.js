colour = {
    R: 100,
    G: 100,
    B: 100
};

function updateColour(colourPicker) {
    rgbColour = hexToRgb(colourPicker.value);
    colour.R = rgbColour.r;
    colour.G = rgbColour.g;
    colour.B = rgbColour.b;
}

function getWaterColour(pressure) {
    offset = (pressure - 0.5) * 200;
    r = colour.R + offset;
    g = colour.G + offset;
    b = colour.B + offset;
    console.log(`Water colour: ${r}, ${g}, ${b}`);
    return `rgba(${r}, ${g}, ${b})`;
}

function grey(value) {
    tone = (value * (256)|0).toString(16);
    return `#${tone}${tone}${tone}`;
}

function getTranslucentColour(alpha) {
    return makeColour(colour.R, colour.G, colour.B, alpha);
}

function makeColour(r, g, b, a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
