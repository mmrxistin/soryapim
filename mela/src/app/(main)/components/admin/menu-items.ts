// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import {
  FileText,
  Film,
  Gauge,
  Home,
  Images,
  Layout,
  Mail,
  MessageSquare,
  Newspaper,
  PenTool,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AdminMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: string;
}

// (main) · Red Yapım Malper Yönetim Paneli menüsü.
// Her başlık malper'deki ilgili içerik bölümünü yönetir.
export const adminMenuItems: AdminMenuItem[] = [
  { label: "Genel Bakış", href: "/", icon: Gauge },
  { label: "Malper (Önizleme)", href: "/malper", icon: Layout },
  { label: "İşler", href: "/isler", icon: Images },
  { label: "Malper Sayfaları", href: "/malper-sayfalari", icon: FileText },
  { label: "Kullanıcılar", href: "/users", icon: Users },
  { label: "Peyam", href: "/peyam", icon: Mail, badgeKey: "messages" },
  { label: "İçerik İşlemleri", href: "/naverok", icon: MessageSquare },
];
