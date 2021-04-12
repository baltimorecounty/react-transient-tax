import React, { useState } from "react";
import ModalDisplay from "./Modal";

const InformationModal = (props) => {
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
      <button type="button" className="tt_button--info" onClick={showModal}>
        Why do I need to do this?
      </button>
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
