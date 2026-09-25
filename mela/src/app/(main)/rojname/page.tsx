// Bismillahirrahmanirrahim
// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah 
// Allahumme salli ala seyyidina Muhammedin 
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illallah, Allahu Ekber, Allahu Ekber, ve lillahi'l-hamd
// Subhanallah, Elhamdulillah, Allahu Ekber


import PostEditor from "@/components/rojname/editor/PostEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ForYouFeed from "./ForYouFeed";

import SearchField from "@/components/SearchField";
import { Alert } from "react-bootstrap";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5 p-">
      <div className="w-full min-w-0 space-y-5">

      <Alert variant="success"> Rojname ya rêvebibe </Alert>
        <Tabs defaultValue="mm">
          <TabsList>
            <TabsTrigger value="for-you">Parvekirin</TabsTrigger>
            <TabsTrigger value="mm">Nû </TabsTrigger>

          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">

      <SearchField/>
          </TabsContent>
    





        <TabsContent value="mm">

  <PostEditor />

    </TabsContent>
    </Tabs>
      </div>
    </main>
  );
}
