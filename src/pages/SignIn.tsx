import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-background px-4">
    <div className="w-full max-w-sm space-y-8 text-center">

      {/* 🔙 Go Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Go back
      </button>

      <div>
        <h1 className="text-3xl font-bold">
          <span className="text-primary">Lock</span> <span className="text-foreground">In</span>
        </h1>
        <p className="mt-2 text-muted-foreground">Welcome back</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 rounded-lg border-border bg-card text-card-foreground placeholder:text-muted-foreground"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12 rounded-lg border-border bg-card text-card-foreground placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-lg text-base font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  </div>
);
}
