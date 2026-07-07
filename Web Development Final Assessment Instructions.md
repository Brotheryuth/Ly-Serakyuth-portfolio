Web Development Final Assessment

Personal Portfolio Website

1. Project Overview

For  your  ﬁnal  assessment,  you  will  design,  develop,  test,  and  deploy  your  own
professional portfolio website.

The  portfolio  should  introduce you as a software engineering student and demonstrate
your  technical  abilities,  academic  projects,  professional  interests,  and  personal
achievements.  It  should  be  suitable  for  sharing  with  potential  employers,  internship
providers, lecturers, clients, and professional contacts.

This  is  not  only  a  website  design  assignment. You are expected to create a functioning
full-stack web application that applies the main technologies studied during the course:

●  HTML5
●  CSS3
●  JavaScript
●  ES6+
●  React
●  RESTful API development
●  MongoDB
●  Cloud deployment using AWS
●  Git and GitHub

The completed website must be publicly accessible through a working URL.

2. Project Type

●  Assessment type: Individual project
●  Project title: My Professional Portfolio Website
●  Total marks: 100 marks
●  Submission  format:  Source  code,  deployed  website,  project  report,  and

presentation

●  Development period: One week

Each student must create an original portfolio. Students may discuss technical ideas with
classmates,  but  the  design,  code,  content,  database,  report, and presentation must be
their own work.

3. Project Scenario

Imagine that you are preparing to apply for:

●  A software development internship
●  A junior web developer position
●  A freelance development project
●  A scholarship or exchange opportunity
●  A university competition
●  A professional networking opportunity

Your portfolio website should help a visitor understand:

1.  Who you are
2.  What technical skills you have
3.  What projects you have completed
4.  What type of software engineering work interests you
5.  How they can contact you
6.  Why they should consider working with you

Your portfolio should present a clear and professional personal identity.

4. Main Project Requirements

4.1 Portfolio Content

Your portfolio must contain the following sections or pages.

A. Home or Landing Page

The landing page should immediately introduce you.

It should include:

●  Your full name
●  A professional title, such as:

o  Software Engineering Student

o  Junior Full-Stack Developer
o  Front-End Developer
o  Web Application Developer

●  A short professional introduction
●  A professional photograph, illustration, avatar, or appropriate personal visual
●  A call-to-action button, such as:
o  View My Projects
o  Download My CV
o  Contact Me

The ﬁrst screen should clearly communicate who you are and what you do.

B. About Me

This section should describe:

●  Your educational background
●  Your interest in software engineering
●  Your career goals
●  Your strengths
●  Your personal or professional values
●  The type of projects or technologies you enjoy

Do not include private or unnecessary personal information.

C. Technical Skills

Present your technical skills clearly.

Possible categories include:

●  Programming languages
●  Front-end technologies
●  Back-end technologies
●  Databases
●  Cloud technologies
●  Development tools
●  Design tools
●  Software engineering practices

Do  not  simply  display  a  long  list.  Organize  the  skills  using  cards,  categories,  icons,
progress indicators, or another clear visual structure.

D. Projects

You must present at least three projects.

At least one project should be a meaningful software development project that you have
completed individually or as part of a group.

Each project should include:

●  Project title
●  Project image or screenshot
●  Short description
●  Problem addressed by the project
●  Main features
●  Technologies used
●  Your individual contribution
●  Challenges encountered
●  Lessons learned
●  GitHub repository link, when available
●  Live demonstration link, when available

Project information must be stored in MongoDB and retrieved through your RESTful API.

E. Education and Experience

Include relevant information such as:

Internships

●  University programme
●  Relevant courses
●  Academic achievements
●
●  Work experience
●  Volunteer experience
●  Competitions
●  Workshops
●  Certiﬁcations
●  Leadership activities

Students without formal work experience may include academic, volunteer, competition,
or personal development experience.

F. Contact Section

The website must provide a professional method for visitors to contact you.

Include:

●  Contact form
●  Professional email address
●  GitHub proﬁle
●  LinkedIn proﬁle, when available
●  Other relevant professional links

The contact form must include at least:

●  Name
●  Email address
●  Subject
●  Message

Submitted  messages  must  be  validated  and  sent  to  the  backend  API.  The  messages
should then be stored in MongoDB.

5. Front-End Requirements

The front end must be developed using React.

Your React application must demonstrate the following:

5.1 Component-Based Development

Create reusable components such as:

●  Navigation bar
●  Footer
●  Project card
●  Skill card
●  Section heading
●  Contact form
●  Button
●  Modal or project-details component
●  Loading indicator
●  Error message component

Avoid placing the entire application inside one component.

5.2 React Features

Your application should demonstrate appropriate use of:

