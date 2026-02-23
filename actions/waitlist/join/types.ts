export type JoinWaitlistResult =
  | { data: { position: number }; error?: never }
  | { error: string; data?: never };
