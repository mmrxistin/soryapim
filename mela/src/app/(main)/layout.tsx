// Bismillahirahmanirahim 
// ElHAMDULİLLAHİRABBULALEMİN
// Es-selatu ve Es-selamu ala Resulina Muhammedin
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illAllah
// SubhanAllah , Elhamdulillah, Allahu Ekber
// HasbunAllahu ve ni'mel vekil
// La havle ve la kuvvete illa billahil Aliyyil Azim
//  Allahu Ekber Ve Lillahil Hamd
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import AdminFooter from "./components/AdminFooter";
import Navbar from './Navbar';
import MenuBar from "./MenuBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/malper");

  return(  <SessionProvider value={session}>
    <Navbar />
          
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Yönetim Menüsü
            </h2>
            <MenuBar />
          </div>
        </aside>

        <main className="flex-1 space-y-6">
      
    {children}
    </main>
   <AdminFooter />
  </SessionProvider>)
}




