import { createContext, useContext, ReactNode } from "react";
import { useUser } from "@/contexts/UserContext";

interface AdminProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AdminContextType {
  profile: AdminProfile | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();

  // لو اليوزر موجود ودوره admin حط البيانات، لو لا خلي profile null
  const profile = user?.role === "admin" ? user : null;

  return (
    <AdminContext.Provider value={{ profile }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
