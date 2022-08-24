import React from 'react';

import { generatePixelDrawCss } from '../utils/cssParse';

const Preview = props => {
  const generatePreview = () => {
    const { storedData } = props;
    const { frames, columns, cellSize } = storedData || props;

    let cssString;

    const styles = {
      previewWrapper: {
        height: cellSize,
        width: cellSize,
        position: 'absolute',
        top: '-5px',
        left: '-5px'
      }
    };

    let grid = frames.get(0).get('grid');

    frames.size > 1 &&
      frames.slice(1, frames.size).forEach(frame => {
        let g = frame.get('grid');
        grid.forEach((currentColor, index) => {
          let nextColor = g.get(index);
          grid = grid.set(
            index,
            nextColor !== 'rgba(0, 0, 0, 0)'
              ? nextColor
              : currentColor
          );
        });
      });

    cssString = generatePixelDrawCss(
      grid,
      columns,
      cellSize,
      'string'
    );

    styles.previewWrapper.boxShadow = cssString;
    styles.previewWrapper.MozBoxShadow = cssString;
    styles.previewWrapper.WebkitBoxShadow = cssString;

    return <div style={styles.previewWrapper}></div>;
  };

  const { storedData } = props;
  const { columns, rows, cellSize } = storedData || props;
  const style = {
    width: columns * cellSize,
    height: rows * cellSize,
    position: 'relative'
  };

  return (
    <div className="preview" style={style}>
      {generatePreview()}
    </div>
  );
};
export default Preview;
