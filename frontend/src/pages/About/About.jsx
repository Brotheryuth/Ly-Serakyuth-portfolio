import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { educationService } from '../../services/education.service';
import { messageService } from '../../services/message.service';
import './About.css';

function About() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  // Contact Form States
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

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

  
  useEffect(() => {
    if (loading) return;

    const timeline = document.querySelector('.timeline-container');
    const timelineFill = document.querySelector('.timeline-line-fill');
    if (!timeline || !timelineFill) return;

    let ticking = false;

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      
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

  // Handle smooth scrolling to #contact hash on load/route change
  useEffect(() => {
    if (loading) return;
    
    if (window.location.hash === '#contact') {
      const timer = setTimeout(() => {
        const contactSec = document.getElementById('contact');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, window.location.hash]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      await messageService.addMessage(contactForm);
      setFormSuccess('Thank you! Your message has been sent successfully.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      setFormError('Failed to send message. Please try again later.');
      setTimeout(() => setFormError(''), 4000);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="about-page-container">
      {/* Sliding Alert Notifications */}
      {formSuccess && <div className="contact-alert success-alert">{formSuccess}</div>}
      {formError && <div className="contact-alert error-alert">{formError}</div>}
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
            
            <div className="about-actions-wrapper">
              <a href="/resume.pdf" download className="download-cv-btn">
                DOWNLOAD CV (PDF)
              </a>
              {profile.gitHubUrl && (
                <a href={profile.gitHubUrl} target="_blank" rel="noreferrer" className="about-github-btn" aria-label="GitHub" title="GitHub Profile">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}
            </div>
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

      {/* Contact Section */}
      <section id="contact" className="about-contact-section">
        <h2 className="section-title-alt">GET IN TOUCH</h2>
        <p className="contact-section-desc">Have a question or want to work together? Send me a message below!</p>
        
        <form onSubmit={handleSendMessage} className="about-contact-form">
          
          <div className="contact-form-row">
            <div className="contact-form-group">
              <label htmlFor="contact-name">Name</label>
              <input 
                type="text" 
                id="contact-name" 
                placeholder="Your Name" 
                value={contactForm.name} 
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required 
              />
            </div>
            
            <div className="contact-form-group">
              <label htmlFor="contact-email">Email</label>
              <input 
                type="email" 
                id="contact-email" 
                placeholder="Your Email" 
                value={contactForm.email} 
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required 
              />
            </div>
          </div>
          
          <div className="contact-form-group">
            <label htmlFor="contact-subject">Subject</label>
            <input 
              type="text" 
              id="contact-subject" 
              placeholder="Topic or Project Type" 
              value={contactForm.subject} 
              onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
              required 
            />
          </div>
          
          <div className="contact-form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea 
              id="contact-message" 
              rows="5" 
              placeholder="Your Message..." 
              value={contactForm.message} 
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              required 
            />
          </div>
          
          <button type="submit" className="contact-submit-btn" disabled={formLoading}>
            {formLoading ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default About;
