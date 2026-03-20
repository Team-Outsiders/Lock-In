import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GeneratePlan() {
  const [subject, setSubject] = useState("");
  const [goal, setGoal] = useState("");
  const [examDate, setExamDate] = useState("");
  const [dailyHours, setDailyHours] = useState("2");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock generation delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-lg px-4 pt-16">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Generate Study Plan</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Tell us what you're studying and our AI will create a personalized day-by-day plan with resources.
        </p>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <BookOpen className="h-4 w-4" /> Subject
            </Label>
            <Input
              placeholder="e.g., Organic Chemistry, Data Structures, Calculus II"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="h-12 rounded-lg border-border bg-card text-card-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Goal (optional)</Label>
            <Input
              placeholder="e.g., Score 90%+ on midterm, Master recursion concepts"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="h-12 rounded-lg border-border bg-card text-card-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Calendar className="h-4 w-4" /> Exam Date
              </Label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
                className="h-12 rounded-lg border-border bg-card text-card-foreground"
              />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Clock className="h-4 w-4" /> Daily Hours
              </Label>
              <Select value={dailyHours} onValueChange={setDailyHours}>
                <SelectTrigger className="h-12 rounded-lg border-border bg-card text-card-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1h / day</SelectItem>
                  <SelectItem value="2">2h / day</SelectItem>
                  <SelectItem value="3">3h / day</SelectItem>
                  <SelectItem value="4">4h / day</SelectItem>
                  <SelectItem value="5">5h / day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg text-base font-semibold gap-2 bg-muted text-foreground hover:bg-muted/80"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Generating..." : "Generate Plan"}
          </Button>
        </form>
      </main>
    </div>
  );
}
