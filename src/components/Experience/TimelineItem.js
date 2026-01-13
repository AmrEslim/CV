import React, { forwardRef } from 'react';

const TimelineItem = forwardRef(({ date, title, description, details }, ref) => {
  return (
    <div
      className="timeline-item"
      ref={ref}
    >
      <div className="timeline-content">
        <div className="timeline-date">{date}</div>
        <h3 className="timeline-title">{title}</h3>
        <p>{description}</p>
        {details && <div className="timeline-details">{details}</div>}
      </div>
    </div>
  );
});

export default TimelineItem;