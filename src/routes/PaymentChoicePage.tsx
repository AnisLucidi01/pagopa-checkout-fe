/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable sonarjs/cognitive-complexity */
import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContent/PageContainer";
import { PaymentChoice } from "../features/payment/components/PaymentChoice/PaymentChoice";

export default function PaymentChoicePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer
      title="paymentChoicePage.title"
      description="paymentChoicePage.description"
      link={
        <a
          href="https://www.pagopa.gov.it/it/cittadini/trasparenza-costi/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 600, textDecoration: "none" }}
        >
          {t("paymentChoicePage.costs")}
        </a>
      }
    >
      <Box sx={{ mt: 6 }}>
        <PaymentChoice />
        <Box py={4} sx={{ width: "100%", height: "100%" }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate(-1)}
            style={{
              minWidth: "120px",
              height: "100%",
              minHeight: 45,
            }}
          >
            {t("paymentChoicePage.button")}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
}
