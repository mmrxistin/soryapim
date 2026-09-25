// Bismillahirahmanirahim
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah
// La ilahe illAllahu vahdehu la sharika leh, lehu'l-mulku ve lehu'l-hamdu,
// yuhyi ve yumit
// bîyadîhîl xayr
//  ve huve ala kulli şey'in kadir
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illAllah, Allahu Ekber, Allahu Ekber ve lillahi'l-hamd
import React from "react";
import Mmmnavbar from "./components/mmnav";
import Footer from "./components/mmbingeh";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Mmmnavbar />
      <div className="mm-shell">
        <div className="mm-grid-frame mx-auto w-full">
          <main className="mm-main-col p-0 sm:p-0 md:p-0">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
