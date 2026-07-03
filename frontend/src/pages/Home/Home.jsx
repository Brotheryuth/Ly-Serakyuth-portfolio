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
              {skills.map((skill) => (
                <SkillBadge key={skill._id} name={skill.name} />
              ))}
              <Link to="/skills" className="skill-icon-card view-more-card" title="View All Skills">
                <span className="skill-unknown-icon">View All Skills</span>
              </Link>
            </div>
          </section>

          <section className="info-block">
            <h2 className="info-block-title">PROJECTS</h2>
            <div className="projects-list">
              {projects.slice(0,2).map((proj) => (
                <ProjectCard key={proj._id} project={proj} />
              ))}
            

            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

export default Home;
