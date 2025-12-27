import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", members: 120, revenue: 24000 },
  { month: "Feb", members: 145, revenue: 29000 },
  { month: "Mar", members: 162, revenue: 32400 },
  { month: "Apr", members: 189, revenue: 37800 },
  { month: "May", members: 215, revenue: 43000 },
  { month: "Jun", members: 248, revenue: 49600 },
  { month: "Jul", members: 276, revenue: 55200 },
  { month: "Aug", members: 298, revenue: 59600 },
  { month: "Sep", members: 324, revenue: 64800 },
  { month: "Oct", members: 356, revenue: 71200 },
  { month: "Nov", members: 385, revenue: 77000 },
  { month: "Dec", members: 420, revenue: 84000 },
];

export function MembershipChart() {
  return (
    <div className="stat-card card-glow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Membership Growth</h3>
          <p className="text-sm text-muted-foreground">Monthly member count over the year</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Members</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145, 80%, 45%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(145, 80%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 18%)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 12%, 10%)",
                border: "1px solid hsl(220, 10%, 18%)",
                borderRadius: "8px",
                boxShadow: "0 4px 24px -4px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "hsl(0, 0%, 98%)" }}
              itemStyle={{ color: "hsl(145, 80%, 45%)" }}
            />
            <Area
              type="monotone"
              dataKey="members"
              stroke="hsl(145, 80%, 45%)"
              strokeWidth={2}
              fill="url(#colorMembers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}