import { useState } from "react";
import { Plus, Check, X, Edit, MoreVertical, Users, Zap } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const plans = [
  {
    id: 1,
    name: "Basic",
    price: 29,
    period: "month",
    description: "Perfect for beginners starting their fitness journey",
    features: [
      { name: "Access to gym equipment", included: true },
      { name: "Locker room access", included: true },
      { name: "Basic fitness assessment", included: true },
      { name: "Group classes", included: false },
      { name: "Personal training sessions", included: false },
      { name: "Nutrition consultation", included: false },
    ],
    activeMembers: 856,
    status: "active" as const,
    popular: false,
  },
  {
    id: 2,
    name: "Gold",
    price: 49,
    period: "month",
    description: "Great for regular gym-goers who want more variety",
    features: [
      { name: "Access to gym equipment", included: true },
      { name: "Locker room access", included: true },
      { name: "Basic fitness assessment", included: true },
      { name: "Group classes", included: true },
      { name: "Personal training sessions", included: false },
      { name: "Nutrition consultation", included: false },
    ],
    activeMembers: 624,
    status: "active" as const,
    popular: false,
  },
  {
    id: 3,
    name: "Premium",
    price: 79,
    period: "month",
    description: "The ultimate fitness experience with all amenities",
    features: [
      { name: "Access to gym equipment", included: true },
      { name: "Locker room access", included: true },
      { name: "Basic fitness assessment", included: true },
      { name: "Group classes", included: true },
      { name: "2 Personal training sessions/month", included: true },
      { name: "Nutrition consultation", included: true },
    ],
    activeMembers: 412,
    status: "active" as const,
    popular: true,
  },
  {
    id: 4,
    name: "Student",
    price: 19,
    period: "month",
    description: "Special discounted rate for students with valid ID",
    features: [
      { name: "Access to gym equipment", included: true },
      { name: "Locker room access", included: true },
      { name: "Basic fitness assessment", included: true },
      { name: "Limited group classes", included: true },
      { name: "Personal training sessions", included: false },
      { name: "Nutrition consultation", included: false },
    ],
    activeMembers: 264,
    status: "active" as const,
    popular: false,
  },
];

const Plans = () => {
  const [planStatuses, setPlanStatuses] = useState<Record<number, boolean>>(
    Object.fromEntries(plans.map((p) => [p.id, p.status === "active"]))
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 opacity-0 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Membership Plans</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage membership plans for your gym
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Create Plan
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`stat-card card-glow relative opacity-0 animate-fade-in ${
              plan.popular ? "ring-2 ring-primary" : ""
            }`}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Plan
                  </DropdownMenuItem>
                  <DropdownMenuItem>View Members</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete Plan</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground glow-text">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <div key={feature.name} className="flex items-center gap-3">
                  {feature.included ? (
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                      <X className="w-3 h-3 text-muted-foreground" />
                    </div>
                  )}
                  <span
                    className={`text-sm ${
                      feature.included ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{plan.activeMembers} members</span>
                </div>
                <StatusBadge variant={planStatuses[plan.id] ? "active" : "inactive"}>
                  {planStatuses[plan.id] ? "Active" : "Inactive"}
                </StatusBadge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan Status</span>
                <Switch
                  checked={planStatuses[plan.id]}
                  onCheckedChange={(checked) =>
                    setPlanStatuses((prev) => ({ ...prev, [plan.id]: checked }))
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Plans;