import AppContentHeader from "@/components/AppContentHeader";
import { UserButton } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <section className="h-screen p-8">
      <AppContentHeader title="Subscriptions" />
    </section>
  );
}
