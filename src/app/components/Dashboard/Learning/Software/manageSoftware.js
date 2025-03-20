"use client";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { CodeModal } from './modalCode';
import { MAIN_CATEGORIES, SUBCATEGORIES, STATUS_OPTIONS, TAGS } from './Constants';
import { Modal } from '/src/app/components/utility/Modal';

export default function ManageSoftware() {  
  const { data: session } = useSession(); 
  const observerRef = useRef(null); // Reference for intersection observer
  const loaderRef = useRef(null); // Reference for loading element

  // STATE VARIABLES
  const [userTopics, setUserTopics] = useState([]); // User's topics from DB 
  const [formtagBtn, setformTagBtn] = useState(false);
  const [isformDropdownOpen, setIsformDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({ mainCategory: '', subCategory: [], tags: [], status: '', searchBox: '' });
  const [deleteTopic, setdeleteTopic] = useState(null); // Stores topic ID to delete

  // MODAL INFO
  const [modalOpen, setModalOpen] = useState(false);
  const [topicClicked, setTopicClicked] = useState({});
  const [hideBody, setHideBody] = useState(false); // Dark Body toggle
  const [showModal, setShowModal] = useState({ type: '', show: false, message: ''}); // Modal state

  // Loading and Fetch info
  const [loading, setLoading] = useState(true); // Start with loading=true
  const [fetchError, setFetchError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(9); // Number of items to load at once

  // Memoize filtered topics
  const filteredTopics = useMemo(() => {
    return userTopics.filter((topic) => {
      // If there's no filter for category, all topics are included
      if (filters.mainCategory && topic.category.toLowerCase() !== filters.mainCategory.toLowerCase()) {
        return false;
      }
    
      // If there's no filter for subcategory, all topics are included
      if (filters.subCategory.length > 0 && !filters.subCategory.some(sub => topic.subcategory.toLowerCase() === sub.toLowerCase())) {
        return false;
      }
    
      // If there are tags to filter by, make sure all tags are included in the topic's tags
      if (filters.tags.length > 0 && !filters.tags.every((tag) => topic.tags.includes(tag))) {
        return false;
      }
    
      // If there's a status filter, make sure the topic's state matches
      if (filters.status && topic.state.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }

      // Searchbox term search 
      if (filters.searchBox && (
        !topic.titleCard.toLowerCase().includes(filters.searchBox.toLowerCase()) &&
        !topic.description.toLowerCase().includes(filters.searchBox.toLowerCase()) &&
        !topic.category.toLowerCase().includes(filters.searchBox.toLowerCase()) &&
        !topic.subcategory.toLowerCase().includes(filters.searchBox.toLowerCase()) &&
        !topic.tags.some(tag => tag.toLowerCase().includes(filters.searchBox.toLowerCase())) &&  // Check each tag
        !topic.state.toLowerCase().includes(filters.searchBox.toLowerCase())
      )) {
        return false;  // If none of the fields match the search term, exclude this topic
      }
      // If no filter conditions are violated, return true to keep the topic
      return true;
    });
  }, [userTopics, filters.mainCategory, filters.subCategory, filters.tags, filters.status, filters.searchBox]);

  // Get paginated results for infinite scrolling
  const displayedTopics = useMemo(() => {
    return filteredTopics.slice(0, page * itemsPerPage);
  }, [filteredTopics, page, itemsPerPage]);

  // HANDLE MAIN CATEGORY CHANGE
  const handleCategoryChange = useCallback((event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      mainCategory: event.target.value,
    }));
    // Reset page when filters change
    setPage(1);
  }, []);

  // HANDLE SUBCATEGORY CHANGE
  const handlesubCategoryChange = useCallback((subCategory) => {
    setFilters((prevFilters) => {
      const newSubCategories = prevFilters.subCategory.includes(subCategory)
          ? prevFilters.subCategory.filter((subcat) => subcat !== subCategory)
          : [...prevFilters.subCategory, subCategory];

      return {
          ...prevFilters,
          subCategory: newSubCategories,
      };
    });
    // Reset page when filters change
    setPage(1);
  }, []);

  // HANDLE TAG CHANGE
  const handleTagChange = useCallback((tag) => {
    const updatedTags = filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag];
    setFilters({ ...filters, tags: updatedTags });
    // Reset page when filters change
    setPage(1);
  }, [filters.tags]);

  // HANDLE SEARCH BOX CHANGE
  const handleSearchChange = useCallback((e) => {
    setFilters({ ...filters, searchBox: e.target.value });
    // Reset page when filters change
    setPage(1);
  }, [filters]);

  // HANDLE STATUS CHANGE
  const handleStatusChange = useCallback((e) => {
    setFilters({ ...filters, status: e.target.value });
    // Reset page when filters change
    setPage(1);
  }, [filters]);

  // HANDLE MODAL OPEN
  const handleModalOpen = useCallback((topicId) => {
    const topicSelected = userTopics.find(topic => topic._id === topicId);
    setTopicClicked(topicSelected);
    setHideBody(true);
    setModalOpen(true);
  }, [userTopics]);

  // CONFIRM DELETE TOPIC
  const showConfirmationModal = useCallback((id,title) => {
    setdeleteTopic(id);
    setShowModal({
        type: 'warning',
        show: true,
        message: `Are you sure you want to delete the ${title} ?`,
    });
  }, []);

  // HANDLE TOPIC DELETION
  const handleTopicDeletion = useCallback(async (topicId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/Topic/?id=${topicId}`, { 
        method: 'DELETE'           
      });
      setShowModal({type: 'success', show: true, message: 'Topic has been deleted successfully'});
      fetchTopics();
    } 
    catch (error) {
      console.error('Error deleting topic:', error);
      setShowModal({type: 'error', show: true, message: 'Failed to delete topic. Please try again.'});
    }
    finally {
      setLoading(false);
    }
  }, []);

  // FETCH TOPICS - Use useCallback to memoize the function
  const fetchTopics = useCallback(async () => {
    // Start with a deliberate delay to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 100));
    const startTime = Date.now();
    try {
      setLoading(true); 
      setFetchError('');
      const response = await fetchDataFromApi(`/api/Topic`);
      setUserTopics(response || []);
      setHasMore(response && response.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchError('Failed to load topics. Please try again.');
    } finally {
      // Ensure a minimum display time of 1000ms for the loading state
      const remainingTime = 1000 - (Date.now() - startTime);
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      setLoading(false);
    }
  }, []);

  const exportData = () => {
    // Implementation for exporting data
    alert('Export functionality will be implemented here');
  };

  const handleClearFilters = () => {
    setFilters({ mainCategory: '', subCategory: [], tags: [], status: '', searchBox: '' });
  };

  // ON PAGE LOAD: FETCH TOPICS - Use setTimeout to ensure loading state is shown
  useEffect(() => {
    if(session?.user?.id){
      fetchTopics();
    } else {
      console.log('No user session found');
      // Set loading to false even when no user session
      setTimeout(() => setLoading(false), 500);
    }
  }, [session, fetchTopics]);

  // HANDLE INFINITE SCROLL
  useEffect(() => {
    // Check if we need to set up an observer
    if (!loaderRef.current || !hasMore) return;

    // Setup Intersection Observer
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(entries => {
      // If the loader element is visible and we're not already loading and there are more items
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.1 });

    observer.observe(loaderRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, filteredTopics.length]);

  // Check if there are more items to load
  useEffect(() => {
    setHasMore(page * itemsPerPage < filteredTopics.length);
  }, [filteredTopics, page, itemsPerPage]);

  // ON MODAL CLOSE: SHOW BODY
  useEffect(() => {
    if(!modalOpen){ setHideBody(false);}
    if(showModal.show){ setHideBody(true);}
  }, [modalOpen, showModal.show]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <>
      {loading && page === 1 ? (
        <div className="d-flex col-lg-12 mt-4 justify-content-center align-items-center" style={{ height: '500px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading software topics data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex col-lg-12 mt-4">
            {/* Filters Section */}
            <div className="card flex-grow-1 p-0">
              <div className="card-header filters">
                <div className="row d-flex align-items-center p-2">
                  <h5 className="card-title">
                    <i className="ri-code-box-line me-2"></i>
                    Software Topics
                  </h5>
                </div>
      
                {/* Filter Rows */}
                <div className="row d-flex align-items-center ps-2 pe-2 pb-4 border-bottom">
                  {/* Main Category Filter */}
                  <div className="col-lg-4">
                    <div className="select-wrapper">
                      <select className="form-select" value={filters.mainCategory} onChange={handleCategoryChange}>
                        <option key="default" value=''>Select a category</option>
                        {MAIN_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tags Filter */}
                  <div className="col-lg-4">
                    <div className="select-wrapper">
                      <button className={`btn dropdown-toggle w-100 tagButton ${formtagBtn ? 'setBorder' : ''} ${filters.tags.length > 0 ? 'selected-tags' : ''}`}
                        type="button" id="dropdownForm"
                        onClick={() => { setformTagBtn(!formtagBtn); setIsformDropdownOpen(!isformDropdownOpen); }}>
                        {filters.tags.length === 0 ? 'Select tags' : filters.tags.join(';')}
                      </button>
      
                      <ul className={`dropdown-menu w-100 ulTag ${isformDropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownForm">
                        {TAGS.map((tag) => (
                          <li key={tag} onClick={() => handleTagChange(tag)} className="custom-tag-li p-2">
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" id={tag + 'form'}
                                checked={filters.tags.includes(tag)} onChange={() => handleTagChange(tag)} />
                              <label className="form-check-label"  onClick={(e) => e.preventDefault()} htmlFor={tag + 'form'}>
                                {tag}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
      
                  {/* Status Filter */}
                  <div className="col-lg-4">
                    <div className="select-wrapper">
                      <select className="form-select" value={filters.status} onChange={handleStatusChange}>
                        <option key="default" value="">Select a status</option>
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status.toLowerCase()}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
      
                {/* Search and Add Section */}
                <div className="row d-flex mt-3 pb-3 ps-2 pe-2">
                  <div className="col-lg-12 d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-2">
                      <button className="btn btn-secondary exportBtn" onClick={exportData}>
                          <i className="ri-download-2-line me-2"></i> Export 
                      </button>
                      <button 
                          className="btn btn-outline-secondary" 
                          onClick={handleClearFilters}
                          title="Clear all filters"
                      >
                          <i className="ri-refresh-line"></i>
                      </button>
                    </div>
                    <div className="d-flex gap-3">
                      <input 
                        type="text" 
                        className="form-control searchInput" 
                        placeholder="Search Info" 
                        value={filters.searchBox}
                        onChange={handleSearchChange} 
                      />
                      <button className="btn btn-primary addBtn" onClick={() => window.location.href = '/pages/dashboard/learning/software/newsoftware'}>Add Topic</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          {/* Subcategories and Cards */}
          {filters.mainCategory && (
            <div className="row mt-3">
              <div className="col-lg-12">
                <div className="subCategories">
                  <div className="col-lg-12 d-flex gap-5">
                    {SUBCATEGORIES[filters.mainCategory]?.map((subcat) => (
                        <button key={subcat} className={`btn ${filters.subCategory.includes(subcat) ? 'active': ''}`} name={subcat} onClick={() => handlesubCategoryChange(subcat)}>{subcat}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
      
          {/* Cards Section */}
          <div className="d-flex flex-wrap p-0 mb-1">
            {fetchError && (
              <div className="alert alert-danger w-100 m-3" role="alert">
                {fetchError}
              </div>
            )}
            
            {!fetchError && displayedTopics.length === 0 && (
              <div className="w-100 m-3">
                <div className="text-center my-5 py-5">
                  <i className="ri-code-box-line" style={{ fontSize: '3rem', color: '#595b75' }}></i>
                  <h5 className="mt-3 text-muted">No topics found</h5>
                  <p className="text-muted">Try adjusting your filters or search terms</p>
                  <button className="btn btn-outline-primary mt-2" onClick={handleClearFilters}>
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            <div className="row p-3 w-100">
              {displayedTopics.map((topic) => (
                <div className="col-lg-4 mb-2" key={topic._id}>
                  <div className="card softwareCard">
                    <div className="card-header align-items-center justify-content-between d-flex">
                        <div className="d-flex align-items-center">
                            <div className="subCatIconDiv d-flex justify-content-center align-items-center"><img className="subcatIcon" src={topic.icon} alt={topic.subcategory}></img></div>
                            <div className="d-flex flex-column ps-4">
                                <span>{topic.category}</span>
                                <span>{topic.subcategory}</span>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="waves"><i className="ri-eye-line ri-22px text-muted" title="Quick Preview" onClick={() => handleModalOpen(topic._id)}></i></div>

                          <div className="dropdown">
                            <i className="ri-more-2-line ri-22px text-muted " id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu topics" aria-labelledby="dropdownMenuButton">
                              <li><a className="dropdown-item" href="#">View Details</a></li>
                              <li><a className="dropdown-item" href="#">Quick Edit</a></li>
                              <li className="delTopic"><a className="dropdown-item text-danger" onClick={() => showConfirmationModal(topic._id, topic.titleCard)}>Delete Topic</a></li>
                            </ul>
                          </div>
                        </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{topic.titleCard}</h5>
                      <p className="card-text topicDescription">{topic.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading indicator at bottom for infinite scroll */}
            {hasMore && (
              <div ref={loaderRef} className="text-center w-100 p-3">
                {loading && (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading more...</span>
                  </div>
                )}
              </div>
            )}

            {!hasMore && displayedTopics.length > 9 && (
              <div className="text-center text-muted w-100 p-3">
                <p>No More Results</p>
              </div>
            )}
          </div>
        </>
      )}
      
      <Modal showModal={showModal} setShowModal={setShowModal} handleDelete={handleTopicDeletion} deleteAction={deleteTopic}/>
      <CodeModal showModal={modalOpen} topicClicked={topicClicked} setShowModal={setModalOpen} fetchTopics={fetchTopics}/>
      {hideBody && <div className="modal-backdrop show m-0"></div>}
    </>
  );
}