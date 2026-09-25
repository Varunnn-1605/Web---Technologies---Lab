import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PageTemplate from './pages/PageTemplate';
import NoticesPage from './pages/NoticesPage';
import { navData } from './navData';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* MERN: Notices Page (MongoDB-backed) */}
            <Route path="/notices" element={<NoticesPage />} />

            {/* Routes Generated from navData */}
            {navData.map((item) => {
              // Skip home and notices (handled above)
              if (item.id === 'home' || item.id === 'notices') return null;

              const topRoute = (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    <PageTemplate
                      title={item.label}
                      category={item.label}
                      description={`Discover comprehensive information regarding ${item.label} at Apex University.`}
                      subItems={item.dropdown || []}
                    />
                  }
                />
              );

              const subRoutes = item.dropdown
                ? item.dropdown.map((sub) => (
                    <Route
                      key={sub.path}
                      path={sub.path}
                      element={
                        <PageTemplate
                          title={sub.label}
                          category={item.label}
                          description={sub.desc}
                          subItems={item.dropdown}
                        />
                      }
                    />
                  ))
                : [];

              return [topRoute, ...subRoutes];
            })}

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
