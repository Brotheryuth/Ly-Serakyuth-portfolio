import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { skillService } from '../../services/userSkill.service';
import { projectService } from '../../services/featureProject.service';
import { educationService } from '../../services/education.service';
import { getSkillIcon } from '../../utils/skillicon';
import './Home.css';

function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userProfile, allSkills, allProjects, allEducation] = await Promise.all([
          userService.getProfile(),
          skillService.getAll(),
          projectService.getAllProject(),
          educationService.getAll()
        ]);
        setProfile(userProfile);
        setSkills(allSkills);
        setProjects(allProjects);
        
        const filteredEdu = allEducation.filter(edu => 
          edu.endDate.toLowerCase().includes('present')
        );
        setEducation(filteredEdu);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="portfolio-container">
      <div className="portfolio-grid">
        
        <div className="grid-column column-left">
          {profile?.avatarUrl && (
            <img src={profile.avatarUrl} alt={profile.userName} className="profile-img" />
          )}
        </div>

        <div className="grid-column column-center">
          <h1 className="greeting-heading">Hello!</h1>
          
          <div className="bio-area">
            <p>{profile?.aboutMe}</p>
            <p>Hope you enjoy my portfolio!</p>
          </div>

          <section className="info-block">
            <h2 className="info-block-title">EDUCATION</h2>
            {education.map((edu) => (
              <div key={edu._id} className="education-item">
                <div className="edu-time">{edu.startDate} - {edu.endDate}: {edu.institution}</div>
                <div className="edu-detail">{edu.degree || edu.level} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</div>
              </div>
            ))}
          </section>

          <footer className="contact-row">
            {profile?.userPhoneNumber && (
              <div className="contact-item">
                <span>Phone:</span> {profile.userPhoneNumber}
              </div>
            )}
            {profile?.userEmail && (
              <div className="contact-item">
                <span>Email:</span> {profile.userEmail}
              </div>
            )}
            {profile?.gitHubUrl && (
              <div className="contact-item">
                <span>GitHub:</span> <a href={profile.gitHubUrl} target="_blank" rel="noreferrer">profile</a>
              </div>
            )}
          </footer>
        </div>

        <div className="grid-column column-right">
          
          <section className="info-block">
            <h2 className="info-block-title">SKILLS</h2>
            <div className="skills-icon-grid">
              {skills.slice(0, 5).map((skill) => {
                const iconUrl = getSkillIcon(skill.name);
                return (
                  <div key={skill._id} className="skill-icon-card" title={skill.name}>
                    {iconUrl ? (
                      <img src={iconUrl} alt={skill.name} className="skill-svg-icon" />
                    ) : (
                      <span className="skill-unknown-icon">?</span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="info-block">
            <h2 className="info-block-title">PROJECTS</h2>
            <div className="projects-list">
              {projects.slice(0,2).map((proj) => (
                <Link to={`/project/${proj._id}`} key={proj._id} className="project-brief-item">
                  <div className="project-time">{proj.developPeriod}</div>
                  <div className="project-name">{proj.projectName}</div>
                </Link>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

export default Home;
