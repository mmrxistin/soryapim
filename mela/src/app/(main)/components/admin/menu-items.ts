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
  { label: "Penc — Ana İçerik", href: "/penc", icon: Home },
  { label: "Dirok", href: "/dirok", icon: FileText },
  { label: "Xane", href: "/xane", icon: Images },
  { label: "Rojname", href: "/rojname", icon: Newspaper },
  { label: "Car", href: "/car", icon: Film },
  { label: "Se", href: "/se", icon: Star },
  { label: "Du", href: "/du", icon: PlayCircle },
  { label: "Yek", href: "/yek", icon: PenTool },
  { label: "Kullanıcılar", href: "/users", icon: Users },
  { label: "Peyam", href: "/peyam", icon: Mail, badgeKey: "messages" },
  { label: "İçerik İşlemleri", href: "/naverok", icon: MessageSquare },
];
