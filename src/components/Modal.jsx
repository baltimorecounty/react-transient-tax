import "../bootstrap.css";

import Modal from "react-bootstrap/Modal";
import React from "react";

import { IconHeading, IconLink } from "@baltimorecounty/dotgov-components";

const ModalDisplay = (props) => {
  const { title, content, id } = props;
  return (
    <section>
      <button
        type="button"
        className="dg_modal__open-button dg_button-link"
        data-target={id}
      >
        Why do I need to do this?
      </button>

      <div
        className="dg_modal hidden dark"
        id={id}
        role="dialog"
        aria-labelledby={`dialog-label-${id}`}
        aria-modal="true"
      >
        <div className="text-right">
          <IconLink
            size="tiny"
            id={`dialog-close-${id}`}
            type="circle"
            icon="far fa-times"
            description="Close this modal window."
            className="dg_modal__close-button"
          />
        </div>
        <IconHeading
          id={`dialog-label-${id}`}
          text={title}
          icon="fas fa-star"
        />
        <p>{content}</p>
      </div>
    </section>
  );
};
//   return (
//     <React.Fragment>
//       <Modal {...props}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             <h3>{title}</h3>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             <p>{content}</p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <button type="button" className="seButton dg_button" onClick={onHide}>
//             Close
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </React.Fragment>
//   );
// };

export default ModalDisplay;
