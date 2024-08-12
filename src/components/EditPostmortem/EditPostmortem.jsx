import React, { useState } from 'react';
import PostmortemTable from '../PostmortemTable/PostmortemTable';
import { Modal, Button } from 'react-bootstrap';
import '../../App.css';

const EditPostmortemModal = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => setIsClicked(true);

    return (
        <div>
            <Button variant="primary" onClick={handleClick} style={{ width: "100%", border: "none" }}>
                Edit postmortem
            </Button>

            <Modal
                show={isClicked}
                onHide={() => setIsClicked(false)}
                dialogClassName="custom-modal-width"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit postmortem
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '0', maxHeight: '70vh', overflowY: 'auto' }}>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        <PostmortemTable editable={true} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditPostmortemModal;
