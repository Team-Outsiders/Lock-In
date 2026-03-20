import { Moon, Sun, LogOut, LayoutDashboard } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


interface NavbarProps {
  showGetStarted?: boolean;
  showLogout?: boolean;
}

export function Navbar({ showGetStarted, showLogout }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <Link to="/" className="text-xl font-bold">
        <span className="text-primary">Lock</span>{" "}
        <span className="text-foreground">In</span>
      </Link>
      <div className="flex items-center gap-3">

  {/* Theme Toggle */}
  <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
  </Button>

  {/* Dashboard Icon */}
  {user && (
    <Link to="/dashboard">
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
        <LayoutDashboard className="h-5 w-5" />
      </Button>
    </Link>
  )}

  {/* Existing buttons */}
  {showGetStarted && !user && (
    <Link to="/signup">
      <Button variant="outline" className="rounded-full border-border text-foreground hover:bg-secondary">
        Get Started
      </Button>
    </Link>
  )}

  {showLogout && user && (
    <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
      <LogOut className="h-5 w-5" />
    </Button>
  )}
</div>
    </nav>
  );
}
