import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { educationService } from '../../services/education.service';
import './About.css';

function About() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userProfile, allEducation] = await Promise.all([
          userService.getProfile(),
          educationService.getAll()
        ]);
        setProfile(userProfile);
        
        const sortedEdu = (allEducation || []).sort((a, b) => {
          const getYear = (dateStr) => {
            if (dateStr.toLowerCase().includes('present')) return 9999;
            const match = dateStr.match(/\d{4}/);
            return match ? parseInt(match[0], 10) : 0;
          };
          return getYear(b.endDate) - getYear(a.endDate);
        });
        setEducation(sortedEdu);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Butter-smooth scroll animation using requestAnimationFrame and direct DOM updates
  useEffect(() => {
    if (loading) return;

    const timeline = document.querySelector('.timeline-container');
    const timelineFill = document.querySelector('.timeline-line-fill');
    if (!timeline || !timelineFill) return;

    let ticking = false;

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Middle of the screen is the trigger focus point
      const focusPoint = windowHeight / 2;
      const totalHeight = rect.height;
      const distanceFromTop = focusPoint - rect.top;
      
      const progress = (distanceFromTop / totalHeight) * 100;
      const clampedProgress = Math.max(0, Math.min(100, progress));
      
      timelineFill.style.height = `${clampedProgress}%`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    updateProgress(); // Run once initially

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [loading]);

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="about-page-container">
      {/* Profile Section */}
      <section className="about-profile-section">
        <div className="about-profile-grid">
          <div className="about-avatar-wrapper">
            {profile?.avatarUrl && (
              <img src={profile.avatarUrl} alt={profile.userName} className="about-avatar-img" />
            )}
          </div>
          <div className="about-info-wrapper">
            <h1 className="about-name">{profile?.userName?.toUpperCase() || 'ABOUT ME'}</h1>
            <p className="about-bio">{profile?.aboutMe}</p>
            <a href="/resume.pdf" download className="download-cv-btn">
              DOWNLOAD CV (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* What I Do (Services) Section */}
      <section className="about-services-section">
        <h2 className="section-title-alt">WHAT I DO</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3 className="service-card-title">Backend API Engineering</h3>
            <p className="service-card-desc">Designing and building robust RESTful APIs using Java, JavaScript, and TypeScript, incorporating secure role-based access control (RBAC) and system integration.</p>
          </div>
          <div className="service-card">
            <h3 className="service-card-title">Database Modeling & SQL</h3>
            <p className="service-card-desc">Structuring databases and writing complex SQL logic (joins, aggregations, DML, subqueries, and predicate conditions) with MySQL, PostgreSQL, and MongoDB.</p>
          </div>
          <div className="service-card">
            <h3 className="service-card-title">Cloud Operations</h3>
            <p className="service-card-desc">Deploying server environments on AWS EC2, managing Amplify production builds, and proxying secure SSL connections via Cloudflare.</p>
          </div>
        </div>
      </section>

      {/* My Strengths Section */}
      <section className="about-strengths-section">
        <h2 className="section-title-alt">CORE STRENGTHS</h2>
        <div className="strengths-grid">
          <div className="strength-badge">Problem Solving</div>
          <div className="strength-badge">Continuous Learning</div>
          <div className="strength-badge">Attention to Details</div>
          <div className="strength-badge">Git & Team Collaboration</div>
          <div className="strength-badge">Clean Code & Architecture</div>
          <div className="strength-badge">Responsive Design</div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline-section">
        <h2 className="timeline-section-title">EDUCATION HISTORY</h2>
        
        <div className="timeline-container">
          <div className="timeline-line">
            <div className="timeline-line-fill"></div>
          </div>
          
          {education.map((edu, index) => (
            <div key={edu._id} className="timeline-item" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="timeline-dot-wrapper">
                <div className="timeline-dot"></div>
              </div>
              <div className="timeline-content-card">
                <span className="timeline-date">{edu.startDate} — {edu.endDate}</span>
                <h3 className="timeline-institution">{edu.institution}</h3>
                <span className="timeline-level-badge">
                  {edu.level === 'Other' ? 'COURSE / CERTIFICATE' : edu.level.toUpperCase()}
                </span>
                {edu.degree && (
                  <h4 className="timeline-degree">
                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                  </h4>
                )}
                {edu.description && <p className="timeline-desc">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
