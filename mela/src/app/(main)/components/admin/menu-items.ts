import { Bookmark, Home, Mail, Settings2, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AdminMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: string;
}

export const adminMenuItems: AdminMenuItem[] = [
  { label: "Ana Sayfa", href: "/mmdashboard", icon: Home },
  { label: "Kullanıcılar", href: "/users", icon: Users },
  { label: "Ecibandî", href: "/bookmarks", icon: Bookmark },
  { label: "Peyam", href: "/peyam", icon: Mail, badgeKey: "messages" },
  { label: "Ayarlar", href: "/settings/profile", icon: Settings2 },
];
