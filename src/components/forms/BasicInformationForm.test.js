import BasicInformationForm from "./BasicInformationForm";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { render } from "@testing-library/react";

test("should submit form when form is valid", () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <BasicInformationForm
        nextButton={<button type="submit">Submit</button>}
      />
    </MemoryRouter>
  );

  // Should display the proper form fields
  getByLabelText(/business name/i);
  getByLabelText(/business address/i);
});
