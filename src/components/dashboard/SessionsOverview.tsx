import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", yoga: 12, strength: 18, cardio: 15, hiit: 8 },
  { day: "Tue", yoga: 15, strength: 22, cardio: 12, hiit: 10 },
  { day: "Wed", yoga: 18, strength: 25, cardio: 20, hiit: 12 },
  { day: "Thu", yoga: 14, strength: 20, cardio: 18, hiit: 9 },
  { day: "Fri", yoga: 20, strength: 28, cardio: 22, hiit: 14 },
  { day: "Sat", yoga: 25, strength: 30, cardio: 25, hiit: 16 },
  { day: "Sun", yoga: 22, strength: 15, cardio: 18, hiit: 10 },
];

export function SessionsOverview() {
  return (
    <div className="stat-card card-glow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Sessions</h3>
          <p className="text-sm text-muted-foreground">Session attendance by category</p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(145, 80%, 45%)" }} />
            <span className="text-xs text-muted-foreground">Yoga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(200, 80%, 50%)" }} />
            <span className="text-xs text-muted-foreground">Strength</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(38, 92%, 50%)" }} />
            <span className="text-xs text-muted-foreground">Cardio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(280, 70%, 55%)" }} />
            <span className="text-xs text-muted-foreground">HIIT</span>
          </div>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 18%)" vertical={false} />
            <XAxis
              dataKey="day"
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
            />
            <Bar dataKey="yoga" fill="hsl(145, 80%, 45%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="strength" fill="hsl(200, 80%, 50%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cardio" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="hiit" fill="hsl(280, 70%, 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}