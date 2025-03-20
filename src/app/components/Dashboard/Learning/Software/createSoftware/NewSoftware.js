"use client";
import { useEffect, useRef, useState } from "react";
import { Modal } from '../../../../utility/Modal';
import { MAIN_CATEGORIES, SUBCATEGORIES, STATUS_OPTIONS, TAGS } from '../Constants';

export default function NewSoftware() {
    const textareasRef = useRef([]);

    const autoResizeTextareas = () => {
        textareasRef.current.forEach((textarea) => {
            textarea.style.height = 'auto';  // Reset height before resizing
            textarea.style.height = `${textarea.scrollHeight}px`;  // Set height based on content
        });
    };

    // Base form data structure for a new learning topic
    const [formData, setFormData] = useState({
        titleCard: "",
        subtitleCard: "",
        category: "",
        subcategory: "",
        tags: "",
        description: "",
        state: "",
        videos: [],
        concepts: [],
        codeSnippets: [],
        userNotes: "",
    });
    const [formtagBtn, setformTagBtn] = useState(false);
    const [isformDropdownOpen, setIsformDropdownOpen] = useState(false);

    // Active content types
    const [activeContentTypes, setActiveContentTypes] = useState({
        concepts: false,
        codeSnippets: false,
        videos: false 
    });

    // New item templates
    const emptyCodeSnippet = { language: "", code: "", explanation: "" };
    const emptyConcept = { title: "", explanation: "" };
    const emptyVideo = { title: "", url: "", description: "" };

    // Form validation
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});

    // Modal & Dark Body for success/error messages
    const [showModal, setShowModal] = useState({
        show: false,
        type: '',
        message: ''
    });
    const [hideBody, setHideBody] = useState(false); // Dark Body toggle
    
    // Handle basic input changes
    const handleInputChange = (field) => (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleTagChange = (tag) => {
    const updatedTags = formData.tags.includes(tag)
        ? formData.tags.filter((t) => t !== tag)
        : [...formData.tags, tag];
    setFormData({ ...formData, tags: updatedTags });
    
    // Validate after changing tags
    verifyInput(updatedTags.join(','), 'tags');
};

    // Handle array item changes (concepts and code snippets)
    const handleItemChange = (collection, index, field, value) => {
        const updatedCollection = [...formData[collection]];
        updatedCollection[index] = {
            ...updatedCollection[index],
            [field]: value
        };
        
        setFormData({
            ...formData,
            [collection]: updatedCollection
        });
    };

    // Add new items
    const addItem = (collection) => {
        let newItem;
        if (collection === 'concepts') {
            newItem = emptyConcept;
        } else if (collection === 'videos') {
            newItem = emptyVideo;
        } else {
            newItem = emptyCodeSnippet;
        }
        
        setFormData({
            ...formData,
            [collection]: [...formData[collection], newItem]
        });
    };

    // Remove items
    const removeItem = (collection, index) => {
        const updatedCollection = [...formData[collection]];
        updatedCollection.splice(index, 1);
        
        setFormData({
            ...formData,
            [collection]: updatedCollection
        });
    };

    // Toggle content types
    const toggleContentType = (type) => {
        // Update which content types are active
        const updatedContentTypes = {
            ...activeContentTypes,
            [type]: !activeContentTypes[type]
        };
        
        setActiveContentTypes(updatedContentTypes);
        
        // If enabling a content type that has no items, add an empty one
        if (!activeContentTypes[type] && formData[type].length === 0) {
            addItem(type);
        }
    };

    const resetForm = ()  => {
        setFormData({
            titleCard: "",
            subtitleCard: "",
            category: "",
            subcategory: "",
            tags: "",
            description: "",
            state: "",
            concepts: [],
            codeSnippets: [],
            videos: [],
            userNotes: "",
        });
        setActiveContentTypes({
            concepts: false,
            codeSnippets: false,
            videos: false
        });
        setErrors({});
        setSuccess({});
    }

    // Input validation
    const verifyInput = (value, name, parentCollection = null, index = null) => {
        if (typeof value === 'string') {
            value = value.trim();
        }
        
        let errorMessage = '';
        let fieldId = parentCollection ? `${parentCollection}.${index}.${name}` : name;

        // Validation logic based on field name
        switch (name) {
            case 'titleCard':
                if (value.length < 2) {
                    errorMessage = 'Title must have at least 2 characters.';
                }
                break;
            case 'subtitleCard':
                if (value.length < 2) {
                    errorMessage = 'Subtitle must have at least 2 characters.';
                }
                break;
            case 'category':
                if (!value) {
                    errorMessage = 'Please select a category.';
                }
                break;
            case 'subcategory':
                if (!value) {
                    errorMessage = 'Please select a subcategory.';
                }
                break;
            case 'description':
                if (value.length < 10) {
                    errorMessage = 'Description must be at least 10 characters.';
                }
                break;
            case 'tags':
                if (!value || (Array.isArray(value) && value.length === 0)) {
                    errorMessage = 'Tags cannot be empty.';
                } else if (Array.isArray(value) && value.length < 1) {
                    errorMessage = 'Please provide at least one tag.';
                } else if (typeof value === 'string' && (!value || value.split(',').length < 1)) {
                    errorMessage = 'Please provide at least one tag.';
                }
                break;
            case 'state':
                if (!value) {
                    errorMessage = 'Please select a state.';
                }
                break;
            case 'title':
                if (value.length < 2) {
                    errorMessage = 'Title must be at least 2 characters.';
                }
                break;
            case 'language':
                if (value.length < 2) {
                    errorMessage = 'Language must be specified.';
                }
                break;
            case 'code':
                if (value.length < 5) {
                    errorMessage = 'Code must be at least 5 characters.';
                }
                break;
            case 'explanation':
                if (value.length < 10) {
                    errorMessage = 'Explanation must be at least 10 characters.';
                }
                break;
            case 'url':
                if (!value) {
                    errorMessage = 'URL cannot be empty.';
                } else if (!value.includes('youtube.com') && !value.includes('youtu.be')) {
                    errorMessage = 'Please enter a valid YouTube URL.';
                }
                break;
            case 'userNotes':
                if (value.length > 500) {
                    errorMessage = 'User notes should not exceed 500 characters.';
                }
                break;
            default:
                break;
        }

        // Update the errors and success states
        setErrors((prevErrors) => ({ ...prevErrors, [fieldId]: errorMessage }));
        setSuccess((prevSuccess) => ({ ...prevSuccess, [fieldId]: !errorMessage }));
        
        return !errorMessage; // Return validation status
    };

    // Form submission handler
    const handleSubmit =  async (e) => {
        e.preventDefault();
        
        // Validate all fields before submission
        let isValid = true;
        
        // Validate base fields
        const baseFields = ['titleCard', 'subtitleCard', 'category', 'subcategory', 'description', 'tags', 'state'];
        baseFields.forEach(field => {
            if (!verifyInput(formData[field], field)) {
                isValid = false;
            }
        });
        
        // Validate concepts if active
        if (activeContentTypes.concepts) {
            formData.concepts.forEach((concept, index) => {
                if (!verifyInput(concept.title, 'title', 'concepts', index)) isValid = false;
                if (!verifyInput(concept.explanation, 'explanation', 'concepts', index)) isValid = false;
            });
        }
        
        // Validate code snippets if active
        if (activeContentTypes.codeSnippets) {
            formData.codeSnippets.forEach((snippet, index) => {
                if (!verifyInput(snippet.language, 'language', 'codeSnippets', index)) isValid = false;
                if (!verifyInput(snippet.code, 'code', 'codeSnippets', index)) isValid = false;
                if (!verifyInput(snippet.explanation, 'explanation', 'codeSnippets', index)) isValid = false;
            });
        }

        // Validate videos if active
        if (activeContentTypes.videos) {
            formData.videos.forEach((video, index) => {
                if (!verifyInput(video.title, 'title', 'videos', index)) isValid = false;
                if (!verifyInput(video.url, 'url', 'videos', index)) isValid = false;
                if (!verifyInput(video.description, 'description', 'videos', index)) isValid = false;
            });
        }
        
        if (isValid) {      
            try {   
                // Process tags if they're a comma-separated string
                let processedData = { ...formData };
                if (typeof processedData.tags === 'string') {
                    processedData.tags = processedData.tags.split(',').map(tag => tag.trim());
                }
                
                // Only include active content types
                if (!activeContentTypes.concepts) {
                    processedData.concepts = [];
                }
                
                if (!activeContentTypes.codeSnippets) {
                    processedData.codeSnippets = [];
                }

                if (!activeContentTypes.videos) {
                    processedData.videos = [];
                }
                
                console.log("Submitting form data:", processedData);
                
                // Send data to the backend API
                const response = await fetch('/api/Topic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(processedData)
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to create learning topic');
                }
                
                console.log("Learning topic created successfully:", data);
                
                setShowModal({
                    show: true,
                    type: 'success',
                    message: 'Learning topic created successfully!'
                });
                setHideBody(true);
                
                // Reset the form after successful submission
                resetForm();
            } catch (error) {
                console.error("Error submitting form:", error);
                
                // Show error modal
                setShowModal({
                    show: true,
                    type: 'error',
                    message: `Error: ${error.message}`
                });
                setHideBody(true);
            }
        } else {
            console.log("Form has validation errors");
            // Scroll to the first error
            const firstErrorElement = document.querySelector('.errorBorderColor');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // Debug: Log form data changes
    useEffect(() => {
        if (formData) {
            console.log("Current form data:", formData);
        }
    }, [formData]);

    // On Modal Close - Dark Body toggle becomes false
    useEffect(() => {
        if(showModal.show === false){
        setHideBody(false);
        }
      },[showModal.show === false])

    // Textarea auto-resize effect
    useEffect(() => {
        const autoResizeTextarea = (textarea) => {
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };

        // Function to handle all textareas in the document
        const setupTextareas = () => {
            // Get all textareas in the form
            const allTextareas = document.querySelectorAll('textarea');
            
            // Remove existing listeners (to avoid duplicates)
            allTextareas.forEach(textarea => {
                textarea.removeEventListener('input', () => autoResizeTextarea(textarea));
            });
            
            // Add new listeners and initialize heights
            allTextareas.forEach(textarea => {
                autoResizeTextarea(textarea); // Set initial height
                textarea.addEventListener('input', () => autoResizeTextarea(textarea));
            });
        };

        // Initial setup
        setupTextareas();

        // Setup on form data changes (when new textareas might be added)
        return () => {
            const allTextareas = document.querySelectorAll('textarea');
            allTextareas.forEach(textarea => {
                textarea.removeEventListener('input', () => autoResizeTextarea(textarea));
            });
        };
    }, [formData]);

    return (
        <div className="row mt-4">
            {/* Form Card */}
            <div className="col-lg-12">
                <div className="card p-0">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="card-title ps-4 pt-4">New Topic</h5>
                        <i className="ri-refresh-line fs-4 pe-4 pt-3" onClick={() => resetForm()}></i>
                    </div>
    
                    <div className="card-body">
                        <form className="p-2" onSubmit={handleSubmit}>
                            {/* Basic Information Section */}
                            <section>
                                <h6 className="mb-2">1. Basic Information</h6>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id="titleCard"
                                                name="titleCard"
                                                placeholder="JavaScript Basics"
                                                value={formData.titleCard}
                                                className={`form-control sInput ${errors.titleCard ? 'errorBorderColor' : success.titleCard ? 'successBorderColor' : ''}`}
                                                onChange={handleInputChange('titleCard')}
                                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                                                required
                                            />
                                            <label htmlFor="titleCard">Title</label>
                                            <div className="errorDiv">{errors.titleCard}</div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id="subtitleCard"
                                                name="subtitleCard"
                                                placeholder="Learn the fundamentals of JavaScript programming."
                                                value={formData.subtitleCard}
                                                className={`form-control sInput ${errors.subtitleCard ? 'errorBorderColor' : success.subtitleCard ? 'successBorderColor' : ''}`}
                                                onChange={handleInputChange('subtitleCard')}
                                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                                                required
                                            />
                                            <label htmlFor="subtitleCard">Subtitle</label>
                                            <div className="errorDiv">{errors.subtitleCard}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <select
                                                className={`form-select ${success.category ? 'successBorderColor' : ''}`}
                                                value={formData.category}
                                                id="category"
                                                name="category"
                                                required
                                                onChange={handleInputChange('category')}
                                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                                            >
                                                <option value="">Select Category</option>
                                                {MAIN_CATEGORIES.map((category, index) => (
                                                    <option key={index} value={category}>{category}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="category">Category</label>
                                            <div className="errorDiv">{errors.category}</div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <select
                                                className={`form-select ${success.subcategory ? 'successBorderColor' : ''}`}
                                                value={formData.subcategory}
                                                id="subcategory"
                                                name="subcategory"
                                                required
                                                onChange={handleInputChange('subcategory')}
                                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                                            >
                                                <option value="">Select Subcategory</option>
                                                {SUBCATEGORIES[formData.category]?.map((subcat,index) => (
                                                    <option key={index} value={subcat}>{subcat}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="subcategory">Subcategory</label>
                                            <div className="errorDiv">{errors.subcategory}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <textarea
                                                ref={(el) => textareasRef.current[0] = el}
                                                id="description"
                                                name="description"
                                                placeholder="Brief explanation of the topic"
                                                value={formData.description}
                                                className={`form-control sInput description ${errors.description ? 'errorBorderColor' : success.description ? 'successBorderColor' : ''}`}
                                                required
                                                onChange={handleInputChange('description')}
                                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                                                style={{ height: "120px" }}
                                            />
                                            <div className="errorDiv mt-4">{errors.description}</div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="col-lg-6 d-flex flex-column">
                                        <div className="select-wrapper">
                                            <button className={`btn dropdown-toggle w-100 tagButton ${formtagBtn ? 'setBorder' : ''} ${formData.tags.length > 0 ? 'selected-tags' : ''}`}
                                                type="button" id="dropdownForm"
                                                onClick={() => { setformTagBtn(!formtagBtn); setIsformDropdownOpen(!isformDropdownOpen); }}>
                                                {formData.tags.length === 0 ? 'Select tags' : formData.tags.join(';')}
                                            </button>
                            
                                            <ul className={`dropdown-menu w-100 ulTag ${isformDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownForm">
                                                {TAGS.map((tag) => (
                                                <li key={tag} onClick={() => handleTagChange(tag)} className="custom-tag-li p-2">
                                                    <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id={tag + 'form'}
                                                        checked={formData.tags.includes(tag)} onChange={() => handleTagChange(tag)} />
                                                    <label className="form-check-label"  onClick={(e) => e.preventDefault()} htmlFor={tag + 'form'}>
                                                        {tag}
                                                    </label>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="form-group mt-4">
                                            <select
                                                className={`form-select ${success.state ? 'successBorderColor' : ''}`}
                                                value={formData.state}
                                                id="state"
                                                name="state"
                                                required
                                                onChange={handleInputChange('state')}
                                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                                            >
                                                <option value="">Select Status</option>
                                                {STATUS_OPTIONS.map((status, index ) => (
                                                    <option key={index} value={status}>{status}</option>
                                                ))}
                                            </select>
                                            <label htmlFor="state">State</label>
                                            <div className="errorDiv">{errors.state}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr />
                            
                            {/* Content Type Selection */}
                            <section className="mb-3">
                                <h6 className="mt-4 pt-2">2. Content Types</h6>
                                <div className="row mb-3">
                                    <div className="col-lg-12">
                                        <div className="d-flex gap-3">
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id="conceptsToggle" 
                                                    checked={activeContentTypes.concepts}
                                                    onChange={() => toggleContentType('concepts')}
                                                />
                                                <label className="form-check-label" htmlFor="conceptsToggle">
                                                    Include Concepts
                                                </label>
                                            </div>
                                            
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id="codeSnippetsToggle" 
                                                    checked={activeContentTypes.codeSnippets}
                                                    onChange={() => toggleContentType('codeSnippets')}
                                                />
                                                <label className="form-check-label" htmlFor="codeSnippetsToggle">
                                                    Include Code Snippets
                                                </label>
                                            </div>

                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    id="videosToggle" 
                                                    checked={activeContentTypes.videos}
                                                    onChange={() => toggleContentType('videos')}
                                                />
                                                <label className="form-check-label" htmlFor="videosToggle">
                                                    Include Videos
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Concepts Section */}
                                {activeContentTypes.concepts && (
                                    <div className="concepts-container mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="mb-0">Concepts</h6>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => addItem('concepts')}
                                            >
                                                + Add Concept
                                            </button>
                                        </div>
                                        
                                        {formData.concepts.length === 0 ? (
                                            <div className="alert alert-info">No concepts added yet. Click "Add Concept" to begin.</div>
                                        ) : (
                                            formData.concepts.map((concept, index) => (
                                                <div key={`concept-${index}`} className="concept-item mb-3 p-3 border rounded">
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <h6 className="mb-0">Concept #{index + 1}</h6>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => removeItem('concepts', index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="text"
                                                            id={`concept-${index}-title`}
                                                            placeholder="Concept Title"
                                                            value={concept.title}
                                                            className={`form-control sInput ${errors[`concepts.${index}.title`] ? 'errorBorderColor' : success[`concepts.${index}.title`] ? 'successBorderColor' : ''}`}
                                                            required
                                                            onChange={(e) => handleItemChange('concepts', index, 'title', e.target.value)}
                                                            onBlur={(e) => verifyInput(e.target.value, 'title', 'concepts', index)}
                                                        />
                                                        <label htmlFor={`concept-${index}-title`} className="conceptTitle">Title</label>
                                                        <div className="errorDiv">{errors[`concepts.${index}.title`]}</div>
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <textarea
                                                            ref={(el) => textareasRef.current[1] = el}
                                                            id={`concept-${index}-explanation`}
                                                            placeholder="Explain this concept"
                                                            value={concept.explanation}
                                                            className={`form-control sInput explanation ${errors[`concepts.${index}.explanation`] ? 'errorBorderColor' : success[`concepts.${index}.explanation`] ? 'successBorderColor' : ''}`}
                                                            required
                                                            onChange={(e) => handleItemChange('concepts', index, 'explanation', e.target.value)}
                                                            onBlur={(e) => verifyInput(e.target.value, 'explanation', 'concepts', index)}
                                                            style={{ height: "120px" }}
                                                        />
                                                        <div className="errorDiv mt-4">{errors[`concepts.${index}.explanation`]}</div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* Code Snippets Section */}
                                {activeContentTypes.codeSnippets && (
                                    <div className="code-snippets-container mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="mb-0">Code Snippets</h6>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => addItem('codeSnippets')}
                                            >
                                                + Add Code Snippet
                                            </button>
                                        </div>
                                        
                                        {formData.codeSnippets.length === 0 ? (
                                            <div className="alert alert-info">No code snippets added yet. Click "Add Code Snippet" to begin.</div>
                                        ) : (
                                            formData.codeSnippets.map((snippet, index) => (
                                                <div key={`snippet-${index}`} className="snippet-item mb-3 p-3 border rounded">
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <h6 className="mb-0">Code Snippet #{index + 1}</h6>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => removeItem('codeSnippets', index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="text"
                                                            id={`snippet-${index}-language`}
                                                            placeholder="JavaScript"
                                                            value={snippet.language}
                                                            className={`form-control sInput ${errors[`codeSnippets.${index}.language`] ? 'errorBorderColor' : success[`codeSnippets.${index}.language`] ? 'successBorderColor' : ''}`}
                                                            required
                                                            onChange={(e) => handleItemChange('codeSnippets', index, 'language', e.target.value)}
                                                            onBlur={(e) => verifyInput(e.target.value, 'language', 'codeSnippets', index)}
                                                        />
                                                        <label htmlFor={`snippet-${index}-language`} className="codeLanguage">Language</label>
                                                        <div className="errorDiv">{errors[`codeSnippets.${index}.language`]}</div>
                                                    </div>
                                                    
                                                    <div className="row">
                                                        <div className="col-lg-6 mb-2">
                                                            <div className="form-group">
                                                                <textarea
                                                                    ref={(el) => textareasRef.current[2] = el}
                                                                    id={`snippet-${index}-code`}
                                                                    placeholder="// Code goes here"
                                                                    value={snippet.code}
                                                                    className={`form-control sInput code ${errors[`codeSnippets.${index}.code`] ? 'errorBorderColor' : success[`codeSnippets.${index}.code`] ? 'successBorderColor' : ''}`}
                                                                    required
                                                                    onChange={(e) => handleItemChange('codeSnippets', index, 'code', e.target.value)}
                                                                    onBlur={(e) => verifyInput(e.target.value, 'code', 'codeSnippets', index)}
                                                                    style={{ height: "180px" }}
                                                                />
                                                                <div className="errorDiv mt-4">{errors[`codeSnippets.${index}.code`]}</div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <textarea
                                                                    ref={(el) => textareasRef.current[3] = el}
                                                                    id={`snippet-${index}-explanation`}
                                                                    placeholder="Explain your code"
                                                                    value={snippet.explanation}
                                                                    className={`form-control sInput explanation ${errors[`codeSnippets.${index}.explanation`] ? 'errorBorderColor' : success[`codeSnippets.${index}.explanation`] ? 'successBorderColor' : ''}`}
                                                                    required
                                                                    onChange={(e) => handleItemChange('codeSnippets', index, 'explanation', e.target.value)}
                                                                    onBlur={(e) => verifyInput(e.target.value, 'explanation', 'codeSnippets', index)}
                                                                    style={{ height: "180px" }}
                                                                />
                                                                <div className="errorDiv mt-4">{errors[`codeSnippets.${index}.explanation`]}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {activeContentTypes.videos && (
                                    <div className="videos-container mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="mb-0">Videos</h6>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => addItem('videos')}
                                            >
                                                + Add Video
                                            </button>
                                        </div>
                                        
                                        {formData.videos.length === 0 ? (
                                            <div className="alert alert-info">No videos added yet. Click "Add Video" to begin.</div>
                                        ) : (
                                            formData.videos.map((video, index) => (
                                                <div key={`video-${index}`} className="video-item mb-3 p-3 border rounded">
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <h6 className="mb-0">Video #{index + 1}</h6>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => removeItem('videos', index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="text"
                                                            id={`video-${index}-title`}
                                                            value={video.title}
                                                            className={`form-control sInput videoTitle ${errors[`videos.${index}.title`] ? 'errorBorderColor' : success[`videos.${index}.title`] ? 'successBorderColor' : ''}`}
                                                            required
                                                            onChange={(e) => handleItemChange('videos', index, 'title', e.target.value)}
                                                            onBlur={(e) => verifyInput(e.target.value, 'title', 'videos', index)}
                                                        />
                                                        <label htmlFor={`video-${index}-title`} className="videoTitle">Title</label>
                                                        <div className="errorDiv">{errors[`videos.${index}.title`]}</div>
                                                    </div>
                                                    
                                                    <div className="form-group mb-2">
                                                        <input
                                                            type="text"
                                                            id={`video-${index}-url`}
                                                            value={video.url}
                                                            className={`form-control sInput videoUrl ${errors[`videos.${index}.url`] ? 'errorBorderColor' : success[`videos.${index}.url`] ? 'successBorderColor' : ''}`}
                                                            required
                                                            onChange={(e) => handleItemChange('videos', index, 'url', e.target.value)}
                                                            onBlur={(e) => verifyInput(e.target.value, 'url', 'videos', index)}
                                                        />
                                                        <label htmlFor={`video-${index}-url`} className="videoUrl">URL</label>
                                                        <div className="errorDiv">{errors[`videos.${index}.url`]}</div>
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <textarea
                                                            ref={(el) => textareasRef.current[4] = el}
                                                            id={`video-${index}-description`}
                                                            placeholder="Video description"
                                                            value={video.description}
                                                            className={`form-control sInput description ${errors[`videos.${index}.description`] ? 'errorBorderColor' : success[`videos.${index}.description`] ? 'successBorderColor' : ''}`}
                                                            required
                                                            onChange={(e) => handleItemChange('videos', index, 'description', e.target.value)}
                                                            onBlur={(e) => verifyInput(e.target.value, 'description', 'videos', index)}
                                                            style={{ height: "100px" }}
                                                        />
                                                        <div className="errorDiv mt-4">{errors[`videos.${index}.description`]}</div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* User Notes Section - Always show */}
                                <h6 className="mb-2">3. User Notes</h6>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <textarea
                                                ref={(el) => textareasRef.current[5] = el}
                                                id="userNotes"
                                                name="userNotes"
                                                placeholder="Your personal notes"
                                                value={formData.userNotes}
                                                className={`form-control sInput userNotes ${errors.userNotes ? 'errorBorderColor' : success.userNotes ? 'successBorderColor' : ''}`}
                                                onChange={handleInputChange('userNotes')}
                                                onBlur={(e) => verifyInput(e.target.value, e.target.name)}
                                                style={{ height: "100px" }}
                                            />
                                            <div className="errorDiv mt-4">{errors.userNotes}</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
    
                            {/* Form Actions */}
                            <section className="row mt-3 ">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <button type="submit" className="btn addItem me-3">Submit</button>
                                    <button type="button" className="btn cancelItem" onClick={() => window.location.href = '../software'}>Cancel</button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            </div>
            {/* Add Modal component */}
            <Modal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                handleDelete=''
                deleteAction="cancel" 
            />
            {hideBody  && <div className="modal-backdrop show m-0"></div>}
        </div>
    );
}
