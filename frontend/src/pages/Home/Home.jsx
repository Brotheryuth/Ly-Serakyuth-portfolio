import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { skillService } from '../../services/userSkill.service';
import { projectService } from '../../services/featureProject.service';
import { educationService } from '../../services/education.service';
import SkillBadge from '../../components/SkillBadge/SkillBadge';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
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


        </div>

        <div className="grid-column column-right">
          
          <section id="skills" className="info-block">
            <h2 className="info-block-title">SKILLS</h2>
            <div className="skills-icon-grid">
              {skills.slice(0, 5).map((skill) => (
                <SkillBadge key={skill._id} name={skill.name} />
              ))}
              <Link to="/skills" className="skill-icon-card view-all-skills-card" title="Explore All Skills">
                <div className="view-all-content">
                  <span className="view-all-symbol">&rarr;</span>
                  <span className="view-all-text">MORE</span>
                </div>
              </Link>
            </div>
          </section>
          <section className="info-block">
            <h2 className="info-block-title">PROJECTS</h2>
            <div className="homepage-projects-horizontal-list">
              {projects.slice(0, 2).map((proj) => (
                <Link key={proj._id} to="/projects" className="homepage-project-text-item">
                  <span className="project-time">{proj.developPeriod}</span>
                  <h4 className="project-name">{proj.projectName}</h4>
                </Link>
              ))}
              <Link to="/projects" className="homepage-project-text-item project-more-item">
                <span className="project-time">EXPLORE</span>
                <h4 className="project-name">MORE &rarr;</h4>
              </Link>
            </div>

            {/* Action Buttons in Right Column */}
            <div className="homepage-column-actions">
              <Link to="/projects" className="col-action-btn outline-col-btn">
                PROJECTS
              </Link>
              <a href="mailto:lyserakyuth06@gmail.com" className="col-action-btn solid-col-btn">
                HIRE ME
              </a>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

export default Home;
