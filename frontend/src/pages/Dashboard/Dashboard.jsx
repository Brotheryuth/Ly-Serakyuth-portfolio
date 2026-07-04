import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { projectService } from '../../services/featureProject.service';
import { skillService } from '../../services/userSkill.service';
import { educationService } from '../../services/education.service';
import { userService } from '../../services/user.service';
import { messageService } from '../../services/message.service';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  
  // Loading & Error States
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modal / Form States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'project', 'skill', 'education'
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form Fields - Project
  const [projForm, setProjForm] = useState({
    projectName: '',
    projectDescription: '',
    technologyUsed: '',
    developPeriod: '',
    projectUrl: '',
    githubUrl: '',
    projectImage: '',
    lessonLearn: '',
    challenge: '',
    problem: '',
    feature: false
  });

  // Form Fields - Skill
  const [skillForm, setSkillForm] = useState({
    name: '',
    skillLevel: 80,
    category: 'Frontend'
  });

  // Form Fields - Education
  const [eduForm, setEduForm] = useState({
    institution: '',
    level: 'University',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // Form Fields - Profile
  const [profileForm, setProfileForm] = useState({
    userName: '',
    email: '',
    aboutMe: '',
    avatarUrl: ''
  });

  // Check auth and load initial dashboard data
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    setActionError('');
    try {
      const [projData, skillData, eduData, profileData, msgData] = await Promise.all([
        projectService.getAllProject(),
        skillService.getAll(),
        educationService.getAll(),
        userService.getProfile(),
        messageService.getAllMessage()
      ]);
      setProjects(projData || []);
      setSkills(skillData || []);
      setEducation(eduData || []);
      setProfile(profileData);
      
      if (profileData) {
        setProfileForm({
          userName: profileData.userName || '',
          email: profileData.email || '',
          aboutMe: profileData.aboutMe || '',
          avatarUrl: profileData.avatarUrl || ''
        });
      }
      setMessages(msgData || []);
    } catch (err) {
      console.error(err);
      setActionError('Failed to load portfolio data from backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  const triggerAlert = (type, message) => {
    if (type === 'success') {
      setActionSuccess(message);
      setTimeout(() => setActionSuccess(''), 4000);
    } else {
      setActionError(message);
      setTimeout(() => setActionError(''), 4000);
    }
  };

  // Close modals and reset fields
  const resetModals = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
    setProjForm({
      projectName: '',
      projectDescription: '',
      technologyUsed: '',
      developPeriod: '',
      projectUrl: '',
      githubUrl: '',
      projectImage: '',
      lessonLearn: '',
      challenge: '',
      problem: '',
      feature: false
    });
    setSkillForm({ name: '', skillLevel: 80, category: 'Frontend' });
    setEduForm({
      institution: '',
      level: 'University',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  // --- CRUD: PROJECTS ---
  const handleOpenProjectModal = (project = null) => {
    setModalType('project');
    if (project) {
      setEditMode(true);
      setEditId(project._id);
      setProjForm({
        projectName: project.projectName || '',
        projectDescription: project.projectDescription || '',
        technologyUsed: project.technologyUsed ? project.technologyUsed.join(', ') : '',
        developPeriod: project.developPeriod || '',
        projectUrl: project.projectUrl || '',
        githubUrl: project.githubUrl || '',
        projectImage: project.projectImage || '',
        lessonLearn: project.lessonLearn || '',
        challenge: project.challenge || '',
        problem: project.problem || '',
        feature: !!project.feature
      });
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...projForm,
      technologyUsed: projForm.technologyUsed
        ? projForm.technologyUsed.split(',').map(s => s.trim()).filter(Boolean)
        : []
    };

    try {
      if (editMode) {
        await projectService.updateProject(editId, payload);
        triggerAlert('success', 'Project updated successfully!');
      } else {
        await projectService.createProject(payload);
        triggerAlert('success', 'Project created successfully!');
      }
      resetModals();
      loadAllData();
    } catch (err) {
      console.error(err);
      triggerAlert('error', err.response?.data?.message || 'Failed to save project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.deleteProject(id);
      triggerAlert('success', 'Project deleted successfully!');
      loadAllData();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to delete project.');
    }
  };

  // --- CRUD: SKILLS ---
  const handleOpenSkillModal = (skill = null) => {
    setModalType('skill');
    if (skill) {
      setEditMode(true);
      setEditId(skill._id);
      setSkillForm({
        name: skill.name || '',
        skillLevel: skill.skillLevel || 80,
        category: skill.category || 'Frontend'
      });
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await skillService.updateSkill(editId, skillForm);
        triggerAlert('success', 'Skill updated successfully!');
      } else {
        await skillService.addSkill(skillForm);
        triggerAlert('success', 'Skill created successfully!');
      }
      resetModals();
      loadAllData();
    } catch (err) {
      console.error(err);
      triggerAlert('error', err.response?.data?.message || 'Failed to save skill.');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await skillService.deleteSkill(id);
      triggerAlert('success', 'Skill deleted successfully!');
      loadAllData();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to delete skill.');
    }
  };

  // --- CRUD: EDUCATION ---
  const handleOpenEduModal = (edu = null) => {
    setModalType('education');
    if (edu) {
      setEditMode(true);
      setEditId(edu._id);
      setEduForm({
        institution: edu.institution || '',
        level: edu.level || 'University',
        degree: edu.degree || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        description: edu.description || ''
      });
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleSaveEdu = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await educationService.updateEducation(editId, eduForm);
        triggerAlert('success', 'Education record updated successfully!');
      } else {
        await educationService.createEducation(eduForm);
        triggerAlert('success', 'Education record created successfully!');
      }
      resetModals();
      loadAllData();
    } catch (err) {
      console.error(err);
      triggerAlert('error', err.response?.data?.message || 'Failed to save education record.');
    }
  };

  const handleDeleteEdu = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education record?')) return;
    try {
      await educationService.deleteEducation(id);
      triggerAlert('success', 'Education record deleted successfully!');
      loadAllData();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to delete education.');
    }
  };

  // --- PROFILE SAVE ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await userService.updateProfile(profile._id, profileForm);
      triggerAlert('success', 'Profile info updated successfully!');
      loadAllData();
    } catch (err) {
      console.error(err);
      triggerAlert('error', 'Failed to update profile info.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Alert Notices */}
      {actionError && <div className="dash-alert error-alert">{actionError}</div>}
      {actionSuccess && <div className="dash-alert success-alert">{actionSuccess}</div>}

      <div className="dashboard-layout">
        
        {/* Navigation Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>PORTFOLIO ADMIN</h3>
            <p>Welcome, {profile?.userName || 'Admin'}</p>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`nav-item-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => { setActiveTab('projects'); setActionError(''); }}
            >
              Projects
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => { setActiveTab('skills'); setActionError(''); }}
            >
              Skills
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => { setActiveTab('education'); setActionError(''); }}
            >
              Education
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setActionError(''); }}
            >
              Profile Settings
            </button>
            <button 
              className={`nav-item-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => { setActiveTab('messages'); setActionError(''); }}
            >
              Inbox Messages ({messages.length})
            </button>
            <button className="nav-item-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </aside>

        {/* Content Pane */}
        <main className="dashboard-content">
          
          {/* TAB 1: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="tab-pane">
              <div className="tab-pane-header">
                <h2>Manage Projects</h2>
                <button className="btn btn-primary" onClick={() => handleOpenProjectModal()}>
                  + Add Project
                </button>
              </div>
              
              <div className="dashboard-grid-list">
                {projects.map((proj) => (
                  <div key={proj._id} className="dashboard-item-card">
                    <div className="item-details">
                      <h4>{proj.projectName}</h4>
                      <p className="subtitle">{proj.developPeriod} {proj.feature && <span className="feat-badge">Featured</span>}</p>
                      <p className="desc-summary">{proj.projectDescription}</p>
                    </div>
                    <div className="item-actions">
                      <button className="btn btn-edit" onClick={() => handleOpenProjectModal(proj)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDeleteProject(proj._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS */}
          {activeTab === 'skills' && (
            <div className="tab-pane">
              <div className="tab-pane-header">
                <h2>Manage Skills</h2>
                <button className="btn btn-primary" onClick={() => handleOpenSkillModal()}>
                  + Add Skill
                </button>
              </div>
              
              <div className="dashboard-grid-list">
                {skills.map((skill) => (
                  <div key={skill._id} className="dashboard-item-card">
                    <div className="item-details">
                      <h4>{skill.name}</h4>
                      <p className="subtitle">Category: {skill.category} | Level: {skill.skillLevel}%</p>
                    </div>
                    <div className="item-actions">
                      <button className="btn btn-edit" onClick={() => handleOpenSkillModal(skill)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDeleteSkill(skill._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATION */}
          {activeTab === 'education' && (
            <div className="tab-pane">
              <div className="tab-pane-header">
                <h2>Manage Education</h2>
                <button className="btn btn-primary" onClick={() => handleOpenEduModal()}>
                  + Add Education
                </button>
              </div>
              
              <div className="dashboard-grid-list">
                {education.map((edu) => (
                  <div key={edu._id} className="dashboard-item-card">
                    <div className="item-details">
                      <h4>{edu.institution}</h4>
                      <p className="subtitle">{edu.startDate} - {edu.endDate} | {edu.level}</p>
                      <p className="desc-summary">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                    </div>
                    <div className="item-actions">
                      <button className="btn btn-edit" onClick={() => handleOpenEduModal(edu)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDeleteEdu(edu._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="tab-pane">
              <div className="tab-pane-header">
                <h2>Profile Settings</h2>
              </div>
              <form className="dashboard-profile-form" onSubmit={handleSaveProfile}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Username</label>
                    <input 
                      type="text" 
                      value={profileForm.userName} 
                      onChange={(e) => setProfileForm({ ...profileForm, userName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={profileForm.email} 
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Avatar / Profile Image URL</label>
                  <input 
                    type="url" 
                    value={profileForm.avatarUrl} 
                    onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label>Bio (About Me Description)</label>
                  <textarea 
                    rows="6" 
                    value={profileForm.aboutMe} 
                    onChange={(e) => setProfileForm({ ...profileForm, aboutMe: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-save-profile">
                  Save Profile Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: INBOX MESSAGES */}
          {activeTab === 'messages' && (
            <div className="tab-pane">
              <div className="tab-pane-header">
                <h2>Inbox Messages</h2>
              </div>
              
              <div className="messages-list">
                {messages.length === 0 ? (
                  <p className="no-messages">Your inbox is empty.</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} className="message-item-card">
                      <div className="msg-header">
                        <div>
                          <strong>{msg.name}</strong> 
                          <span className="msg-email"> &lt;{msg.email}&gt;</span>
                        </div>
                        <span className="msg-date">
                          {msg.createAt ? new Date(msg.createAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="msg-subject">
                        Subject: <span>{msg.subject || '(No Subject)'}</span>
                      </div>
                      <div className="msg-body">
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ADMIN EDIT/CREATE OVERLAY MODALS */}
      {showModal && (
        <div className="dashboard-modal-overlay" onClick={resetModals}>
          <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-dash-modal" onClick={resetModals}>&times;</button>
            
            <h3>{editMode ? 'Edit' : 'Add New'} {modalType.toUpperCase()}</h3>
            
            {/* Modal Form - Project */}
            {modalType === 'project' && (
              <form onSubmit={handleSaveProject} className="modal-form-fields">
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Project Name *</label>
                    <input 
                      type="text" 
                      value={projForm.projectName} 
                      onChange={(e) => setProjForm({ ...projForm, projectName: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Development Period *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2 weeks / Apr 2026" 
                      value={projForm.developPeriod} 
                      onChange={(e) => setProjForm({ ...projForm, developPeriod: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Technologies Used * (Comma-separated list)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. React, CSS, Node.js, Spring Boot" 
                    value={projForm.technologyUsed} 
                    onChange={(e) => setProjForm({ ...projForm, technologyUsed: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>GitHub Repository URL</label>
                    <input 
                      type="url" 
                      value={projForm.githubUrl} 
                      onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Live Demo URL *</label>
                    <input 
                      type="url" 
                      value={projForm.projectUrl} 
                      onChange={(e) => setProjForm({ ...projForm, projectUrl: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Image URL (S3 or Web Link)</label>
                  <input 
                    type="url" 
                    value={projForm.projectImage} 
                    onChange={(e) => setProjForm({ ...projForm, projectImage: e.target.value })}
                    placeholder="https://..." 
                  />
                </div>

                <div className="form-group">
                  <label>Description Summary *</label>
                  <textarea 
                    rows="3" 
                    value={projForm.projectDescription} 
                    onChange={(e) => setProjForm({ ...projForm, projectDescription: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Challenges Faced</label>
                  <textarea 
                    rows="2" 
                    value={projForm.challenge} 
                    onChange={(e) => setProjForm({ ...projForm, challenge: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Problems Encountered</label>
                  <textarea 
                    rows="2" 
                    value={projForm.problem} 
                    onChange={(e) => setProjForm({ ...projForm, problem: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Lessons Learned</label>
                  <textarea 
                    rows="2" 
                    value={projForm.lessonLearn} 
                    onChange={(e) => setProjForm({ ...projForm, lessonLearn: e.target.value })}
                  />
                </div>

                <div className="form-group-checkbox">
                  <input 
                    type="checkbox" 
                    id="feat-chk"
                    checked={projForm.feature} 
                    onChange={(e) => setProjForm({ ...projForm, feature: e.target.checked })} 
                  />
                  <label htmlFor="feat-chk">Feature this project on homepage preview</label>
                </div>

                <button type="submit" className="btn btn-modal-submit">
                  {editMode ? 'Save Changes' : 'Create Project'}
                </button>
              </form>
            )}

            {/* Modal Form - Skill */}
            {modalType === 'skill' && (
              <form onSubmit={handleSaveSkill} className="modal-form-fields">
                <div className="form-group">
                  <label>Skill Name *</label>
                  <input 
                    type="text" 
                    value={skillForm.name} 
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select 
                      value={skillForm.category} 
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      required
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools</option>
                      <option value="Languages">Languages</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Skill Level (Percent: {skillForm.skillLevel}%)</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="100"
                      value={skillForm.skillLevel} 
                      onChange={(e) => setSkillForm({ ...skillForm, skillLevel: parseInt(e.target.value) })}
                      required 
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-modal-submit">
                  {editMode ? 'Save Changes' : 'Create Skill'}
                </button>
              </form>
            )}

            {/* Modal Form - Education */}
            {modalType === 'education' && (
              <form onSubmit={handleSaveEdu} className="modal-form-fields">
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Institution Name *</label>
                    <input 
                      type="text" 
                      value={eduForm.institution} 
                      onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Education Level *</label>
                    <select 
                      value={eduForm.level} 
                      onChange={(e) => setEduForm({ ...eduForm, level: e.target.value })}
                      required
                    >
                      <option value="University">University</option>
                      <option value="High School">High School</option>
                      <option value="Secondary School">Secondary School</option>
                      <option value="Primary School">Primary School</option>
                      <option value="Other">Course / Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Degree (e.g. Bachelor of Engineering)</label>
                    <input 
                      type="text" 
                      value={eduForm.degree} 
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Field of Study (e.g. Software Engineering)</label>
                    <input 
                      type="text" 
                      value={eduForm.fieldOfStudy} 
                      onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Start Date * (Year / Period)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2025" 
                      value={eduForm.startDate} 
                      onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date * (Year / Period)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Present" 
                      value={eduForm.endDate} 
                      onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    rows="3" 
                    value={eduForm.description} 
                    onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-modal-submit">
                  {editMode ? 'Save Changes' : 'Create Record'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;