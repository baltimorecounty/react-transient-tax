import { Prompt } from "react-router-dom";
import React from "react";

const IEMessageAlert = props => {
  const { isItIEBrowser } = props;

  return (
    <React.Fragment>
      <Prompt
        when={isItIEBrowser === false} //  change it to "true" after testing because i am testing in non IE browser
        message="Internet Explorer may not work correctly for this site. Please use Chrome or Edge for the best browsing experience"
      />
    </React.Fragment>
  );
};

export default IEMessageAlert;