●  Functional components
●  Props
●  State
●  Event handling
●  Conditional rendering
●  List rendering
●  Forms
●  React Hooks
●  API requests
●  Client-side routing

You may use React Router to create separate pages or routes.

5.3 JavaScript and ES6+

Your code should appropriately apply modern JavaScript features such as:

●
let and const
●  Arrow functions
●  Template literals
●  Destructuring
●  Spread and rest operators
●  Array methods such as map(), ﬁlter(), and ﬁnd()
●  Modules using import and export
●  Promises
●  async and await
●  Error handling using try and catch

5.4 Responsive Design

The website must work correctly on:

●  Desktop computers
●  Tablets
●  Mobile phones

Your  layout  should  adapt  to  different  screen  sizes  without  horizontal  scrolling,
overlapping elements, unreadable text, or broken navigation.

5.5 User Interface Quality

Your website should demonstrate:

●  Consistent colors
●  Readable typography
●  Clear navigation
●  Appropriate spacing
●  Visual hierarchy
●  Consistent buttons and components
●  High-quality images
●  Professional presentation

Do not use excessive animations, colors, fonts, or visual effects that reduce usability.

6. Back-End Requirements

You must create a backend application that provides a RESTful API.

Node.js  and  Express  are  recommended  unless  the  lecturer  approves  another  suitable
technology.

Your API must include meaningful endpoints.

6.1 Project Endpoints

Example endpoints include:

HTTP Method

GET

GET

POST

PUT or PATCH

DELETE

Endpoint

/api/projects

Purpose

Retrieve all projects

/api/projects/:id

Retrieve one project

/api/projects

/api/projects/:id

/api/projects/:id

Add a new project

Update a project

Delete a project

Your application must demonstrate the four main CRUD operations:

●  Create
●  Read

●  Update
●  Delete

6.2 Contact Endpoints

Example contact endpoint:

HTTP Method

Endpoint

Purpose

POST

GET

/api/messages

/api/messages

Submit a contact message

Retrieve submitted messages

Contact messages must not be displayed publicly.

6.3 API Responses

The API should return appropriate:

●  JSON responses
●  HTTP status codes
●  Success messages
●  Error messages

Examples of relevant status codes include:

●  200 OK
●  201 Created
●  400 Bad Request
●  404 Not Found
●  500 Internal Server Error

6.4 Validation

Validate data before saving it to the database.

For example:

●  Required ﬁelds must not be empty.
●  Email addresses must use a valid format.
●  Project titles must meet reasonable length requirements.
●
●  Contact messages must have a reasonable minimum and maximum length.

Invalid database IDs must be handled.

Validation should occur on both the client side and server side.

7. MongoDB Requirements

MongoDB must be used to store application data.

At minimum, create the following collections:

Projects Collection

Suggested ﬁelds:

{
  title: String,
  description: String,
  problem: String,
  technologies: [String],
  imageUrl: String,
  githubUrl: String,
  liveUrl: String,
  contribution: String,
  challenges: String,
  lessonsLearned: String,
  featured: Boolean,
  createdAt: Date
}

Messages Collection

Suggested ﬁelds:

{
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: Date
}

You may create additional collections for:

●  Skills
●  Education
●  Work experience
●  Certiﬁcates
●  Testimonials
●  Blog posts

Database connection information must not be written directly into the source code.

Use environment variables for sensitive information.

8. Portfolio Management Requirement

Your application must provide a method to manage portfolio project data.

At minimum, you must be able to:

●  Add a project
●  View existing projects
●  Edit a project
●  Delete a project

This may be implemented through:

●  A simple administration dashboard
●  A protected management page
●  A separate content management interface
●  An  API  testing  tool  during  development,  combined  with  a  clearly  documented

process

A visual administration dashboard is strongly recommended.

Authentication  may  be  included  as  an  advanced  feature.  However,  publicly  deployed
create, update, and delete endpoints must not be left completely unprotected.

9. AWS Deployment Requirements

The ﬁnal application must be deployed and publicly accessible.

You may use suitable AWS services such as:

●  AWS Amplify
●  Amazon S3
●  Amazon CloudFront
●  Amazon EC2
●  AWS Elastic Beanstalk
●  AWS Lambda
●  Amazon API Gateway

A typical deployment structure could be:

●  React front end deployed through AWS Amplify or Amazon S3
●  Backend deployed through EC2, Elastic Beanstalk, or Lambda
●  MongoDB hosted using an appropriate cloud database service
●  Environment variables conﬁgured securely on the deployment platform

Your deployed application must:

●  Open through a public URL
●  Connect successfully to the backend
●  Retrieve data from MongoDB
●  Submit the contact form
●  Work without major console errors
●  Remain usable on desktop and mobile devices

