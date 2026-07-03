import React, { useState, useEffect } from 'react';
import { userService } from '../../services/user.service';
import './Footer.css';

function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {profile.userPhoneNumber && (
          <div className="footer-item">
            <span>Phone:</span> {profile.userPhoneNumber}
          </div>
        )}
        {profile.userEmail && (
          <div className="footer-item">
            <span>Email:</span> {profile.userEmail}
          </div>
        )}
        {profile.gitHubUrl && (
          <div className="footer-item">
            <span>GitHub:</span>{' '}
            <a href={profile.gitHubUrl} target="_blank" rel="noreferrer">
              profile
            </a>
          </div>
        )}
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} {profile.userName || 'Ly Serakyuth'}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
