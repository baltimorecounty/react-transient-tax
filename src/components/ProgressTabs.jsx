import React from "react";
import classnames from "classnames";

const ProgressTabs = (props) => {
  const { panelGroups = [], tabs, activeStep } = props;
  const hasPanelGroups = panelGroups.length > 0;
  const itemsToMap = hasPanelGroups ? panelGroups : tabs;

  const getStepByPanelGroup = (activeStepId) =>
    tabs.find((step) => step.stepNumber === activeStepId);

  return (
    <div>
      <ol className="dg_progress-tabs">
        {itemsToMap.map((item) => {
          const step = hasPanelGroups ? getStepByPanelGroup(activeStep) : item;
          const isActiveOrCompletedItem = hasPanelGroups
            ? step.panelGroupId >= item.id
            : step.stepNumber <= activeStep;
          const cssClasses = classnames(
            isActiveOrCompletedItem ? "highlight" : ""
          );

          return (
            <li
              key={item.id}
              style={{
                display: step.isHidden ? "none" : "block",
              }}
              className={cssClasses}
            >
              {item.label}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgressTabs;
