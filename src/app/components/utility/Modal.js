export const Modal = ({showModal, setShowModal}) => {
    return showModal.show ? (
        <>
            <div className="modal-backdrop show"></div>
    
            <div className={'modal fade show'} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
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
                    </div>
                </div>
            </div>
        </>
    ) : null
}