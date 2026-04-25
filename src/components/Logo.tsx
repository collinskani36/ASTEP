import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import logo from "@/assets/logo.png";

interface LogoProps {
  variant?: "default" | "light";
}

export const Logo = ({ variant = "default" }: LogoProps) => {
  const textColor = variant === "light" ? "text-primary-foreground" : "text-foreground";
  const taglineColor = variant === "light" ? "text-primary-foreground/70" : "text-muted-foreground";
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    clickCount.current += 1;

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 500);

    if (clickCount.current >= 3) {
      e.preventDefault();
      clickCount.current = 0;
      if (resetTimer.current) clearTimeout(resetTimer.current);
      navigate("/dashboard");
    }
  };

  return (
    <Link to="/" onClick={handleClick} className="flex items-center gap-2.5 group select-none">
      <div className="relative">
        <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-soft group-hover:scale-105 transition-smooth">
          <img
            src={logo}
            alt="Astep Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col leading-tight">
        <span className={`font-display font-bold text-base ${textColor}`}>Astep</span>
        <span className={`text-[10px] font-medium ${taglineColor} -mt-0.5`}>
          Support Services
        </span>
      </div>
    </Link>
  );
};