// Bismillahirrahmanirrahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammedur Resulullah
// Allah U Ekber ve lillahi'l-hamd


import PostEditor from "@/components/yek/editor/PostEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ForYouFeed from "./ForYouFeed";

import SearchField from "@/components/yek/SearchField";
import { Alert } from "react-bootstrap";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5 p-">
      <div className="w-full min-w-0 space-y-5">

      <Alert variant="success"> Rûpela Qûran-a AzimuŞan-Kerîm </Alert>
        <Tabs defaultValue="mm">
          <TabsList>
            <TabsTrigger value="for-you">Ên niha weşanê de ne</TabsTrigger>
            <TabsTrigger value="mm">Biweşîne</TabsTrigger>

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
// Suphanallah Subhanallah Subhanallahi Azim ve Bihamdihi
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbulalemin//Subhanallah Subhanallah Subhanallahi Azim ve Bihamdihi
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbilalemin
// La ilahe illAllah Muhammeden abduhu ve resuluhu
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbilalemin
// Allahu Akbaru Kabira
// Allahu Akbaru Kabira
// Allahu Akbaru Kabira
// La ilahe illallah
// Subhanallah wa bihamdihi
// Subhanallahil Azim