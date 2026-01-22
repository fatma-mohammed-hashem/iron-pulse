import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Trainer {
  id: number;
  name: string;
  photo: string;
}

export interface SessionData {
  id: number;
  description: string;
  trainer_name: string;
  trainerAvatar: string;
  category_name: string;
  time: string;
  date: string;
  capacity: number;
  booked: number;
  status: "upcoming" | "full" | "available";
}

interface SessionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session?: SessionData | null;
  trainers: Trainer[];
  onSave: (session: SessionData) => void;
}

const categories = ["Yoga", "HIIT", "Strength", "Cardio", "Dance", "Boxing", "Spinning", "Pilates"];

export function SessionFormModal({
  open,
  onOpenChange,
  session,
  trainers,
  onSave,
}: SessionFormModalProps) {
  const [formData, setFormData] = useState({
    description: "",
    trainer_name: "",
    category_name: "Yoga",
    startTime: "09:00",
    endTime: "10:00",
    capacity: 20,
  });

  useEffect(() => {
    const firstTrainer = trainers.length > 0 ? trainers[0].name : "";
    if (session) {
      const [startTime, endTime] = session.time.split(" - ").map((t) => {
        const [time, period] = t.split(" ");
        const [hours, minutes] = time.split(":");
        let h = parseInt(hours);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        return `${h.toString().padStart(2, "0")}:${minutes}`;
      });

      setFormData({
        description: session.description,
        trainer_name: session.trainer_name || firstTrainer,
        category_name: session.category_name,
        startTime,
        endTime,
        capacity: session.capacity,
      });
    } else {
      setFormData({
        description: "",
        trainer_name: firstTrainer,
        category_name: "Yoga",
        startTime: "09:00",
        endTime: "10:00",
        capacity: 20,
      });
    }
  }, [session, open, trainers]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    let h = parseInt(hours);
    const period = h >= 12 ? "PM" : "AM";
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return `${h.toString().padStart(2, "0")}:${minutes} ${period}`;
  };

  const handleSubmit = () => {
    if (trainers.length === 0) {
      alert("No trainers available. Please add a trainer first.");
      return;
    }

    const selectedTrainer = trainers.find((t) => t.name === formData.trainer_name) || trainers[0];

    const newSession: SessionData = {
      id: session?.id || Date.now(),
      description: formData.description,
      trainer_name: formData.trainer_name,
      trainerAvatar: selectedTrainer?.photo || "",
      category_name: formData.category_name,
      time: `${formatTime(formData.startTime)} - ${formatTime(formData.endTime)}`,
      date: "Today",
      capacity: formData.capacity,
      booked: session?.booked || 0,
      status: session?.status || "available",
    };

    onSave(newSession);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{session ? "Edit Session" : "Create New Session"}</DialogTitle>
          <DialogDescription>
            {session ? "Update session details below." : "Fill in the details to create a new session."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Session Description</Label>
            <Input
              id="description"
              placeholder="Morning Yoga Flow"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trainer_name">Trainer</Label>
              {trainers.length > 0 ? (
                <Select
                  value={formData.trainer_name}
                  onValueChange={(v) => setFormData({ ...formData, trainer_name: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainers.map((t) => (
                      <SelectItem key={t.id} value={t.name}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-500">No trainers available</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_name">Category</Label>
              <Select
                value={formData.category_name}
                onValueChange={(v) => setFormData({ ...formData, category_name: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              min={1}
              max={100}
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: parseInt(e.target.value) || 1 })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-primary text-primary-foreground">
            {session ? "Save Changes" : "Create Session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
