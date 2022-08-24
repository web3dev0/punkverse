import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Preview from './Preview';

const PreviewBox = props => {
  const [animate, setAnimate] = useState(false);
  const [isNormalSize, setNormalSize] = useState(true);
  const frames = useSelector(state => state.present.get('frames'));
  const duration = useSelector(state =>
    state.present.get('duration')
  );
  const frameList = frames.get('list');
  const activeFrameIndex = frames.get('activeIndex');
  const columns = frames.get('columns');
  const rows = frames.get('rows');
  const { helpOn, callback } = props;
  const animMessage = `${animate ? 'Pause' : 'Play'} the animation`;
  const zoomMessage = `Zoom ${isNormalSize ? '0.5' : '1.5'}`;
  const zoomTooltip = helpOn ? zoomMessage : null;
  const smPixelSize = 3;
  const bgPixelSize = 6;

  return (
    <div className="preview-box">
      <div className="preview-box__container">
        <Preview
          frames={frameList}
          columns={columns}
          rows={rows}
          cellSize={isNormalSize ? bgPixelSize : smPixelSize}
          duration={duration}
          activeFrameIndex={activeFrameIndex}
          animate={animate}
          animationName="wip-animation"
        />
      </div>
    </div>
  );
};

export default PreviewBox;
