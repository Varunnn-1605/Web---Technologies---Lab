import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  FileText,
  FlaskConical,
  Users,
  Briefcase,
  PhoneCall,
  Bell,
  ArrowRight
} from 'lucide-react';
import { navData } from '../navData';

const Home = () => {
  const [latestNotices, setLatestNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  // Fetch latest notices from MongoDB via Express API
  useEffect(() => {
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => {
        setLatestNotices(data.slice(0, 3)); // Show only 3 on home
        setLoadingNotices(false);
      })
      .catch(() => setLoadingNotices(false));
  }, []);

  const iconsMap = {
    about: <Building2 size={32} />,
    academics: <GraduationCap size={32} />,
    admissions: <FileText size={32} />,
    research: <FlaskConical size={32} />,
    campus: <Users size={32} />,
    placements: <Briefcase size={32} />,
    notices: <Bell size={32} />,
    contact: <PhoneCall size={32} />
  };

  const featuredSections = navData.filter((item) => item.id !== 'home');

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container hero-inner">
          <span className="badge">Welcome to Apex University</span>
          <h1>Empowering Minds, Shaping Tomorrow</h1>
          <p>
            Explore our world-class academic programs, innovative research centers, vibrant campus life, and stellar placement opportunities.
          </p>
          <div className="hero-cta">
            <Link to="/admissions/overview" className="btn-primary">
              Explore Admissions <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Latest Notices Section (MERN — fetched from MongoDB) ─── */}
      <section className="notices-home-section">
        <div className="container">
          <div className="notices-home-header">
            <div>
              <h2><Bell size={22} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />Latest Notices</h2>
              <p>Important announcements from the university administration.</p>
            </div>
            <Link to="/notices" className="btn-secondary">View All Notices</Link>
          </div>

          {loadingNotices ? (
            <p className="notices-loading">Loading notices...</p>
          ) : latestNotices.length === 0 ? (
            <p className="notices-loading">No notices available.</p>
          ) : (
            <div className="notices-home-list">
              {latestNotices.map((notice) => (
                <div key={notice._id} className="notice-home-card">
                  <div className="notice-dot" />
                  <div>
                    <h4>{notice.title}</h4>
                    <p>{notice.body}</p>
                    <span className="notice-date">
                      {new Date(notice.date).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Navigation Quick Cards Section */}
      <section className="home-sections">
        <div className="container">
          <div className="section-title">
            <h2>Explore Our University</h2>
            <p>Select any category below or use the top navigation menu with interactive dropdowns.</p>
          </div>

          <div className="cards-grid">
            {featuredSections.map((menu) => (
              <div className="nav-card" key={menu.id}>
                <div className="card-icon">{iconsMap[menu.id] || <GraduationCap size={32} />}</div>
                <h3>{menu.label}</h3>
                <p>Explore programs, guidelines, and services under the {menu.label} division.</p>

                {menu.dropdown && menu.dropdown.length > 0 && (
                  <ul className="sub-links-preview">
                    {menu.dropdown.slice(0, 3).map((sub) => (
                      <li key={sub.path}>
                        <Link to={sub.path}>• {sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}

                <Link to={menu.path} className="card-link">
                  Visit Page <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
