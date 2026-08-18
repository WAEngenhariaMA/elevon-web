import { createClient } from "@/services/supabase/server";
import type { Product } from "@/types";

const SELECT_WITH_CATEGORY = "*, category:categories(*)";

const samples: Product[] = [
  {
    id: "demo-1",
    name: "Diagnóstico Digital",
    slug: "diagnostico-digital",
    short_description: "Mapeamento de oportunidades para evolução digital.",
    description: null,
    image_url: null,
    price: 990,
    old_price: 1290,
    checkout_url: null,
    category_id: null,
    featured: true,
    active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "demo-2",
    name: "Blueprint de Automação",
    slug: "blueprint-automacao",
    short_description: "Uma base prática para automatizar operações.",
    description: null,
    image_url: null,
    price: 1490,
    old_price: null,
    checkout_url: null,
    category_id: null,
    featured: true,
    active: true,
    created_at: "",
    updated_at: "",
  },
];

export async function getProducts(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return samples;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select(SELECT_WITH_CATEGORY)
      .eq("active", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as unknown as Product[];
  } catch {
    return samples;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(SELECT_WITH_CATEGORY)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as unknown as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(SELECT_WITH_CATEGORY)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as unknown as Product | null;
}
