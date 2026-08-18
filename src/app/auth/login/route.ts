import { NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(body.get("email")),
      password: String(body.get("password")),
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 401 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }
}
