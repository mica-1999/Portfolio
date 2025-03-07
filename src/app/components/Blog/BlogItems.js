"use client";
import { useState, useEffect } from 'react';
import { projectsData } from '../../data/projectsData';

export default function BlogItems() {
  const [filter, setFilter] = useState(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // All unique tags for filtering
  const allTags = [...new Set(projectsData.flatMap(project => project.tags))];

  // Filter projects based on selected filter and search query
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = [...projectsData]; // Copy of all projects
      
      // Apply tag filter
      if (filter[0] !== 'all') {
        filtered = filtered.filter(project => 
          filter.some(tag => project.tags.includes(tag))
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
  
  // Handle tag filter changes
  const handleFilterChange = (tag) => {
    if (tag === 'all') {
      // If "all" is clicked, we only want "all" in the filter
      setFilter(['all']);
      return;
    }
    
    // Create a new filter array without 'all'
    const newFilter = filter.filter(t => t !== 'all');
    
    if (filter.includes(tag)) {
      // Remove the tag
      const updatedFilter = newFilter.filter(t => t !== tag);
      // If no tags left, set back to 'all'
      setFilter(updatedFilter.length ? updatedFilter : ['all']);
    } else {
      // Add the tag
      setFilter([...newFilter, tag]);

      // If every tag is selected, set back to 'all'
      if (newFilter.length === allTags.length - 1) {
        setFilter(['all']);
      }
    }
  }

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
            className={`filter-btn ${filter.includes('all') ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          
          {allTags.map(tag => (
            <button 
              key={tag} 
              className={`filter-btn ${filter.includes(tag) ? 'active' : ''}`}
              onClick={() => handleFilterChange(tag)}
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