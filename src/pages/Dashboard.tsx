import { useState } from "react";
import { Plus, ClipboardList, CheckCircle2, Clock, TrendingUp, ChevronDown, ChevronUp, ExternalLink, Lock, Trash2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth";
import { mockStudyPlan, getProgress, getCompletedCount, getHoursDone, type StudyPlan } from "@/lib/study-data";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { user, loading, username } = useAuth();
  const [plans, setPlans] = useState<StudyPlan[]>([mockStudyPlan]);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(mockStudyPlan.id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const totalTasks = plans.flatMap((p) => p.days.flatMap((d) => d.tasks));
  const remaining = totalTasks.filter((t) => !t.completed && !t.locked).length;

  const toggleTask = (planId: string, taskId: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id !== planId) return p;
        return {
          ...p,
          days: p.days.map((d) => ({
            ...d,
            tasks: d.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t
            ),
          })),
        };
      })
    );
  };

  const deletePlan = (planId: string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this plan?");
  if (!confirmDelete) return;

  setPlans((prev) => prev.filter((p) => p.id !== planId));

  // Optional: reset expanded plan if deleted
  if (expandedPlan === planId) {
    setExpandedPlan(null);
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar showLogout />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 pt-8 pb-20">
        <p className="text-muted-foreground">{getGreeting()}</p>
        <h1 className="text-2xl font-bold text-foreground mt-1">
          You have <span className="text-primary">{remaining}</span> tasks remaining.
        </h1>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: ClipboardList, label: "Plans", value: plans.length.toString() },
            { icon: CheckCircle2, label: "Completed", value: plans.length > 0 ? getCompletedCount(plans[0]) : "0/0" },
            { icon: Clock, label: "Hours Done", value: plans.length > 0 ? getHoursDone(plans[0]) : "0h" },
            { icon: TrendingUp, label: "Progress", value: plans.length > 0 ? `${getProgress(plans[0])}%` : "0%" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <stat.icon className="h-4 w-4 text-primary" />
                {stat.label}
              </div>
              <p className="mt-2 text-2xl font-bold text-card-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <Link to="/generate">
          <Button variant="outline" className="w-full mt-6 h-12 rounded-xl border-border text-foreground hover:bg-secondary gap-2">
            <Plus className="h-4 w-4" /> Generate New Study Plan
          </Button>
        </Link>

        {plans.map((plan) => {
          const progress = getProgress(plan);
          const isExpanded = expandedPlan === plan.id;

          return (
            <div key={plan.id} className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
              <button
                className="w-full p-5 flex items-start justify-between text-left"
                onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                      {plan.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">Exam: {plan.examDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-card-foreground">{plan.title}</h3>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
  
  {/* 🗑️ Delete Button */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // prevent collapsing
      deletePlan(plan.id);
    }}
    className="w-8 h-8 flex items-center justify-center rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
  >
    <Trash2 className="h-4 w-4" />
  </button>

  {/* Progress */}
  <div className="flex items-center gap-2">
    <Progress value={progress} className="w-24 h-2" />
    <span className="text-sm text-muted-foreground">{progress}%</span>
  </div>

  {isExpanded ? (
    <ChevronUp className="h-4 w-4 text-muted-foreground" />
  ) : (
    <ChevronDown className="h-4 w-4 text-muted-foreground" />
  )}
</div>
              </button>

              {isExpanded && (
                <div className="border-t border-border">
                  {plan.days.map((day) => (
                    <div key={day.day}>
                      <div className="px-5 py-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-2.5 py-1 rounded">
                          Day {day.day}
                        </span>
                      </div>
                      {day.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`px-5 py-4 border-t border-border flex gap-3 ${task.completed ? "opacity-60" : ""}`}
                        >
                          <div className="pt-0.5">
                            {task.locked ? (
                              <div className="h-5 w-5" />
                            ) : (
                              <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(plan.id, task.id)}
                                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className={`font-semibold text-card-foreground ${task.completed ? "line-through" : ""}`}>
                                {task.title}
                              </h4>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs text-muted-foreground">{task.duration}</span>
                                {task.locked && (
                                  <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-2 py-0.5 rounded flex items-center gap-1">
                                    <Lock className="h-3 w-3" /> LOCK IN
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className={`mt-1 text-sm text-muted-foreground ${task.completed ? "line-through" : ""}`}>
                              {task.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {task.resources.map((r, i) => (
                                <a
                                  key={i}
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2.5 py-1 rounded hover:bg-primary/20 transition-colors"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  {r.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
