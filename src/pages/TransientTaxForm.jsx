import React from "react";
import * as Yup from "yup";
import { format } from "date-fns";
import { ConstantsProvider } from "../context/ConstantsContext";
import { Labels } from "../common/Constants";
import { HasAtLeast1Exemption } from "../common/ExemptionUtilities";
import { Form, Formik, ErrorMessage } from "formik";
import ExemptionCertificateField from "../components/forms/ExemptionCertificateField";
import { GetCalculatedTotals } from "../common/Calculations";
import BasicInformationSection from "../components/forms/BasicInformationSection";
import PaymentSelectionSection from "../components/forms/PaymentSelectionSection";
import IdentificationSection from "../components/forms/IdentificationSection";
import GrossOccupancySection from "../components/forms/GrossOccupancySection";
import ExemptionsSection from "../components/forms/ExemptionsSection";
import TransientTaxSection from "../components/forms/TransientTaxSection";
import { SaveReturn } from "../services/ApiService";

const initialValues = {
  accountNumber: "",
  businessName: "",
  address: "",
  paymentInterval: "",
  grossOccupancy: {},
  roomRentalCollectionFromNonTransients: {},
  governmentOnBusiness: {},
  exemptions: [],
  monthsLate: 0,
  monthsToReport: {},
  nameOfSubmitter: "",
  titleOfSubmitter: "",
  email: "",
  tradeAlias: ""
};

const validationSchema = () => {
  return Yup.object().shape({
    accountNumber: Yup.string().required("Required"),
    businessName: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    address: Yup.string().required("Required"),
    nameOfSubmitter: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    titleOfSubmitter: Yup.string()
      .transform(value => (!value ? null : value))
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter your email address."),
    exemptions: Yup.array().when(
      ["governmentOnBusiness", "roomRentalCollectionFromNonTransients"],
      {
        is: (governmentOnBusiness, roomRentalCollectionFromNonTransients) =>
          HasAtLeast1Exemption([
            governmentOnBusiness,
            roomRentalCollectionFromNonTransients
          ]),
        then: Yup.array().min(
          1,
          "At least 1 exemption must be specified when claiming an exemption dollar amount."
        ),
        otherwise: Yup.array().min(0)
      }
    )
  });
};

const onSubmit = (values, history) => {
  SaveReturn(values).then(({ ConfirmationNumber = 0 }) => {
    history.push(`/confirmationPage/${ConfirmationNumber}`);
  });
};

const TransientTaxForm = componentProps => (
  <ConstantsProvider>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => onSubmit(values, componentProps.history)}
    >
      {props => {
        const { values } = props;
        const {
          grossOccupancy,
          roomRentalCollectionFromNonTransients,
          governmentOnBusiness,
          monthsToReport = [],
          paymentInterval,
          monthsLate = 0
        } = values;
        const {
          totalExemptions,
          netRoomRentalCollections,
          transientTaxCollected,
          transientInterest,
          transientPenalty,
          totalInterestAndPenalties,
          monthlyTaxRemitted
        } = GetCalculatedTotals(
          {
            grossOccupancy,
            roomRentalCollectionFromNonTransients,
            governmentOnBusiness
          },
          monthsToReport,
          monthsLate
        );
        const hasAtLeast1Exemption = HasAtLeast1Exemption([
          roomRentalCollectionFromNonTransients,
          governmentOnBusiness
        ]);
        const isPaymentIntervalSelected =
          Object.keys(monthsToReport).length > 0;
        const hasExemptions = Object.keys(totalExemptions).some(
          exemptionIndex =>
            totalExemptions[exemptionIndex] <
            0 /** exemption totals are negative values */
        );
        const buildMonthLabel = monthIndex => {
          const friendlyMonthLabels = Object.keys(monthsToReport).map(key =>
            format(monthsToReport[key], "M/yy")
          );
          return friendlyMonthLabels[monthIndex];
        };

        return (
          <Form>
            <BasicInformationSection />
            <PaymentSelectionSection paymentInterval={paymentInterval} />
            {isPaymentIntervalSelected && (
              <React.Fragment>
                <GrossOccupancySection
                  label={Labels.GrossOccupancy}
                  monthsToReport={monthsToReport}
                  buildMonthLabel={buildMonthLabel}
                />
                <ExemptionsSection
                  labels={Labels}
                  monthsToReport={monthsToReport}
                  buildMonthLabel={buildMonthLabel}
                  totalExemptions={totalExemptions}
                  netRoomRentalCollections={netRoomRentalCollections}
                />
                <TransientTaxSection
                  labels={Labels}
                  transientTaxCollected={transientTaxCollected}
                  transientInterest={transientInterest}
                  transientPenalty={transientPenalty}
                  totalInterestAndPenalties={totalInterestAndPenalties}
                  monthlyTaxRemitted={monthlyTaxRemitted}
                />
              </React.Fragment>
            )}
            {hasExemptions && <ExemptionCertificateField />}
            {isPaymentIntervalSelected && (
              <React.Fragment>
                <IdentificationSection showTradeAlias={hasAtLeast1Exemption} />
                <ErrorMessage name="exemptions" />
                <button type="submit">Submit</button>
              </React.Fragment>
            )}
          </Form>
        );
      }}
    </Formik>
  </ConstantsProvider>
);

export default TransientTaxForm;
