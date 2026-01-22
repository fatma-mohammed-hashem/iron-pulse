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
import { api } from "@/api/axios";

export interface TrainerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialties: string;
  hireDate: string | null;
  sessions: number;
  status: "active" | "inactive";
  avatar: string;
  gender: "male" | "female";
  dateOfBirth: string;
}

interface TrainerFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainer?: TrainerData | null;
  onSave: (trainer: TrainerData) => void;
}

export function TrainerFormModal({
  open,
  onOpenChange,
  trainer,
  onSave,
}: TrainerFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    specialties: "",
    hireDate: "",
    status: "active" as "active" | "inactive",
    gender: "male" as "male" | "female",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
        password: "",
        passwordConfirmation: "",
        specialties: trainer.specialties,
        hireDate: trainer.hireDate ?? "",
        status: trainer.status,
        gender: trainer.gender,
        dateOfBirth: trainer.dateOfBirth,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirmation: "",
        specialties: "",
        hireDate: "",
        status: "active",
        gender: "male",
        dateOfBirth: "",
      });
    }
  }, [trainer, open]);

  const handleSubmit = async () => {
    if (formData.password !== formData.passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      gender: formData.gender,
      date_of_birth: formData.dateOfBirth,
      specialties: formData.specialties,
      hire_date: formData.hireDate,
      status: formData.status,
    };

    try {
      if (trainer) {
        const res = await api.put(`/trainers/${trainer.id}`, payload);
        onSave(res.data.data);
      } else {
        const res = await api.post("/trainers", payload);
        onSave(res.data.data);
      }
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
      alert(
        err.response?.data?.message || "Error saving trainer. Check your input."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {trainer ? "Edit Trainer" : "Add New Trainer"}
          </DialogTitle>
          <DialogDescription>
            {trainer
              ? "Update trainer details below."
              : "Fill in the details to add a new trainer."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Marcus Williams"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="trainer@ironpulse.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="01234567890"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Password Confirmation */}
          <div className="space-y-2">
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>
            <Input
              id="passwordConfirmation"
              type="password"
              value={formData.passwordConfirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passwordConfirmation: e.target.value,
                })
              }
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(v) =>
                setFormData({ ...formData, gender: v as "male" | "female" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <Label htmlFor="specialties">Specialties</Label>
            <Input
              id="specialties"
              placeholder="Strength Training, Yoga, Cardio"
              value={formData.specialties}
              onChange={(e) =>
                setFormData({ ...formData, specialties: e.target.value })
              }
            />
          </div>

          {/* Hire Date */}
          <div className="space-y-2">
            <Label htmlFor="hireDate">Hire Date</Label>
            <Input
              id="hireDate"
              type="date"
              value={formData.hireDate}
              onChange={(e) =>
                setFormData({ ...formData, hireDate: e.target.value })
              }
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) =>
                setFormData({ ...formData, status: v as "active" | "inactive" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground"
          >
            {trainer ? "Save Changes" : "Add Trainer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
