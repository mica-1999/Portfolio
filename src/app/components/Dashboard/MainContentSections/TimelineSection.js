import { getBadgeClass, getTimeFormatted } from '/src/utils/mainContentUtil';

export default function TimelineSection({ timeline, hidden, onToggleVisibility }) {
  return (
    <div className="col-lg-4 d-flex timeline-custom">
      <div className="card flex-grow-1">
        <div id="3" className={hidden ? 'blur_element' : ''}>
          <div className="card-header">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">Activity Timeline</h5>
              <div>
                <i className="ri-eye-off-line ri-lg ms-2 pointer" onClick={onToggleVisibility}></i>
              </div>
            </div>
          </div>
          <div className="card-body p-0 pt-4">
            <ul className="timeline card-timeline mb-0">
              {timeline.map((timeline_info) => {
                const { badgeColor } = getBadgeClass(timeline_info.state);
                const timelineTime = getTimeFormatted(timeline_info.timestamp);
                return (
                  <li className="timeline-item" key={timeline_info.description}>
                    <span className={`timeline-point timeline-point-${badgeColor}`}></span>
                    <div className="timeline-event ps-4">
                      <div className="timeline-header mb-2 pe-4">
                        <h6 className="mb-0">{timeline_info.title}</h6>
                        <small className="text-muted">{timelineTime}</small>
                      </div>
                      <p>{timeline_info.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
