import "../bootstrap.css";

import Modal from "react-bootstrap/Modal";
import React from "react";

const ModalDisplay = props => {
  const { title, content, onHide } = props;

  return (
    <React.Fragment>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{title}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>{content}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="seButton dg_button" onClick={onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default ModalDisplay;
