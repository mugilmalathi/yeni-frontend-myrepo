import React from 'react';
import './ReportCard.css';

interface ReportCardProps {
  position: string;
  company: string;
  companyLogo: string;
  date: string;
  score: number;
  tag: string;
  tagColor: 'blue' | 'orange' | 'green';
}

export const ReportCard: React.FC<ReportCardProps> = ({
  position,
  company,
  companyLogo,
  date,
  score,
  tag,
  tagColor
}) => {
  return (
    <div className="report-card">
      <div className="report-card__header">
        <h3 className="report-card__position">{position}</h3>
        <img 
          src={companyLogo} 
          alt={`${company} logo`} 
          className="report-card__logo"
        />
      </div>
      
      <div className="report-card__date">{date}</div>
      
      <div className="report-card__divider"></div>
      
      <div className="report-card__footer">
        <div className="report-card__score-section">
          <span className="report-card__score-label">Overall Score</span>
          <div className="report-card__score-row">
            <span className="report-card__score">{score}%</span>
            <span className={`report-card__tag report-card__tag--${tagColor}`}>
              {tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};