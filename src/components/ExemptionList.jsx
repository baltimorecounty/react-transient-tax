import React from "react";
import ExemptionListItem from "./ExemptionListItem";

const ExemptionsList = props => {
  const { exemptions = [], ...rest } = props;

  return (
    <ul className="tt_exemptions">
      <h3>Exemptions</h3>
      {exemptions.map(
        exemption =>
          console.log(exemption) || (
            <ExemptionListItem
              key={exemption.id}
              exemption={exemption}
              {...rest}
            />
          )
      )}
    </ul>
  );
};

export default ExemptionsList;
