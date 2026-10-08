// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import {
  FileText,
  Gauge,
  Images,
  Layout,
  Mail,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AdminMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: string;
}

export const adminMenuItems: AdminMenuItem[] = [
  { label: "Genel Bakış", href: "/", icon: Gauge },
  { label: "Malper", href: "/malper", icon: Layout },
  { label: "İşler", href: "/malper/isler", icon: Images },
  { label: "Hizmetler", href: "/malper/hizmetler", icon: ShieldCheck },
  { label: "Xane", href: "/xane", icon: Newspaper },
  { label: "Yek", href: "/yek", icon: Newspaper },
  { label: "Du", href: "/du", icon: Newspaper },
  { label: "Malper Sayfaları", href: "/malper-sayfalari", icon: FileText },
  { label: "Kullanıcılar", href: "/users", icon: Users },
  { label: "Peyam", href: "/peyam", icon: Mail, badgeKey: "messages" },
  { label: "İçerik İşlemleri", href: "/naverok", icon: MessageSquare },
];
