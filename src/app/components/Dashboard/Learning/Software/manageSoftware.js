"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchDataFromApi } from '/src/utils/apiUtils';
import { CodeModal } from './modalCode';
import { MAIN_CATEGORIES, SUBCATEGORIES, STATUS_OPTIONS, TAGS } from './constants';


export default function ManageSoftware() {  
  const { data: session } = useSession(); 

  // STATE VARIABLES
  const [userTopics, setUserTopics] = useState([]); // User's topics from DB 
  const [formtagBtn, setformTagBtn] = useState(false);
  const [isformDropdownOpen, setIsformDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({ mainCategory: '', subCategory: '', tags: [], status: '', searchBox: '' });

  // MODAL INFO
  const [modalOpen, setModalOpen] = useState(false);
  const [topicClicked, setTopicClicked] = useState({});
  const [hideBody, setHideBody] = useState(false); // Dark Body toggle

  // Handle main category selection
  const handleCategoryChange = (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      mainCategory: event.target.value,
    }));
  };

  // Handle subcategory selection
  const handlesubCategoryChange = (subCategory) => {
    setFilters((prevFilters) => {
      if (prevFilters.subCategory === subCategory) {
        return {
          ...prevFilters,
          subCategory: '',
        };
      }
      return {
        ...prevFilters,
        subCategory: subCategory,
      };
    });
  };

  // Handle tag selection
  const handleTagChange = (tag) => {
      const updatedTags = filters.tags.includes(tag)
          ? filters.tags.filter((t) => t !== tag)
          : [...filters.tags, tag];
      setFilters({ ...filters, tags: updatedTags });
  }

  const handleModalOpen = (topicId) => {
    // Find the topic by matching its _id
    const topicSelected = userTopics.find(topic => topic._id === topicId);

    // Update the state with the selected topic's data
    setTopicClicked(topicSelected);

    // Open the modal and darken body
    setHideBody(true);
    setModalOpen(true);
  }
  // FETCH FOR TOPICS
  const fetchTopics = async () => {
    try {
      const response = await fetchDataFromApi(`/api/Topic`);
      setUserTopics(response || []);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  // On initial render, fetch the user's topics
  useEffect(() => {
    if(session.user?.id){
      try {
        fetchTopics();
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.log('No user session found');
    }
  },[session])

  // Close modal and remove dark body
  useEffect(() => {
    if(modalOpen === false){
    setHideBody(false);
    }
  },[modalOpen === false])

  return (
    <>
      <div className="d-flex col-lg-12 mt-4">
        {/* Filters Section */}
        <div className="card flex-grow-1 p-0">
          <div className="card-header filters">
            <div className="row d-flex align-items-center p-2">
              <h5 className="card-title">Filters</h5>
            </div>
  
            {/* Filter Rows */}
            <div className="row d-flex align-items-center ps-2 pe-2 pb-4 border-bottom">
              {/* Main Category Filter */}
              <div className="col-lg-4">
                <div className="select-wrapper">
                  <select className="form-select" value={filters.mainCategory.toLowerCase()} onChange={handleCategoryChange}>
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
                  <select className="form-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
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
                <button className="btn btn-secondary dropdown-toggle exportBtn">Export </button>
                <div className="d-flex gap-3">
                  <input type="text" className="form-control searchInput" placeholder="Search Info" onChange={(e) => setFilters({ ...filters, searchBox: e.target.value })} />
                  <button className="btn btn-primary addBtn" onClick={() => window.location.href = '/pages/dashboard/learning/software/newsoftware'}>Add Topic</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Subcategories and Cards */}
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="subCategories">
            <div className="col-lg-12 d-flex gap-5">
              {SUBCATEGORIES[filters.mainCategory]?.map((subcat) => (
                  <button key={subcat} className={`btn ${filters.subCategory === subcat ? 'active': ''}`} name={subcat} onClick={() => handlesubCategoryChange(subcat)}>{subcat}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Cards Section */}
      <div className="d-flex flex-wrap p-0 mb-1">
        <div className="row p-3 w-100">
          {userTopics
          .filter((topic) => {
            // If there's no filter for category, all topics are included
            if (filters.mainCategory && topic.category.toLowerCase() !== filters.mainCategory.toLowerCase()) {
              return false;
            }
          
            // If there's no filter for subcategory, all topics are included
            if (filters.subCategory && topic.subcategory.toLowerCase() !== filters.subCategory.toLowerCase()) {
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
          })
          
          .map((topic, idx) => (
            <div className="col-lg-4" key={topic._id}>
              <div className="card softwareCard">
                <div className="card-header align-items-center justify-content-between d-flex">
                    <div className="d-flex align-items-center">
                        <div className="subCatIconDiv d-flex justify-content-center align-items-center"><img className="subcatIcon" src={topic.icon}></img></div>
                        <div className="d-flex flex-column ps-4">
                            <span>{topic.category}</span>
                            <span>{topic.subcategory}</span>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                      {topic.codeSnippets.length > 0 ? (
                        <div className="waves"><i className="ri-eye-line ri-22px text-muted" title="Quick Preview" onClick={() => handleModalOpen(topic._id)}></i></div>
                        ) : ''}

                      <div className="dropdown">
                        <i className="ri-more-2-line ri-22px text-muted " id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu topics" aria-labelledby="dropdownMenuButton">
                          <li><a className="dropdown-item" href="#">View Details</a></li>
                          <li><a className="dropdown-item" href="#">Rename Title</a></li>
                          <li><a className="dropdown-item" href="#">Add to Favorites</a></li>
                          <li className="delTopic"><a className="dropdown-item text-danger" href="#">Delete Topic</a></li>
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
      </div>
      <CodeModal showModal={modalOpen} topicClicked={topicClicked} setShowModal={setModalOpen} />
      {hideBody  && <div className="modal-backdrop show m-0"></div>}
    </>
  );
}