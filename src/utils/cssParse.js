const getImageCssClassOutput = (grid, opt) => {
  let boxShadowData = getImageData(grid, opt);
  return `.${opt.cssClassName} {\n  box-shadow: ${boxShadowData};\n  height: ${opt.pSize}px;\n  width: ${opt.pSize}px;\n}`;
};
const getImageData = (grid, opt) => {
  const xCoord = i => (i % opt.c) * opt.pSize + opt.pSize;
  const yCoord = i =>
    parseInt(i / opt.c, 10) * opt.pSize + opt.pSize;
  const blurRadius = opt.blurRadius ? `${opt.blurRadius}px` : 0;
  const spreadRadius = opt.spreadRadius
    ? `${opt.spreadRadius}px`
    : 0;

  switch (opt.format) {
    case 'array': {
      return grid.reduce((bsArray, color, i) => {
        if (color !== '') {
          bsArray.push({
            x: xCoord(i),
            y: yCoord(i),
            color,
            blurRadius,
            spreadRadius
          });
        }
        return bsArray;
      }, []);
    }
    default: {
      return grid
        .reduce((bsString, color, i) => {
          if (color !== '') {
            return `${bsString} ${xCoord(i)}px ${yCoord(
              i
            )}px ${blurRadius} ${spreadRadius} ${color},`;
          }
          return bsString;
        }, '')
        .slice(1, -1);
    }
  }
};

const PIXELART_CSS_CLASS_NAME = 'pixelart-to-css';

export function generatePixelDrawCss(
  grid,
  columns,
  cellSize,
  type
) {
  return getImageData(grid, {
    format: type,
    pSize: cellSize,
    c: columns
  });
}

export function getCssImageClassOutput(grid, columns, cellSize) {
  return getImageCssClassOutput(grid, {
    format: 'string',
    pSize: cellSize,
    c: columns,
    cssClassName: PIXELART_CSS_CLASS_NAME
  });
}
