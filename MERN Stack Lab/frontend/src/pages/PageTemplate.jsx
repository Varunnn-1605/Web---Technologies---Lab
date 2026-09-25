import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, BookOpen, Award, ArrowRight } from 'lucide-react';

const PageTemplate = ({ title, category, description, subItems = [] }) => {
  const location = useLocation();

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>{category}</span>
            {title !== category && (
              <>
                <ChevronRight size={14} />
                <span className="current-crumb">{title}</span>
              </>
            )}
          </div>
          <h1>{title}</h1>
          <p className="hero-description">{description}</p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="page-main-content">
        <div className="container content-grid">
          {/* Main Article */}
          <article className="main-article">
            <h2>Welcome to {title}</h2>
            <p>
              Apex University offers world-class education, state-of-the-art facilities, and a global
              learning environment designed to empower future leaders and innovators.
            </p>

            <div className="highlight-box">
              <BookOpen className="highlight-icon" size={24} />
              <div>
                <h4>Explore Opportunities in {title}</h4>
                <p>
                  Discover our comprehensive curriculum, vibrant student community, and high-impact
                  research initiatives tailored for holistic development.
                </p>
              </div>
            </div>

            <h3>Key Features & Highlights</h3>
            <ul className="feature-list">
              <li>Comprehensive academic curriculum accredited by global education boards.</li>
              <li>Internationally acclaimed faculty and industry mentor network.</li>
              <li>State-of-the-art laboratory infrastructure & digital library resources.</li>
              <li>Robust placement assist and career counselling support.</li>
            </ul>
          </article>

          {/* Sidebar Navigation */}
          {subItems.length > 0 && (
            <aside className="sidebar">
              <div className="sidebar-card">
                <h3>Related Sections</h3>
                <ul className="sidebar-menu">
                  {subItems.map((sub) => {
                    const isActive = location.pathname === sub.path;
                    return (
                      <li key={sub.path}>
                        <Link to={sub.path} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                          <span>{sub.label}</span>
                          <ArrowRight size={14} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="sidebar-card info-card">
                <Award size={28} className="info-icon" />
                <h4>Need Admissions Assistance?</h4>
                <p>Our counseling team is available to assist you with applications and program selection.</p>
                <Link to="/contact" className="btn-secondary">Contact Desk</Link>
              </div>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
};

export default PageTemplate;
