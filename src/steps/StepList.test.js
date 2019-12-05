import Step from "./Step";
import StepList from "./StepList";

describe("add step", () => {
  test("should add a step in the proper location", () => {
    // Initialize Step List
    const stepList = new StepList([
      new Step({
        id: "basic-form",
        label: "Step 1"
      }),
      new Step({
        id: "advanced-form",
        label: "Step 2"
      })
    ]);

    stepList.addStep(new Step({ id: "login", label: "Login" }), "basic-form");

    expect(stepList.steps).toEqual([
      new Step({
        id: "basic-form",
        stepNumber: 1,
        label: "Step 1"
      }),
      new Step({ id: "login", stepNumber: 2, label: "Login" }),
      new Step({
        id: "advanced-form",
        stepNumber: 3,
        label: "Step 2"
      })
    ]);
  });
});

describe("remove step", () => {
  test("should remove a step based on a valid id", () => {
    // Initialize Step List
    const stepList = new StepList([
      new Step({
        id: "basic-form",
        label: "Step 1"
      }),
      new Step({
        id: "advanced-form",
        label: "Step 2"
      }),
      new Step({
        id: "login",
        label: "Step 3"
      })
    ]);

    stepList.removeStep("advanced-form");

    expect(stepList.steps).toEqual([
      new Step({
        id: "basic-form",
        stepNumber: 1,
        label: "Step 1"
      }),
      new Step({
        id: "login",
        stepNumber: 2,
        label: "Step 3"
      })
    ]);
  });
});
