"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Skills data
  const skills = {
    frontend: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3/SCSS', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express', 'MongoDB', 'SQL', 'Firebase', 'REST APIs', 'GraphQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Adobe XD', 'Webpack', 'Jest', 'Docker']
  };
  
  // Experience data
  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      period: "2021 - Present",
      description: "Developed custom websites and web applications for clients. Focused on responsive design, modern JavaScript frameworks, and performance optimization. Self-taught advanced concepts in React and Next.js through practical application."
    },
    {
      title: "Junior Developer",
      company: "Local Tech Company",
      period: "2020 - 2021",
      description: "Assisted in building and maintaining web applications. Collaborated with senior developers on feature implementation and bug fixes. Gained hands-on experience with version control, code reviews, and development workflows."
    },
    {
      title: "Web Development Intern",
      company: "Tech Startup",
      period: "2019 - 2020",
      description: "Worked on front-end development tasks while learning industry standards. Converted design mockups to functional components and assisted in implementing responsive designs."
    }
  ];
  
  // Education data
  const education = [
    {
      degree: "Bachelor's in Software Engineering",
      institution: "University of Madeira",
      period: "2021 - Present",
      description: "Currently pursuing my degree in Software Engineering. Focused on expanding my knowledge in computer science fundamentals, advanced algorithms, and software architecture."
    },
    {
      degree: "Technical Diploma in Programming",
      institution: "Professional High School",
      period: "2017 - 2020",
      description: "Specialized in programming fundamentals and web development. Developed a strong foundation in HTML, CSS, JavaScript, and basic backend technologies."
    },
    {
      degree: "Self-Directed Learning",
      institution: "Online Platforms & Personal Projects",
      period: "2018 - Present",
      description: "Continuously learning through online courses, documentation, and personal projects. Topics include modern JavaScript frameworks, state management, UI/UX design principles, and deployment strategies."
    }
  ];

  return (
    <div className="blog-container about-container">
      <div className="blog-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know more about me and my experience</p>
      </div>
      
      <div className="about-content">
        <div className="about-intro">
          <div className="about-image">
            <img 
              src="/assets/images/blog/Micael.jpeg" 
              alt="Micael Ribeiro" 
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/350x350?text=Micael+Ribeiro';
              }}
            />
          </div>
          
          <div className="about-bio">
            <h3>Micael Ribeiro</h3>
            <p className="job-title">Full Stack Developer</p>
            
            <p className="bio-text">
              Hello! I'm a passionate web developer from Madeira, Portugal, with a blend of formal education and 
              self-taught expertise in creating responsive and dynamic web applications. My journey combines 
              structured learning with practical, hands-on experience in building real-world projects.
            </p>
            
            <p className="bio-text">
              While pursuing my Software Engineering degree, I continuously expand my skills through personal 
              projects and freelance work. I specialize in React and Next.js for frontend development, with growing 
              expertise in backend technologies. I'm particularly passionate about creating intuitive user experiences 
              and writing clean, maintainable code.
            </p>
            
            <div className="personal-info">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">micael1999work@gmail.com</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">Madeira, Portugal</span>
              </div>
              <div className="info-item">
                <span className="info-label">Availability:</span>
                <span className="info-value">Freelance & Part-time</span>
              </div>
            </div>
            
            <div className="about-cta">
              <a href="/path-to-cv.pdf" className="download-cv">
                <i className="ri-download-line"></i> Download CV
              </a>
              <a href="/pages/contact" className="contact-btn">
                <i className="ri-mail-line"></i> Contact Me
              </a>
            </div>
          </div>
        </div>
        
        <div className="about-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button 
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
          </div>
          
          <div className="tabs-content">
            {activeTab === 'overview' && (
              <div className="tab-panel skills-panel">
                <h4>My Skills</h4>
                
                <div className="skills-section">
                  <h5>Frontend Development</h5>
                  <div className="skill-tags">
                    {skills.frontend.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="skills-section">
                  <h5>Backend Development</h5>
                  <div className="skill-tags">
                    {skills.backend.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="skills-section">
                  <h5>Tools & Technologies</h5>
                  <div className="skill-tags">
                    {skills.tools.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'experience' && (
              <div className="tab-panel experience-panel">
                <h4>Work Experience</h4>
                
                <div className="timeline">
                  {experiences.map((exp, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h5>{exp.title}</h5>
                        <div className="timeline-info">
                          <span className="company">{exp.company}</span>
                          <span className="period">{exp.period}</span>
                        </div>
                        <p>{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className="tab-panel education-panel">
                <h4>Education</h4>
                
                <div className="timeline">
                  {education.map((edu, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h5>{edu.degree}</h5>
                        <div className="timeline-info">
                          <span className="institution">{edu.institution}</span>
                          <span className="period">{edu.period}</span>
                        </div>
                        <p>{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
