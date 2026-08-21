export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  old_price: number | null;
  checkout_url: string | null;
  category_id: string | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ElevonLink {
  id: string;
  title: string;
  subtitle: string | null;
  url: string;
  icon: string | null;
  category_id: string | null;
  sort_order: number;
  active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export type ProjectStatus = "draft" | "em_andamento" | "concluido";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  subtitle: string | null;
  challenge: string | null;
  solution: string | null;
  development: string | null;
  architecture_description: string | null;
  architecture_image_url: string | null;
  capabilities: string[];
  benefits: string[];
  technologies: string[];
  cta_title: string | null;
  cta_text: string | null;
  cta_label: string | null;
  cta_message: string | null;
  image_url: string | null;
  status: ProjectStatus;
  category_id: string | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_url: string | null;
  active: boolean;
  created_at: string;
}

export type SocialPlatform =
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "facebook"
  | "x"
  | "whatsapp";

export interface SocialLink {
  id: string;
  platform: SocialPlatform | string;
  url: string;
  active: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: unknown;
}
