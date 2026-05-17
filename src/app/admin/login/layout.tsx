import { GuestGuard } from "@/components/admin/GuestGuard";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
