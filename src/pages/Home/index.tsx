import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { Header } from '../../components/layout/Header/Header';
import { ReportCard } from '../../components/molecules/ReportCard/ReportCard';
import { Button } from '../../components/atom/Button/Button';
import { Grid, List } from 'lucide-react';
import './index.css';

export const HomePage: React.FC = () => {
  const reportData = [
    {
      position: 'Business Analyst',
      company: 'Capgemini',
      companyLogo: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      date: '28 Oct, 2024',
      score: 76,
      tag: 'Reality',
      tagColor: 'blue' as const
    },
    {
      position: 'Senior Developer',
      company: 'Google',
      companyLogo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      date: '24 Oct, 2024',
      score: 54,
      tag: 'Virtual Reality',
      tagColor: 'orange' as const
    },
    {
      position: 'Embedded Systems',
      company: 'TCS',
      companyLogo: 'https://images.pexels.com/photos/7172019/pexels-photo-7172019.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      date: '25 Aug, 2024',
      score: 88,
      tag: 'WEB',
      tagColor: 'green' as const
    }
  ];

  return (
    <div className="home-page">
      <Sidebar />
      
      <div className="home-page__main">
        <Header userName="Pankaj" />
        
        <div className="home-page__content">
          <div className="home-page__reports-header">
            <h2 className="home-page__reports-title">Practice Zone Reports</h2>
            <div className="home-page__reports-controls">
              <div className="home-page__sort">
                <span className="home-page__sort-label">Sort by:</span>
                <select className="home-page__sort-select">
                  <option>Most relevant</option>
                  <option>Recent</option>
                  <option>Score</option>
                </select>
              </div>
              <div className="home-page__view-controls">
                <button className="home-page__view-btn home-page__view-btn--active">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="home-page__view-btn">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="home-page__reports-grid">
            {reportData.map((report, index) => (
              <ReportCard key={index} {...report} />
            ))}
          </div>
          
          <div className="home-page__show-all">
            <Button variant="primary">Show All</Button>
          </div>
        </div>
      </div>
    </div>
  );
};