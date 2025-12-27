import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        active: "bg-success/20 text-success border border-success/30",
        expired: "bg-destructive/20 text-destructive border border-destructive/30",
        pending: "bg-warning/20 text-warning border border-warning/30",
        full: "bg-destructive/20 text-destructive border border-destructive/30",
        upcoming: "bg-info/20 text-info border border-info/30",
        available: "bg-success/20 text-success border border-success/30",
        inactive: "bg-muted text-muted-foreground border border-border",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({ variant, children, showDot = true, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {showDot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "active" && "bg-success",
            variant === "expired" && "bg-destructive",
            variant === "pending" && "bg-warning",
            variant === "full" && "bg-destructive",
            variant === "upcoming" && "bg-info",
            variant === "available" && "bg-success",
            variant === "inactive" && "bg-muted-foreground"
          )}
        />
      )}
      {children}
    </span>
  );
}