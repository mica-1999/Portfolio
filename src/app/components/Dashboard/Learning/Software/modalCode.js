import { useEffect } from 'react';
import 'prismjs';
import 'prism-themes/themes/prism-xonokai.css';

export const CodeModal = ({showModal, topicClicked, setShowModal}) => {
    useEffect(() => {
        if (showModal) {
          // Highlight all code blocks when the modal opens
          Prism.highlightAll();
        }
        console.log(topicClicked);
      }, [showModal]);


      return (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg topicModal">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h5 className="modal-title">{topicClicked.titleCard}</h5>
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
                            <p>{topicClicked.description}</p>
                        </section>

                        {/* Code Snippets Section */}
                        {topicClicked.codeSnippets?.length > 0 && (
                            <section className="mb-4">
                                <h6>Code Snippets</h6>
                                {topicClicked.codeSnippets.map((snippet, index) => (
                                    <div key={index} className="mb-3">
                                        <pre className="mb-2">
                                            <code className={`language-${snippet.language.toLowerCase()}`}>
                                                {snippet.code}
                                            </code>
                                        </pre>
                                        <p><strong>Explanation:</strong> {snippet.explanation}</p>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Concepts Section */}
                        {topicClicked.concepts?.length > 0 && (
                            <section className="mb-4">
                                <h6>Key Concepts</h6>
                                <ul className="list-group">
                                    {topicClicked.concepts.map((concept, index) => (
                                        <li key={index} className="list-group-item">
                                            <strong>{concept.title}:</strong> {concept.explanation}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Tags Section */}
                        {topicClicked.tags?.length > 0 && (
                            <section className="mb-4">
                                <h6>Tags</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {topicClicked.tags.map((tag, index) => (
                                        <span key={index} className="badge bg-secondary">{tag}</span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* User Notes Section */}
                        {topicClicked.userNotes && (
                            <section className="mb-4">
                                <h6>Your Notes</h6>
                                <p>{topicClicked.userNotes}</p>
                            </section>
                        )}

                        {/* Video Reference Section */}
                        {topicClicked.videos?.length > 0 && (
                            <section className="mb-4">
                                <h6>Video References</h6>
                                <div className="list-group">
                                    {topicClicked.videos.map((video, index) => (
                                        <div key={index} className="list-group-item">
                                            <h6>{video.title}</h6>
                                            <p>{video.description}</p>
                                            <div className="ratio ratio-16x9">
                                                <iframe
                                                    src={video.url}
                                                    title={video.title}
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}