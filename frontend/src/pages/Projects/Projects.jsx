import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../../services/featureProject.service';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedProject, setSelectedProject] = useState(null); // For detailed modal

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProject();
        setProjects(data || []);
        setFilteredProjects(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Handle Search and Filter logic
  useEffect(() => {
    let result = projects;

    if (searchQuery.trim()) {
      result = result.filter(proj => 
        proj.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTech) {
      result = result.filter(proj => 
        proj.technologyUsed.includes(selectedTech)
      );
    }

    setFilteredProjects(result);
  }, [searchQuery, selectedTech, projects]);

  // Extract all unique technologies from all projects
  const uniqueTechs = Array.from(
    new Set(projects.flatMap(proj => proj.technologyUsed || []))
  ).sort();

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <div className="projects-page-container">
      <div className="projects-page-header">
        <Link to="/" className="back-link">
          &larr; Back to Home
        </Link>
        <h1 className="projects-page-title">FEATURED PROJECTS</h1>
        <p className="projects-page-subtitle">A curated list of web systems, databases, and APIs I've engineered.</p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="filter-search-container">
        <input 
          type="text" 
          placeholder="Search projects..." 
          className="project-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="tech-filters-list">
          <button 
            className={`tech-filter-badge ${selectedTech === '' ? 'active' : ''}`}
            onClick={() => setSelectedTech('')}
          >
            All
          </button>
          {uniqueTechs.map(tech => (
            <button 
              key={tech} 
              className={`tech-filter-badge ${selectedTech === tech ? 'active' : ''}`}
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-list-grid">
        {filteredProjects.map((proj, index) => (
          <div 
            key={proj._id} 
            className="project-page-card"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedProject(proj)}
          >
            <div className="project-card-header">
              <span className="project-period">{proj.developPeriod}</span>
              <h3 className="project-title">{proj.projectName}</h3>
            </div>
            <p className="project-description-text">{proj.projectDescription}</p>
            
            <div className="project-tech-tags">
              {proj.technologyUsed.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-card-footer" onClick={(e) => e.stopPropagation()}>
              <a 
                href={proj.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-card-action-link"
              >
                GitHub &rarr;
              </a>
              <a 
                href={proj.projectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-card-action-link primary-action"
              >
                Live Demo &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Reflection Modal */}
      {selectedProject && (
        <div className="project-details-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedProject(null)}>&times;</button>
            
            <div className="modal-header">
              <span className="modal-period">{selectedProject.developPeriod}</span>
              <h2 className="modal-project-title">{selectedProject.projectName}</h2>
              
              <div className="modal-links">
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  GitHub Repository
                </a>
                <a href={selectedProject.projectUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn primary">
                  Live Site
                </a>
              </div>
            </div>

            <div className="modal-body-content">
              <div className="modal-section">
                <h3>Description</h3>
                <p>{selectedProject.projectDescription}</p>
              </div>

              {selectedProject.challenge && (
                <div className="modal-section">
                  <h3>Challenges Faced</h3>
                  <p>{selectedProject.challenge}</p>
                </div>
              )}

              {selectedProject.problem && (
                <div className="modal-section">
                  <h3>Problems Encountered</h3>
                  <p>{selectedProject.problem}</p>
                </div>
              )}

              {selectedProject.lessonLearn && (
                <div className="modal-section">
                  <h3>Lessons Learned</h3>
                  <p>{selectedProject.lessonLearn}</p>
                </div>
              )}

              <div className="modal-section">
                <h3>Technologies Used</h3>
                <div className="modal-tech-list">
                  {selectedProject.technologyUsed.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
