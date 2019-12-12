import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ReturnSummary from "../components/ReturnSummary";
import { BudgetAndFinanceOfficeAddress } from "../common/Constants";
import { ErrorPath } from "../common/ErrorUtility";
import Address from "../components/Address";
import { GetTransientTaxReturn } from "../services/ApiService";
import { GetReturnSummaryValues } from "../data/TaxReturnMapper";

const {
  Organization,
  Department,
  City,
  Street
} = BudgetAndFinanceOfficeAddress;
const ConfirmationForm = props => {
  const { confirmationNumber = 0 } = props.match.params;
  const [taxReturn, setTaxReturn] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    returnTypeDescription,
    dateSubmitted: formDateSubmitted,
    formattedDueDate
  } = taxReturn;
  const taxReturnValues = GetReturnSummaryValues(taxReturn);
  const { dateSubmitted = formDateSubmitted } = taxReturn;
  const formattedDateSubmitted = dateSubmitted
    ? format(new Date(dateSubmitted), "MMMM dd yyyy")
    : "";

  useEffect(() => {
    GetTransientTaxReturn(confirmationNumber)
      .then(response => {
        setTaxReturn(response || {});
        setIsLoading(false);
      })
      .catch(error => {
        props.history.push(ErrorPath(error), { ...error });
      });
  }, [confirmationNumber, props.history]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="tt_form-section">
          <h1>
            <span>Your Baltimore County Transient Occupancy Tax Return</span>
          </h1>
          <h2>Transient Tax Return Submitted</h2>
          <h3>Confirmation Number: {confirmationNumber}</h3>
          <p>
            You have successfully completed the Baltimore County Transient
            Occupancy Tax Return. Your confirmation number for this return is{" "}
            <strong>{confirmationNumber}</strong>.
          </p>
          <p>
            Please present this number to the appropriate Budget and Finance
            Official when making inquiries in regards to your Transient
            Occupancy Tax Return.
          </p>
          <ReturnSummary
            header={"Transient Occupancy Tax Return Details:"}
            values={taxReturnValues}
            dateSubmitted={formattedDateSubmitted}
            dueDate={formattedDueDate}
            returnType={returnTypeDescription}
          />
          <Address
            line1={Organization}
            line2={Department}
            street={Street}
            city={City}
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;
