"use client"; 

export const Modal = ({showModal, setShowModal, handleDelete, deleteAction, isDeleting = false}) => {
return showModal.show ? (
        <>    
            <div className={'modal show'} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: 'block' }} role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {showModal.type === 'warning' ? (
                            <>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="d-flex col-lg-12 justify-content-end">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal({ ...showModal, show: false })}></button>
                                        </div>
                                        <div className="d-flex flex-column col-lg-12 align-items-center pb-2">
                                            <img src="/assets/images/warning.png" alt="Warning icon" className="modalImage" />
                                            <h4 className={`modalTitle`}>{showModal.type.toUpperCase()}</h4>
                                            <p className="modalMessage">{showModal.message}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <button type="button" className="btn modalClose confCancel" data-bs-dismiss="modal" onClick={() => setShowModal({ ...showModal, show: false })}>Cancel</button>
                                    <button 
                                        type="button" 
                                        className="btn modalClose confSucess" 
                                        data-bs-dismiss="modal" 
                                        onClick={() => handleDelete(deleteAction)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </>
                                        ) : "Yes, do it!"}
                                    </button>
                                </div>
                            </>
                        ): 
                        (
                            <>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="d-flex col-lg-12 justify-content-end">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal({ ...showModal, show: false })}></button>
                                        </div>
                                        <div className="d-flex flex-column col-lg-12 align-items-center pb-2">
                                            <img src={showModal.type === 'success' ? '/assets/images/success.png': '/assets/images/error.png'} alt="Icon" className="modalImage" />
                                            <h4 className={`modalTitle ${showModal.type === 'success' ? 'modalgreen' : 'modalred'}`}>{showModal.type.toUpperCase()}</h4>
                                            <p className="modalMessage">{showModal.message}</p>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className={`btn modalClose ${showModal.type === 'success' ? 'modalWin' : 'modalLose'}`} data-bs-dismiss="modal" onClick={() => setShowModal({ ...showModal, show: false })}>Continue</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    ) : null
}