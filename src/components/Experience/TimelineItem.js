import React, { forwardRef } from 'react';

const TimelineItem = forwardRef(({ date, title, description, details, side }, ref) => {
  return (
    <div 
      className={`timeline-item ${side}`} 
      ref={ref}
    >
      <div className="timeline-content">
        <div className="timeline-date">{date}</div>
        <h3 className="timeline-title">{title}</h3>
        <p>{description}</p>
        <p>{details}</p>
      </div>
    </div>
  );
});

export default TimelineItem;