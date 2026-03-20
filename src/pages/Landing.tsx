import { ArrowRight, Brain, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Plans",
    description: "Generate personalized study schedules with curated resources based on your subject and goals.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Track your completion across tasks and milestones. Stay on target for exam day.",
  },
  {
    icon: Zap,
    title: "Focus Sessions",
    description: "Lock in with timed deep-work sessions. Eliminate distractions, maximize retention.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar showGetStarted />

      <main className="flex-1 flex flex-col items-center px-4 pt-24 pb-20">
        <div className="mb-8 rounded-full border border-border px-5 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          AI Study Planner
        </div>

        <h1 className="max-w-3xl text-center text-5xl font-black leading-tight tracking-tight md:text-6xl animate-fade-in">
          Stop guessing.
          <br />
          <span className="text-primary">Start locking in.</span>
        </h1>

        <p className="mt-6 max-w-xl text-center text-muted-foreground leading-relaxed" style={{ animationDelay: "0.1s" }}>
          Tell us what you're studying and when your exam is. Our AI builds a day-by-day plan with resources, milestones, and focus sessions — so you never waste another study hour.
        </p>

        <div className="mt-10 flex gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
  
  {/* Generate Plan */}
  <Link to="/generate">
    <Button size="lg" className="rounded-full gap-2 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
      Generate Your Plan <ArrowRight className="h-4 w-4" />
    </Button>
  </Link>

  {/* Dashboard Button */}
  <Link to="/dashboard">
    <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-border text-foreground hover:bg-secondary">
      Go to Dashboard
    </Button>
  </Link>

</div>

        <div className="mt-28 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 animate-fade-in"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
