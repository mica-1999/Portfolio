"use client";
import { useState, useEffect } from 'react';

// Sample project data - replace with your actual data
const projectsData = [
  {
    id: 1,
    title: "Modern Dashboard UI",
    description: "A responsive admin dashboard with dark/light mode, built with React and Tailwind CSS.",
    image: "/assets/images/img-1.jpg",
    tags: ["React", "Tailwind CSS", "Frontend"],
    date: "June 15, 2023",
    github: "https://github.com/yourusername/dashboard-ui",
    demo: "https://dashboard-demo.example.com",
    featured: true
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management.",
    image: "/assets/images/img-2.jpg",
    tags: ["Next.js", "MongoDB", "Full Stack"],
    date: "August 3, 2023",
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.example.com",
    featured: false
  },
  {
    id: 3,
    title: "Real-time Chat App",
    description: "Socket.io powered chat app with real-time messaging and notification features.",
    image: "/assets/images/img-3.jpg",
    tags: ["Socket.IO", "Express", "React"],
    date: "September 22, 2023",
    github: "https://github.com/yourusername/chat-app",
    demo: "https://chat-app-demo.example.com",
    featured: true
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Customizable portfolio template for developers with project showcasing capabilities.",
    image: "/assets/images/img-4.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    date: "October 10, 2023",
    github: "https://github.com/yourusername/portfolio-template",
    demo: "https://portfolio-demo.example.com",
    featured: false
  },
  {
    id: 5,
    title: "Weather Forecast App",
    description: "Real-time weather application that uses geolocation and third-party weather APIs.",
    image: "/assets/images/img-5.jpg",
    tags: ["React", "API", "Geolocation"],
    date: "November 7, 2023",
    github: "https://github.com/yourusername/weather-app",
    demo: "https://weather-app-demo.example.com",
    featured: false
  },
  {
    id: 6,
    title: "Task Management System",
    description: "Kanban-style task management application with drag-and-drop functionality.",
    image: "/assets/images/img-6.jpg",
    tags: ["React", "Redux", "Firebase"],
    date: "December 15, 2023",
    github: "https://github.com/yourusername/task-management",
    demo: "https://task-app-demo.example.com",
    featured: true
  },
  {
    id: 7,
    title: "Mobile Fitness App",
    description: "React Native app for tracking workouts, nutrition, and fitness goals.",
    image: "/assets/images/img-7.jpg",
    tags: ["React Native", "Mobile", "Health"],
    date: "January 24, 2024",
    github: "https://github.com/yourusername/fitness-app",
    demo: "https://fitness-app.example.com",
    featured: false
  },
  {
    id: 8,
    title: "Content Management",
    description: "Custom CMS built with Node.js for managing blog posts and media content.",
    image: "/assets/images/img-8.jpg",
    tags: ["Node.js", "Express", "MongoDB"],
    date: "February 9, 2024",
    github: "https://github.com/yourusername/cms",
    demo: "https://cms-demo.example.com",
    featured: false
  }
];

export default function BlogItems() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // All unique tags for filtering
  const allTags = [...new Set(projectsData.flatMap(project => project.tags))];

  // Filter projects based on selected filter and search query
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = [...projectsData];
      
      // Apply tag filter
      if (filter !== 'all') {
        filtered = filtered.filter(project => 
          project.tags.includes(filter)
        );
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(project => 
          project.title.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      setFilteredProjects(filtered);
      setLoading(false);
    }, 400); // Small timeout to show loading state
  }, [filter, searchQuery]);

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Check out some of my recent work</p>
      </div>
      
      <div className="blog-filters">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <i className="ri-search-line search-icon"></i>
        </div>
        
        <div className="filter-tags">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          
          {allTags.map(tag => (
            <button 
              key={tag} 
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-results">
          <i className="ri-search-line no-results-icon"></i>
          <p>No projects found matching your criteria</p>
          <button className="reset-btn" onClick={() => { setFilter('all'); setSearchQuery(''); }}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="projects-grid mt-5 pt-3">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              {project.featured && <span className="featured-badge">Featured</span>}
              
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="ri-external-link-line"></i> Live Demo
                  </a>
                  <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="ri-github-fill"></i> Source Code
                  </a>
                </div>
              </div>
              
              <div className="project-details">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="project-footer">
                  <span className="project-date">
                    <i className="ri-calendar-line"></i> {project.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}