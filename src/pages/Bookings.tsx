import { api } from "@/api/axios";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  }, []);

  const getAttendanceIcon = (attendance: string) => {
    switch (attendance) {
      case "attended":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "missed":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-warning" />;
    }
  };

  const getAttendanceStatus = (attendance: string) => {
    switch (attendance) {
      case "attended":
        return "active" as const;
      case "missed":
        return "expired" as const;
      default:
        return "pending" as const;
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 opacity-0 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">
            View and manage session bookings and attendance
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className="stat-card card-glow opacity-0 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/20">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attended Today</p>
              <p className="text-2xl font-bold text-foreground">42</p>
            </div>
          </div>
        </div>
        <div
          className="stat-card card-glow opacity-0 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning/20">
              <AlertCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">18</p>
            </div>
          </div>
        </div>
        <div
          className="stat-card card-glow opacity-0 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-destructive/20">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Missed</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="all"
        className="opacity-0 animate-fade-in"
        style={{ animationDelay: "400ms" }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <div className="flex gap-2 ml-auto">
            <Select>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="All Sessions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="hiit">HIIT</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="attended">Attended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all">
          {/* Bookings Table */}
          <div className="stat-card card-glow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                      Member
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                      Session
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                      Date & Time
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                      Location
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                      Attendance
                    </th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors opacity-0 animate-fade-in"
                      style={{ animationDelay: `${(index + 5) * 50}ms` }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-border">
                            <AvatarImage src={booking.member.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {booking.member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">
                            {booking.member.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {booking.session}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.trainer}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {booking.location}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getAttendanceIcon(booking.attendance)}
                          <StatusBadge
                            variant={getAttendanceStatus(booking.attendance)}
                          >
                            {booking.attendance.charAt(0).toUpperCase() +
                              booking.attendance.slice(1)}
                          </StatusBadge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {booking.attendance === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-3 text-success border-success/30 hover:bg-success/10"
                              >
                                Check In
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-3 text-destructive border-destructive/30 hover:bg-destructive/10"
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.attendance !== "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3"
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="today">
          <div className="stat-card card-glow text-center py-12">
            <p className="text-muted-foreground">
              Today's bookings will appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="stat-card card-glow text-center py-12">
            <p className="text-muted-foreground">
              Upcoming bookings will appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="stat-card card-glow text-center py-12">
            <p className="text-muted-foreground">
              Past bookings will appear here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Bookings;
