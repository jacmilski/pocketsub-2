import AppContentHeader from "@/components/AppContentHeader";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <section className="h-screen p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Dashboard" />
      {/* CONTENT */}
    </section>
  );
}
