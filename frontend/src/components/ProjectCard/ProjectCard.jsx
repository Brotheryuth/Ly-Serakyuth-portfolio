import React from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({project , showLink =true , children}) {
    const cardConten= (
        <div className='project-card-content'>
            <span className='project-time'>
                {project.developPeriod}
            </span>
            <h4 className='project-name'>
                {project.projectName}
            </h4>
        </div>
    )
  return (
    <div className='project-card-item'>
        {showLink ?
        ( <Link to={`/project/${project._id}`} className='project-brief-link'>
            {cardConten}
        </Link >

        ):cardConten}
        {children}
    </div>
  )
}

export default ProjectCard