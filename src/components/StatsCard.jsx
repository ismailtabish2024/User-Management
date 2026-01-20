import React from 'react';
import '../styles/StatsCard.css';

const StatsCard = ({ icon, title, value, description, color = 'blue' }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <p className="stats-title">{title}</p>
        <p className="stats-value">{value}</p>
        {description && <p className="stats-description">{description}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
