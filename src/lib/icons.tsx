import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function resolveIcon(name?: string | null): LucideIcon {
  if (!name) return Icons.Link2;
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? Icons.Link2;
}

export const socialIcons: Record<string, LucideIcon> = {
  instagram: Icons.Camera,
  linkedin: Icons.Briefcase,
  youtube: Icons.PlayCircle,
  tiktok: Icons.Music2,
  facebook: Icons.MessagesSquare,
  x: Icons.X,
  whatsapp: Icons.MessageCircle,
};

export function resolveSocialIcon(platform: string): LucideIcon {
  return socialIcons[platform.toLowerCase()] ?? Icons.Globe2;
}
