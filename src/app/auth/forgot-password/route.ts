import { NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const email = String(body.get("email") ?? "");
    const origin = new URL(request.url).origin;
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/admin/redefinir-senha`,
    });

    if (error && error.status !== 404) {
      return NextResponse.json({ error: "Não foi possível processar a solicitação." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível processar a solicitação." }, { status: 500 });
  }
}
