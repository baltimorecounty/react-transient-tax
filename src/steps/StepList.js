const generateStepNumber = steps =>
  steps.map((step, stepIndex) => {
    step.stepNumber = stepIndex + 1; // zero-based index
    return step;
  });

/**
 * A list of forms
 */
class StepList {
  constructor(steps, panelGroups) {
    const sequencedSteps = generateStepNumber(steps);
    this.originalSteps = sequencedSteps;
    this.steps = sequencedSteps;
    this.panelGroups = panelGroups;
  }

  /**
   *
   * @param {Step} step
   * @param {string} insertAfterId unique id of step that you wish to insert the step after
   */
  addStep(step, insertAfterId) {
    const startIndex = this.steps.findIndex(({ id }) => id === insertAfterId);
    const newSteps = [...this.steps];
    newSteps.splice(startIndex + 1, 0, step); // + 1
    this.steps = generateStepNumber(newSteps);
  }

  /**
   * Remove step based on a regular expression
   * @param {string} prop property you wish to use to filter
   * @param {RegExp} regExpression regex to filter property by
   */
  removeStep(prop, regExpression) {
    const filteredSteps = this.steps.filter(
      step => !step[prop].match(regExpression)
    );
    this.steps = generateStepNumber(filteredSteps);
  }

  /**
   * Remove a step based on given unique id
   * @param {string} idToRemove unique id to identify a certain step
   */
  removeStepById(idToRemove) {
    const filteredSteps = this.steps.filter(({ id }) => id !== idToRemove);
    this.steps = generateStepNumber(filteredSteps);
  }

  reset() {
    this.steps = this.originalSteps;
  }
}

export default StepList;
