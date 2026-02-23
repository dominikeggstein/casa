"use server";

import { createClient } from "@/lib/supabase/server";
import { joinWaitlistSchema } from "./schema";
import type { JoinWaitlistResult } from "./types";

export async function joinWaitlist(
  formData: FormData
): Promise<JoinWaitlistResult> {
  const raw = { email: formData.get("email") };
  const parsed = joinWaitlistSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const supabase = await createClient();

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email: parsed.data.email });

    if (insertError) {
      if (insertError.code === "23505") {
        return { error: "You're already on the waitlist!" };
      }
      return { error: "Something went wrong. Please try again." };
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    return { data: { position: count ?? 1 } };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
