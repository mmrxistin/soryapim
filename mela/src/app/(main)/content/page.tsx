// Bismillahirahmanirahim
// Elhamdulillahirrabbulalemin
// Esselatu vesselamu ala seyyidina Muhammedin
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illAllah 
// Allahu Ekber, Allahu Ekber, Allahu Ekber, La ilahe illallah
// Bila Allah Azze ve Celle me ji sunneta Resulullah Muhammed (s.a.v) neqetine, amin rabbal alemin 
// Xeyni Allah tu Xweda tune
// Allah u Ekber Ve Lillahil Hamd// Bismillahirahmanirahim
// Elhamdulillahirrabbulalemin
// Esselatu vesselamu ala seyyidina Muhammedin
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illAllah 
// Allahu Ekber, Allahu Ekber, Allahu Ekber, La ilahe illallah
// Bila Allah Azze ve Celle me ji sunneta Resulullah Muhammed (s.a.v) neqetine, amin rabbal alemin 
// Xeyni Allah tu Xweda tune
// Allah u Ekber Ve Lillahil Hamd
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Home, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const dashboardCards = [
  {
    title: "Dashboard",
    description: "Admin panel genel bakışı, hızlı erişim ve yönetim araçları.",
    href: "/",
    icon: Home,
  },
  {
    title: "Kültür",
    description: "Kültür haberleri ve içeriklerini yönetin.",
    href: "/kultur",
    icon: Users,
  },
  {
    title: "Yazarlar",
    description: "Tüm yazarlarınızı görüntüleyin ve yönetin.",
    href: "/authors",
    icon: MessageCircle,
  },
  {
    title: "",
    description: "Ortadoğu",
    href: "/dirok",
    icon: FileText,
  },
  {
    title: "Ekoloji Haberleri",
    description: ".",
    href: "/xane",
    icon: ShieldCheck,
  },
  {
    title: "Site Yönetimi",
    description: "Kadın Haberleri",
    href: "/rojname",
    icon: BookOpen,
  },
];

export default function AdminDashboard() {
  return (
    <section className="space-y-6">
        

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => (
          <Link key={card.title} href={card.href} className="group block rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <card.icon className="h-6 w-6" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-slate-900">{card.title}</h2>
            <p className="mb-5 text-sm leading-6 text-slate-600">{card.description}</p>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              Devam Et
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// El Hamdu Lillah Kesira

// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu.
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir