import React, { useEffect, useState } from "react";

import Address from "../components/Address";
import { BudgetAndFinanceOfficeAddress } from "../common/Constants";
import { GetQueryParam } from "../common/Routing";
import { GetReturnSummaryValues } from "../data/TaxReturnMapper";
import { GetTransientTaxReturn } from "../services/ApiService";
import { Redirect } from "react-router-dom";
import ReturnSummary from "../components/ReturnSummary";
import { format } from "date-fns";
import useHasNetworkError from "../components/hooks/useHasNetworkError";

const { Organization, Department, City, Street } =
  BudgetAndFinanceOfficeAddress;
const ConfirmationForm = ({ match = {} }) => {
  const { hasNetworkError } = useHasNetworkError();
  const [hasConfirmationError, setHasConfirmationError] = useState(false);
  const confirmationNumber = GetQueryParam(match, "confirmationNumber") || 0;
  const [taxReturn, setTaxReturn] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    returnTypeDescription,
    dateSubmitted: formDateSubmitted,
    dueDate,
    businessName,
  } = taxReturn;
  const taxReturnValues = GetReturnSummaryValues(taxReturn);
  const { dateSubmitted = formDateSubmitted } = taxReturn;
  const formattedDateSubmitted = dateSubmitted
    ? format(new Date(dateSubmitted), "MMMM dd, yyyy")
    : "";

  const confirmationNumberToDisplay = confirmationNumber
    .split("-")
    .reverse()[0];

  useEffect(() => {
    GetTransientTaxReturn(confirmationNumber)
      .then((response) => {
        setTaxReturn(response || {});
        setIsLoading(false);
      })
      .catch(() => {
        setHasConfirmationError(true);
      });
  }, [confirmationNumber]);

  if (hasNetworkError || hasConfirmationError) {
    return <Redirect to="/error/network" />;
  }

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
          <h3>Confirmation Number: {confirmationNumberToDisplay}</h3>
          <p>
            You have successfully completed the Baltimore County Transient
            Occupancy Tax Return. Your confirmation number for this return is{" "}
            <strong>{confirmationNumberToDisplay}</strong>.
          </p>
          <p>
            To make your transient tax payment, please visit the{" "}
            <a href="https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapApplyDisclaimer.aspx?module=OnlinePayments&TabName=OnlinePayment">
              online payment
            </a>{" "}
            portal and be sure to include your Confirmation Number displayed on
            this page in the Reference Number field. Otherwise, please make your
            check payable to Baltimore County, Maryland and mail to Office of
            Budget and Finance, 400 Washington Avenue, Room 150, Towson, MD
            21204-4665
          </p>
          <p>
            Please present this number to the appropriate Budget and Finance
            Official when making inquiries in regards to your Transient
            Occupancy Tax Return.
          </p>
          <ReturnSummary
            businessName={businessName}
            header={"Transient Occupancy Tax Return Details:"}
            values={taxReturnValues}
            dateSubmitted={formattedDateSubmitted}
            dueDate={dueDate}
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
