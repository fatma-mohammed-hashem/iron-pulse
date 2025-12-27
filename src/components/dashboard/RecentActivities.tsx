import { UserPlus, CreditCard, Calendar, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "member",
    message: "New member Sarah Johnson registered",
    time: "2 minutes ago",
    icon: UserPlus,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    id: 2,
    type: "payment",
    message: "Premium plan payment received from Mike Chen",
    time: "15 minutes ago",
    icon: CreditCard,
    iconBg: "bg-success/20",
    iconColor: "text-success",
  },
  {
    id: 3,
    type: "session",
    message: "Yoga class session scheduled for tomorrow",
    time: "1 hour ago",
    icon: Calendar,
    iconBg: "bg-info/20",
    iconColor: "text-info",
  },
  {
    id: 4,
    type: "attendance",
    message: "15 members checked in for morning session",
    time: "2 hours ago",
    icon: CheckCircle,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    id: 5,
    type: "member",
    message: "New trainer application from David Park",
    time: "3 hours ago",
    icon: UserPlus,
    iconBg: "bg-warning/20",
    iconColor: "text-warning",
  },
];

export function RecentActivities() {
  return (
    <div className="stat-card card-glow">
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors opacity-0 animate-fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className={cn("p-2 rounded-lg", activity.iconBg)}>
              <activity.icon className={cn("w-4 h-4", activity.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}