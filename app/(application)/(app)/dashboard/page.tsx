import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="mx-0 px-4 text-center">
      Hello in Dashboard
      <UserButton />
    </div>
  );
}
