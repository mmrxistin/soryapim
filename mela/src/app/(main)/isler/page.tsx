import { Metadata } from "next";
import ContentSectionPage from "../components/ContentSectionPage";

export const metadata: Metadata = {
  title: "Xane",
};

export default function XanePage() {
  return <ContentSectionPage title="Xane" apiPath="/api/parvekirin/xane" postType="xane" />;
}
