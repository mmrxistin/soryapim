import { Metadata } from "next";
import ContentSectionPage from "../components/ContentSectionPage";

export const metadata: Metadata = {
  title: "Du",
};

export default function DuPage() {
  return <ContentSectionPage title="Du" apiPath="/api/parvekirin/du" postType="du" />;
}
