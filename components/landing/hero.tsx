import { WaitlistForm } from "./waitlist-form";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24 sm:pb-32 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your home,{" "}
              <span className="text-orange">in flow.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Casa brings your kitchen, cleaning, and home organization into one
              beautiful, modular platform. Pick what you need — let the rest flow.
            </p>
            <div className="relative mt-8">
              <WaitlistForm id="waitlist" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free to start. No credit card required.
            </p>
          </div>

          {/* Dashboard mockup */}
          <div className="relative hidden lg:block" aria-hidden="true">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/20">
              {/* Top bar */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-destructive/60" />
                  <span className="h-3 w-3 rounded-full bg-chart-4/60" />
                  <span className="h-3 w-3 rounded-full bg-chart-2/60" />
                </div>
                <div className="h-6 flex-1 rounded-full bg-muted/50" />
              </div>

              {/* Module cards grid */}
              <div className="grid grid-cols-2 gap-4">
                <DashboardCard
                  title="Kitchen"
                  accent="bg-orange"
                  stat="12 recipes"
                  progress={75}
                />
                <DashboardCard
                  title="Clean"
                  accent="bg-chart-2"
                  stat="4 tasks today"
                  progress={50}
                />
                <DashboardCard
                  title="Organize"
                  accent="bg-chart-3"
                  stat="3 zones"
                  progress={90}
                />
                <div className="flex items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 p-6">
                  <span className="text-sm text-muted-foreground">+ Add module</span>
                </div>
              </div>

              {/* Bottom stat bar */}
              <div className="mt-6 flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
                <span className="text-xs text-muted-foreground">Household health</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-3/4 rounded-full bg-orange" />
                  </div>
                  <span className="text-xs font-medium text-orange">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard({
  title,
  accent,
  stat,
  progress,
}: {
  title: string;
  accent: string;
  stat: string;
  progress: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded-full ${accent}`} />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{stat}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${accent}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
