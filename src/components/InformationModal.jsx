import React, { useState } from "react";
import { Button } from "reactstrap";
import ModalDisplay from "./Modal";

const InformationModal = props => {
  const [modalShow, setModalShow] = useState(false);
  const { title, content } = props;

  const showModal = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
  };

  return (
    <React.Fragment>
      <Button type="button" color="link" onClick={showModal}>
        Why do I need to do this?
      </Button>
      <ModalDisplay
        show={modalShow}
        onHide={hideModal}
        title={title}
        content={content}
      />
    </React.Fragment>
  );
};
export default InformationModal;
