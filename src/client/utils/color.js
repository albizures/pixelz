const RGBA = 'rgba';
const RGBA_PER = 'rgbaPer';
const ABBR_HEX = 'abbrHex';
const HEX = 'hex';
const HSL = 'hsl';
const NAC = 'NaC';
const abbrHex = /^#([a-fA-F0-9]{3})$/;
const hex = /^#([a-fA-F0-9]{6})$/;
const rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
const perRgba = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
const hsl = /^hsla?\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;

function isValid(color) {
  return NAC !== detectType(color);
}
function detectType(color) {
  if (exports.isAbbrHex(color)) {
    return ABBR_HEX;
  } else if (exports.isHex(color)) {
    return HEX;
  } else if (exports.isRGBA(color)) {
    return RGBA;
  } else if (exports.isRGBAPer(color)) {
    return RGBA_PER;
  } else if (exports.isHSL(color)) {
    return HSL;
  } else {
    return NAC;
  }
}
exports.isValid = isValid;
exports.detectType = detectType;


exports.isAbbrHex = function (color) {
  return color.match(abbrHex) || false;
};
exports.isHex = function (color) {
  return color.match(hex) || false;
};
exports.isRGBA = function (color) {
  return color.match(rgba) || false;
};
exports.isRGBAPer = function (color) {
  return color.match(perRgba) || false;
};
exports.isHSL = function (color) {
  return color.match(hsl) || false;
};
exports.colorIsLight = function (r, g, b) {
  var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  console.log(a);
  return (a < 0.5);
};


exports.hexToRgb = function hexToRgb(hex) {
  console.log(hex);
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const uglyColors = ['255.0.255', '0.255.0', '255.255.0', '0.255.255'];
const rand = function (max) {
  return Math.floor(Math.random() * max);
};

function getRGBAComponents(color) {
  let components = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);
  for (let j = 0; j < components.length; j++) {
    components[j] = Number(components[j]);
  }
  return components;
};
exports.getRGBAComponents = getRGBAComponents;

function isTransparent(color) {
  return 0 === getRGBAComponents(color)[3];
}

exports.isTransparent = isTransparent;

exports.randomRGB = function () {
  return 'rgb(' + rand(255) + ', ' + rand(255) + ', ' + rand(255) + ')';
};

exports.randomHex = function () {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[rand(16)];
  }
  return color;
};

function componentToHex(c) {
  var hex = Number(c).toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

exports.rgbToHex = function (r, g, b) {
  console.log(r, g, b);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};


exports.unusedColor = function unusedColor (usedColors) {

  for (let i = 0; i < uglyColors.length; i++) {
    if (!usedColors[uglyColors[i]]) {
      let components = uglyColors[i].split('.');
      return {r: components[0], g: components[1], b: components[2]};
    }
  }

  for (let r = 0; r < 255; r++) {
    for (let g = 0; g < 255; g++) {
      for (let b = 0; b < 255; b++) {
        if (!usedColors[r + '.' + g + '.' + b]) {
          return {r: r, g: g, b: b};
        }
      }
    }
  }
};


// code from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
exports.rgbToHsl = function rgbToHsl(r, g, b) {
  var max, min, h, s, l, d;
  r /= 255, g /= 255, b /= 255;
  max = Math.max(r, g, b);
  min = Math.min(r, g, b);
  l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
    }
    h /= 6;
  }

  return [h, s, l];
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
exports.hslToRgb = function hslToRgb(h, s, l) {
  var r, g, b, q, p;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    }

    q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
};

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
exports.rgbToHsv = function rgbToHsv(r, g, b) {
  var max, min, h, s, v, d;
  r = r / 255, g = g / 255, b = b / 255;
  max = Math.max(r, g, b);
  min = Math.min(r, g, b);
  v = max;

  d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
    }
    h /= 6;
  }

  return [h, s, v];
};

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
exports.hsvToRgb = function hsvToRgb(h, s, v) {
  var r, g, b,

    i = Math.floor(h * 6),
    f = h * 6 - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: {
      r = v, g = t, b = p;
      break;
    }
    case 1: {
      r = q, g = v, b = p;
      break;
    }
    case 2: {
      r = p, g = v, b = t;
      break;
    }
    case 3: {
      r = p, g = q, b = v;
      break;
    }
    case 4: {
      r = t, g = p, b = v;
      break;
    }
    case 5: {
      r = v, g = p, b = q;
      break;
    }
  }

  return [r * 255, g * 255, b * 255];
};
