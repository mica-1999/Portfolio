import { useEffect } from 'react';
import 'prismjs';
import 'prism-themes/themes/prism-xonokai.css';

export const CodeModal = ({showModal, topicClicked, setShowModal}) => {
    useEffect(() => {
        if (showModal) {
          // Highlight all code blocks when the modal opens
          Prism.highlightAll();
        }
      }, [showModal]);


    return(
        <div className={`modal  ${showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog topicModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{topicClicked.titleCard}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(!showModal)}></button>
                    </div>
                    <div className="modal-body overflow-auto">
                        <div className="row">
                            <p>{topicClicked.description}</p>
                        </div>
                        <div className="row">
                        {topicClicked.codeSnippet && (
                            <>
                                <div className="col-lg-8 codeSnippet">
                                    <pre>
                                    <code className={`language-${topicClicked.codeSnippet.language}`}>
                                        {topicClicked.codeSnippet.code}
                                    </code>
                                    </pre>
                                    <p>{topicClicked.codeSnippet.explanation}</p>
                                </div>
                            </>
                        )}
                            <div className="col-lg-4 resultBox">


                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 youtubeVideo">
                                <h5>Video Reference</h5>
                                <iframe
                                    width="50%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${topicClicked.youtubeVideoId}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    title="YouTube video"
                                ></iframe>
                            </div>
                            <div className="col-lg-12 webReferences">
                            
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(!showModal)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}