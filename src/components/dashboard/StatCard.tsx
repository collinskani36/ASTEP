import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: "lavender" | "sage" | "peach" | "sky";
  trend?: { value: string; direction: "up" | "down" };
};

export const StatCard = ({ label, value, icon: Icon, accent = "lavender", trend }: Props) => {
  return (
    <Card className="p-5 rounded-2xl border-border/60 hover:shadow-card transition-smooth">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-display font-bold mt-1">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs mt-2 flex items-center gap-1",
                trend.direction === "up" ? "text-secondary" : "text-destructive"
              )}
            >
              {trend.direction === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend.value}
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0",
            accent === "lavender" && "bg-surface-lavender text-primary",
            accent === "sage" && "bg-surface-sage text-secondary",
            accent === "peach" && "bg-surface-peach text-primary",
            accent === "sky" && "bg-surface-sky text-secondary"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};
