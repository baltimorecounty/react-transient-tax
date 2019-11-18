import React, { useState } from "react";
import { Button } from "reactstrap";
import ModalDisplay from "./Modal";

const InformationModal = props => {
  const [modalShow, setModalShow] = useState(false);
  const { title, content } = props;

  return (
    <React.Fragment>
      <Button type="button" color="link" onClick={() => setModalShow(true)}>
        Why do I need to do this?
      </Button>
      <ModalDisplay
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={title}
        content={content}
      />
    </React.Fragment>
  );
};
export default InformationModal;
