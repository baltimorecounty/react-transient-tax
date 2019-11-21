import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "reactstrap";
import "../bootstrap.css";

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
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default ModalDisplay;
