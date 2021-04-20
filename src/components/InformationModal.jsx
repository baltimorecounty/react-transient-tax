import React, { useState } from "react";
import ModalDisplay from "./Modal";

const InformationModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { title, content, id } = props;

  const showModal = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
  };

  console.log(props);
  return (
    //{/* <button type="button" className="tt_button--info" onClick={showModal}>
    //  Why do I need to do this?
    //</button> */}
    <ModalDisplay
      //show={modalShow}
      //onHide={hideModal}
      title={title}
      id={id}
      content={content}
    />
  );
};
export default InformationModal;
