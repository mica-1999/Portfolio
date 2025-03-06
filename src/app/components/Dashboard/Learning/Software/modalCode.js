import { useEffect, useState } from 'react';
import 'prismjs';
import 'prism-themes/themes/prism-xonokai.css';

export const CodeModal = ({showModal, topicClicked, setShowModal, fetchTopics}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedTopic, setEditedTopic] = useState({});

    useEffect(() => {
        if (showModal) {
          Prism.highlightAll();
          setIsEditMode(false);
          setEditedTopic({...topicClicked});
        }
      }, [showModal, topicClicked]);

    const handleInputChange = (field, value) => {
        setEditedTopic(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCodeSnippetChange = (index, field, value) => {
        const updatedSnippets = [...editedTopic.codeSnippets];
        updatedSnippets[index] = {
            ...updatedSnippets[index],
            [field]: value
        };
        setEditedTopic(prev => ({
            ...prev,
            codeSnippets: updatedSnippets
        }));
    };

    const handleConceptChange = (index, field, value) => {
        const updatedConcepts = [...editedTopic.concepts];
        updatedConcepts[index] = {
            ...updatedConcepts[index],
            [field]: value
        };
        setEditedTopic(prev => ({
            ...prev,
            concepts: updatedConcepts
        }));
    };

    const handleTagsChange = (tagsString) => {
        const tagsArray = tagsString.split(',').map(tag => tag.trim());
        setEditedTopic(prev => ({
            ...prev,
            tags: tagsArray
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`/api/Topic/?id=${editedTopic._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    field: 'fullUpdate', 
                    value: editedTopic 
                }),
            });

            if (response.ok) {
                setIsEditMode(false);
                setShowModal(false);
                fetchTopics();
                alert('Topic updated successfully');
            } else {
                alert('Failed to update topic');
            }
        } catch (error) {
            console.error('Error updating topic:', error);
            alert('Error updating topic');
        }
    };

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg topicModal">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        {isEditMode ? (
                            <input
                                type="text"
                                className="form-control"
                                value={editedTopic.titleCard || ''}
                                onChange={(e) => handleInputChange('titleCard', e.target.value)}
                            />
                        ) : (
                            <h5 className="modal-title">{topicClicked.titleCard}</h5>
                        )}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body overflow-auto">
                        {/* Description Section */}
                        <section className="mb-4">
                            <h6>Description</h6>
                            {isEditMode ? (
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={editedTopic.description || ''}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                ></textarea>
                            ) : (
                                <p>{topicClicked.description}</p>
                            )}
                        </section>

                        {/* Code Snippets Section */}
                        {(isEditMode || topicClicked.codeSnippets?.length > 0) && (
                            <section className="mb-4">
                                <h6>Code Snippets</h6>
                                {isEditMode ? (
                                    editedTopic.codeSnippets?.map((snippet, index) => (
                                        <div key={index} className="mb-3 border p-3 rounded">
                                            <div className="mb-2">
                                                <label className="form-label">Language</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={snippet.language || ''}
                                                    onChange={(e) => handleCodeSnippetChange(index, 'language', e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Code</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="5"
                                                    value={snippet.code || ''}
                                                    onChange={(e) => handleCodeSnippetChange(index, 'code', e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Explanation</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="2"
                                                    value={snippet.explanation || ''}
                                                    onChange={(e) => handleCodeSnippetChange(index, 'explanation', e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    topicClicked.codeSnippets?.map((snippet, index) => (
                                        <div key={index} className="mb-3">
                                            <pre className="mb-2">
                                                <code className={`language-${snippet.language.toLowerCase()}`}>
                                                    {snippet.code}
                                                </code>
                                            </pre>
                                            <p><strong>Explanation:</strong> {snippet.explanation}</p>
                                        </div>
                                    ))
                                )}
                            </section>
                        )}

                        {/* Concepts Section */}
                        {(isEditMode || topicClicked.concepts?.length > 0) && (
                            <section className="mb-4">
                                <h6>Key Concepts</h6>
                                {isEditMode ? (
                                    editedTopic.concepts?.map((concept, index) => (
                                        <div key={index} className="mb-3 border p-3 rounded">
                                            <div className="mb-2">
                                                <label className="form-label">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={concept.title || ''}
                                                    onChange={(e) => handleConceptChange(index, 'title', e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Explanation</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="2"
                                                    value={concept.explanation || ''}
                                                    onChange={(e) => handleConceptChange(index, 'explanation', e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <ul className="list-group">
                                        {topicClicked.concepts?.map((concept, index) => (
                                            <li key={index} className="list-group-item">
                                                <strong>{concept.title}:</strong> {concept.explanation}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        )}

                        {/* Tags Section */}
                        {(isEditMode || topicClicked.tags?.length > 0) && (
                            <section className="mb-4">
                                <h6>Tags</h6>
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedTopic.tags?.join(', ') || ''}
                                        onChange={(e) => handleTagsChange(e.target.value)}
                                        placeholder="Enter tags separated by commas"
                                    />
                                ) : (
                                    <div className="d-flex flex-wrap gap-2">
                                        {topicClicked.tags?.map((tag, index) => (
                                            <span key={index} className="badge bg-secondary">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* User Notes Section */}
                        {isEditMode || topicClicked.userNotes ? (
                            <section className="mb-4">
                                <h6>Your Notes</h6>
                                {isEditMode ? (
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={editedTopic.userNotes || ''}
                                        onChange={(e) => handleInputChange('userNotes', e.target.value)}
                                    ></textarea>
                                ) : (
                                    <p>{topicClicked.userNotes}</p>
                                )}
                            </section>
                        ) : null}
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        {isEditMode ? (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsEditMode(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setIsEditMode(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}