import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RptId } from "../../generated/definitions/payment-activations-api/RptId";
import ErrorModal from "../components/modals/ErrorModal";
import PageContainer from "../components/PageContent/PageContainer";
import { QrCodeReader } from "../components/QrCodeReader/QrCodeReader";
import { PaymentFormFields } from "../features/payment/models/paymentModel";
import { ErrorsType } from "../utils/errors/checkErrorsModel";
import { qrCodeValidation } from "../utils/regex/validators";

export default function PaymentQrPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[1];
  const [errorModalOpen, setErrorModalOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [camBlocked, setCamBlocked] = React.useState(false);

  const onError = (m: string) => {
    setLoading(false);
    setError(m);
    setErrorModalOpen(true);
  };

  const onSubmit = React.useCallback(async (notice: PaymentFormFields) => {
    const rptId: RptId = `${notice.cf}${notice.billCode}`;
    setLoading(true);
    navigate(`/${currentPath}/${rptId}`);
  }, []);

  const reloadPage = () => window.location.reload();

  const getPageBody = React.useCallback(() => {
    if (loading) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          my={10}
        >
          <CircularProgress />
        </Box>
      );
    }
    if (camBlocked) {
      return (
        <Alert
          severity="warning"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            mt: 2,
          }}
        >
          <Box
            sx={{
              whiteSpace: "break-spaces",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {t("paymentQrPage.camBlocked")}
            <Button
              variant="text"
              onClick={reloadPage}
              sx={{ mt: 1, p: 0, alignSelf: "start" }}
            >
              {t("paymentQrPage.reloadPage")}
            </Button>
          </Box>
        </Alert>
      );
    } else {
      return (
        <QrCodeReader
          onError={() => setCamBlocked(true)}
          onScan={(data) => {
            if (data && !loading) {
              if (!qrCodeValidation(data)) {
                onError(ErrorsType.INVALID_QRCODE);
              } else {
                void onSubmit({
                  billCode: data?.split("|")[2] || "",
                  cf: data?.split("|")[3] || "",
                });
              }
            }
          }}
          enableLoadFromPicture={false}
        />
      );
    }
  }, [loading, camBlocked]);

  return (
    <PageContainer
      title="paymentQrPage.title"
      description="paymentQrPage.description"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ gap: 2 }}
      >
        <Box sx={{ my: 2, width: "100%" }}>{getPageBody()}</Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ gap: 2, mb: 4 }}
        >
          <Button
            variant="text"
            onClick={() => navigate(`/${currentPath}/notice`)}
          >
            {t("paymentQrPage.navigate")}
            <ArrowForwardIcon
              sx={{ color: "primary.main", ml: 2 }}
              fontSize="small"
            />
          </Button>
        </Box>
      </Box>
      {!!error && (
        <ErrorModal
          error={error}
          open={errorModalOpen}
          onClose={() => {
            setErrorModalOpen(false);
          }}
        />
      )}
    </PageContainer>
  );
}