A project that works only on localhost is not considered fully submitted.

10. Security and Professional Practice

You must apply basic security practices.

Your project must not expose:

●  Database passwords
●  AWS credentials
●  API keys
●  Secret tokens
●  Personal passwords

Use a .env ﬁle during local development and include .env in .gitignore.

Do not upload sensitive values to GitHub.

You should also:

●  Validate and sanitize user input.
●  Avoid displaying detailed server errors to public users.
●  Conﬁgure Cross-Origin Resource Sharing appropriately.
●  Protect administrative operations.
●  Use meaningful error handling.
●  Remove unnecessary test accounts and sample data.

11. Accessibility Requirements

Your website should be usable by a wide range of users.

Apply the following practices:

Include alternative text for meaningful images.

●  Use semantic HTML elements.
●
●  Associate form labels with form ﬁelds.
●  Maintain readable text contrast.
●  Ensure buttons and links have clear names.
●  Support keyboard navigation.
●  Use headings in a logical order.
●  Do not communicate information using color alone.
●  Avoid rapidly ﬂashing content.
●  Provide visible focus states.

Accessibility will be considered as part of the assessment.

12. Testing Requirements

Before submission, test the website carefully.

You should test:

●  Navigation links
●  Responsive layouts
●  Contact form validation
●  API requests
●  Database operations
●  Create, read, update, and delete functions
●
●
●  Loading states
●  Error states
●  External links
●
●  Mobile display

Invalid URLs
Invalid form input

Images

●  Deployed application behavior

Your report should include a small testing table.

Example:

Test Case

Expected Result

Actual Result

Status

Submit  an  empty
contact form

Validation  messages
appear

Validation
appeared

messages

Pass

Load projects

Delete a project

Open on mobile

Projects  are  retrieved
from the API

Three projects displayed

Pass

Selected  project
removed

is

Project
successfully

Layout
mobile screen

adjusts

to

Responsive
displayed

removed

Pass

layout

Pass

13. Git and GitHub Requirements

You must use Git and GitHub throughout the project.

Your  repository  should  demonstrate  regular  development  activity rather than one ﬁnal
upload.

Requirements include:

●  A clear repository name
●  Meaningful commit messages
●  Regular commits
●  Organized folders
●  A .gitignore ﬁle
●  A complete README.md
●  No passwords or secret keys
●

Instructions for running the project locally

Examples of meaningful commit messages:

●  Create responsive navigation component
●  Connect project page to REST API
●  Add MongoDB project model
●
Implement contact form validation
●  Fix mobile layout on project cards

Avoid unclear messages such as:

●  update
●  ﬁnal
●  work
●  change
●  123

14. README Requirements

Your GitHub repository must include a README.md ﬁle containing:

1.  Project title
2.  Project overview
3.  Main features
4.  Technologies used
5.  Application architecture
6.  Installation instructions
7.  Environment variable instructions
8.  Instructions for running the frontend
9.  Instructions for running the backend
10. API endpoint summary
11. Screenshots
12. Live website URL
13. GitHub repository URL
14. Known limitations
15. Future improvements
16. Author information

Do not include actual secret values in the README ﬁle.

15. Required Deliverables

You must submit all of the following.

Deliverable 1: Live Portfolio Website

Submit the public URL of your deployed application.

The link must be tested before submission.

Deliverable 2: GitHub Repository

Submit the link to your GitHub repository.

The repository must contain:

●  Front-end source code
●  Back-end source code
●  README ﬁle
●  Conﬁguration examples
●  Appropriate folder structure
●  Commit history

Deliverable 3: Project Report

Submit a project report in PDF format.

Recommended length: 6–10 pages, excluding appendices.

The report should include:

1.  Cover page
2.  Project introduction
3.  Target audience
4.  Project objectives
5.  Requirements
6.  Site map or application structure
7.  Wireframes or design planning
8.  Technology stack
9.  System architecture
10. Database design
11. RESTful API design
12. Main implementation process
13. Testing results
14. Deployment process
15. Challenges and solutions
16. Screenshots of the completed system
17. Personal reﬂection
18. Future improvements
19. References

Deliverable 4: Presentation and Demonstration

Each student must present and demonstrate the project.

Recommended presentation time: 8–10 minutes, followed by questions.

The presentation should cover:

●  Project purpose
●  Target users
●  Design decisions
●  Main features
●  Technical architecture
●  React component structure
●  RESTful API
●  MongoDB integration
●  AWS deployment
●  Main challenges
●  Lessons learned
●  Live demonstration

Students should prepare screenshots or a short recorded backup demonstration in case
of internet problems.

16. Suggested Project Structure

A possible full-stack folder structure is shown below:

portfolio-project/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example

