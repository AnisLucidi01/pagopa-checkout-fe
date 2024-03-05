import React from "react";
import { resetThreshold } from "../redux/slices/threshold";
import PageContainer from "../components/PageContent/PageContainer";
import PrivacyInfo from "../components/PrivacyPolicy/PrivacyInfo";
import { PaymentNoticeChoice } from "../features/payment/components/PaymentNoticeChoice/PaymentNoticeChoice";
import { useAppDispatch } from "../redux/hooks/hooks";
import { clearStorage } from "../utils/storage/sessionStorage";
import { useOnMountUnsafe } from "hooks/useOnMountUnsafe";


export default function IndexPage() {
  const dispatch = useAppDispatch();

  useOnMountUnsafe(() => {
    dispatch(resetThreshold());
      
  });
  clearStorage();

  return (
    <PageContainer
      title="indexPage.title"
      description="indexPage.description"
      childrenSx={{ mt: 6 }}
    >
      <PaymentNoticeChoice />
      <PrivacyInfo />
    </PageContainer>
  );
}
