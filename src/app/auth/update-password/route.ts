import { NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const password = String(body.get("password") ?? "");

    if (password.length < 8) {
      return NextResponse.json({ error: "A senha precisa ter pelo menos 8 caracteres." }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Sessão de recuperação inválida." }, { status: 401 });
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return NextResponse.json({ error: "Não foi possível atualizar a senha." }, { status: 400 });
    }

    await supabase.auth.signOut();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível atualizar a senha." }, { status: 500 });
  }
}
