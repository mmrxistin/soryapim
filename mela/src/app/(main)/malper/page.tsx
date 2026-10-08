import { Metadata } from "next";
import ContentSectionPage from "../components/ContentSectionPage";

export const metadata: Metadata = {
  title: "Yek",
};

export default function YekPage() {
  return <ContentSectionPage title="Yek" apiPath="/api/parvekirin/yek" postType="yek" />;
}
