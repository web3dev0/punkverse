import { saveAs } from 'file-saver';
import randomString from './random';

function fillCanvasWithFrame(canvas, frameInfo) {
  const { grid, cols, cellSize, frameHeight, frameIdx } = frameInfo;
  const ctx = canvas;
  grid.forEach((fillStyle, pixelIdx) => {
    if (!fillStyle) {
      return;
    }
    ctx.fillStyle = fillStyle;

    const col = pixelIdx % cols;
    const row = Math.floor(pixelIdx / cols);
    ctx.fillRect(
      col * cellSize,
      row * cellSize + frameHeight * frameIdx,
      cellSize,
      cellSize
    );
  });
  return ctx;
}

function renderImageToCanvas(
  type,
  canvasInfo,
  currentFrameInfo,
  frames
) {
  const { canvas, canvasHeight, canvasWidth } = canvasInfo;
  const {
    frame,
    frameHeight,
    frameWidth,
    cellSize
  } = currentFrameInfo;

  const cols = Math.floor(frameWidth / cellSize);
  let ctx = canvas.getContext('2d');
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
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
  ctx = fillCanvasWithFrame(ctx, {
    grid,
    cols,
    cellSize,
    frameHeight,
    frameIdx: 0
  });
  return ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
}

const saveCanvasToDisk = (blob, fileExtension) => {
  saveAs(blob, `${randomString()}.${fileExtension}`);
};

function renderFrames(settings) {
  const {
    type,
    frames,
    duration,
    activeFrame,
    rows,
    columns,
    cellSize
  } = settings;

  const frameWidth = columns * cellSize;
  const frameHeight = rows * cellSize;
  const canvasWidth = frameWidth;
  const canvasHeight = frameHeight;

  const canvas = document.createElement('canvas');

  switch (type) {
    case 'single':
    case 'spritesheet':
      renderImageToCanvas(
        type,
        {
          canvas,
          canvasHeight,
          canvasWidth
        },
        {
          frame: activeFrame,
          frameHeight,
          frameWidth,
          cellSize
        },
        frames
      );
      canvas.toBlob(function(blob) {
        saveCanvasToDisk(blob, 'png');
      });
      break;
    default: {
    }
  }
}

export default renderFrames;
