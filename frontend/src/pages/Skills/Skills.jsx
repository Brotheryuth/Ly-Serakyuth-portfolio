import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { skillService } from '../../services/userSkill.service';
import SkillBadge from '../../components/SkillBadge/SkillBadge';
import './Skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillService.getAll();
        setSkills(data || []);
        // Trigger progress bar animations right after loading completes
        setTimeout(() => setAnimate(true), 100);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return <div className="loading-state">Loading...</div>;

  const categories = ["Frontend", "Backend", "Database", "Tools", "Languages"];
  
  const groupedSkills = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(skill => skill.category === cat);
    return acc;
  }, {});

  return (
    <div className="skills-page-container">
      <div className="skills-page-header">
        <Link to="/" className="back-link">
          &larr; Back to Home
        </Link>
        <h1 className="skills-page-title">ALL SKILLS</h1>
      </div>

      <div className="skills-categories-list">
        {categories.map((category) => {
          const categorySkills = groupedSkills[category] || [];
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="skills-category-section">
              <h2 className="category-section-title">{category.toUpperCase()}</h2>
              <div className="skills-category-grid">
                {categorySkills.map((skill) => (
                  <div key={skill._id} className="skill-detail-card">
                    <div className="skill-card-badge-wrapper">
                      <SkillBadge name={skill.name} />
                    </div>
                    <div className="skill-card-info">
                      <h3 className="skill-card-name">{skill.name}</h3>
                      <div className="skill-level-container">
                        <span className="skill-level-text">{skill.skillLevel}%</span>
                        <div className="skill-progress-bar-bg">
                          <div 
                            className="skill-progress-bar-fill" 
                            style={{ width: animate ? `${skill.skillLevel}%` : '0%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