│   └── package.json
│
├── server/
│   ├── conﬁg/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore

Students may use a different structure if it is clear, organized, and appropriate.

17. Minimum Acceptance Criteria

To  receive  a  passing  grade,  the  project  must  meet  all  of  the  following  minimum
conditions:

●  The portfolio is an original individual project.
●  The front end is developed using React.
●  The site contains the required portfolio sections.
●  At least three projects are presented.
●  Project data is retrieved through a RESTful API.
●  MongoDB is used.
●  At least one complete CRUD feature is implemented.
●  The contact form connects to the backend.
●  The application is responsive.
●  The project is deployed and publicly accessible.
●  The source code is submitted through GitHub.
●  A report is submitted.
●  The student completes the presentation and demonstration.

Having  only  a  static  HTML  and  CSS  portfolio  will  not  meet  the  ﬁnal  assessment
requirements.

18. Optional Advanced Features

Students may include advanced features after completing all core requirements.

Possible advanced features include:

●  Administrator authentication
●  JSON Web Token authentication
●  Dark and light modes
●  Project ﬁltering and searching
●  Project categories
●  Blog section
●  Certiﬁcate gallery
●  Resume download
●  Email notiﬁcation after contact form submission
●
●  Theme customization
●  Animated page transitions
●  Automated testing
●  Continuous deployment
●  Custom domain
●  Visitor analytics
●  Multilingual support
●  Progressive Web App features

Image upload

Advanced features will only receive credit when they work correctly and do not reduce
the quality of the core application.

19. General Grading Standards

Excellent

The  project  is  complete, professional, well designed, technically strong, fully deployed,
and  easy  to  use.  The  student  demonstrates  a  clear  understanding  of  the  code  and
makes thoughtful technical decisions.

Good

The project meets nearly all requirements and works correctly. Minor design, coding, or
documentation  issues  may  be  present,  but  they  do  not  signiﬁcantly  affect  the
application.

Satisfactory

The  main  requirements  are  present,  but  some features are incomplete, inconsistent, or
weakly
implemented.  The  student  demonstrates  a  basic  understanding  of  the
technologies.

Limited

Several  major  requirements  are missing or non-functional. The application may contain
signiﬁcant  technical  problems,  weak  documentation,  or  limited  evidence  of  individual
understanding.

Unsatisfactory

The  project  is  largely  incomplete,  cannot  be  demonstrated,  is  not  deployed,  does  not
use the required technologies, or contains copied work that the student cannot explain.

20. Penalties and Important Conditions

The following may result in mark deductions:

●  Broken or inaccessible deployment link
●  Missing GitHub repository
●  Missing project report
●  Missing presentation
●  Application only working on localhost
●  Exposed database passwords or cloud credentials
●  Very limited Git commit history
●  Missing references for external resources
●  Use of copyrighted content without permission
●  Late submission
●  Failure to explain submitted code
●  Copying another student’s design or source code

A student may be asked to explain or modify any part of the submitted code during the
demonstration. Inability to explain the code may affect the individual grade.

21. Use of Templates, Libraries, and AI Tools

You may use suitable libraries, frameworks, icons, and design resources. However:

●  You must acknowledge external resources.
●  You must understand all the important code included in your project.
●  You must adapt resources to your own project.
●  You must not submit a downloaded portfolio template with only minor changes.
●  You must not copy another person’s complete application.
●  AI-generated code must be reviewed, tested, modiﬁed, and understood.
●  You  remain  responsible  for  the  accuracy,  security,  and  quality  of  the  submitted

work.

During  the  presentation,  you  may  be  asked  to  explain  any  ﬁle,  function,  component,
route, database model, or deployment decision.

22. Submission Instructions

Create a submission document containing:

●  Student name
●  Student ID
●  Class
●  Project title
●  Live website URL
●  GitHub repository URL
●  Demonstration video URL, when required
●  Report ﬁle

Use the following ﬁle naming format:

StudentID_FullName_WebDevelopmentFinal

Example:

SE2025001_SokDara_WebDevelopmentFinal.pdf

Before submitting, conﬁrm that:

●  The live website opens correctly.
●  The API is running.

●  MongoDB is connected.
●  The contact form works.
●  Project information loads correctly.
●  All external links work.
●  The repository is accessible to the lecturer.
●  No passwords or secret keys are visible.
●  The correct report has been uploaded.

23. Final Advice

Begin  with  a  simple,  complete,  and  well-organized  application.  Make  sure  the  core
requirements work before adding advanced features.

A smaller website that is complete, secure, responsive, and professionally implemented
is better than a large website containing many broken or unﬁnished features.

Your  ﬁnal  portfolio  should  represent  both  your  technical  ability  and  your  professional
identity as a future software engineer.

