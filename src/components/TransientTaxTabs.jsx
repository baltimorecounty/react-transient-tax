import React from "react";

const TransientTaxTabs = props => {
  const { panelGroups = [], tabs, activeStep } = props;
  const hasPanelGroups = panelGroups.length > 0;
  const itemsToMap = hasPanelGroups ? panelGroups : tabs;

  const getStepByPanelGroup = activeStepId =>
    tabs.find(step => step.stepNumber === activeStepId);

  return (
    <div className="bc-citysourced-reporter">
      <ol className="bc-citysourced-reporter-steps">
        {itemsToMap.map(item => {
          const step = hasPanelGroups ? getStepByPanelGroup(activeStep) : item;
          const isActiveItem = hasPanelGroups
            ? step.panelGroupId === item.id
            : step.stepNumber === activeStep;

          return (
            <li
              key={item.id}
              style={{
                display: step.isHidden ? "none" : "block",
                background: isActiveItem ? "gold" : "lightgray"
              }}
              className={isActiveItem ? "highlight" : ""}
            >
              {item.label}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TransientTaxTabs;
