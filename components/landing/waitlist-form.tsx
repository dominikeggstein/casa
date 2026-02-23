"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/actions/waitlist/join";
import type { JoinWaitlistResult } from "@/actions/waitlist/join/types";

const initialState: JoinWaitlistResult | null = null;

async function handleSubmit(
  _prev: JoinWaitlistResult | null,
  formData: FormData
): Promise<JoinWaitlistResult> {
  return joinWaitlist(formData);
}

export function WaitlistForm({ id }: { id?: string }) {
  const [state, action, isPending] = useActionState(handleSubmit, initialState);

  if (state?.data) {
    return (
      <div id={id} className="rounded-xl border border-orange/30 bg-orange/10 p-6 text-center">
        <p className="text-lg font-semibold text-orange">You&apos;re in!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Position <span className="font-mono text-foreground">#{state.data.position}</span> on
          the waitlist
        </p>
      </div>
    );
  }

  return (
    <form id={id} action={action} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <Input
        name="email"
        type="email"
        placeholder="you@email.com"
        required
        className="h-12 flex-1 rounded-full border-charcoal-lighter bg-charcoal-light px-5 text-foreground placeholder:text-muted-foreground focus-visible:border-orange focus-visible:ring-orange/30"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="h-12 rounded-full bg-orange px-8 text-white hover:bg-orange-light disabled:opacity-60"
      >
        {isPending ? "Joining..." : "Join Waitlist"}
      </Button>
      {state?.error && (
        <p className="text-sm text-destructive sm:absolute sm:mt-14">{state.error}</p>
      )}
    </form>
  );
}
