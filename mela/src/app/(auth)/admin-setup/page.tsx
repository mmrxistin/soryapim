// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
import { Metadata } from "next";
import Link from "next/link";
import AdminSetupForm from "./AdminSetupForm";

export const metadata: Metadata = {
  title: "Yönetici Kurulumu",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Red Yapım — Yönetici Kurulumu</h1>
            <p className="text-sm text-muted-foreground">
              Bu sayfa sadece ilk admin hesabını oluşturmak içindir.
            </p>
          </div>
          <div className="space-y-5">
            <AdminSetupForm />
            <Link href="/login" className="block text-center hover:underline">
              Admin hesabınız var mı? Giriş Yapın
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
