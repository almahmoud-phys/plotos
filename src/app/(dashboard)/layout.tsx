import { DashboardHeader } from "./components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
