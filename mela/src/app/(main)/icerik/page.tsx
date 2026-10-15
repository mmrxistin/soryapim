// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

import { getSiteContent } from "@/lib/site-content";
import SiteContentEditor from "./SiteContentEditor";

export const dynamic = "force-dynamic";

export default async function IcerikPage() {
  const content = await getSiteContent();
  return <SiteContentEditor initialContent={content} />;
}
