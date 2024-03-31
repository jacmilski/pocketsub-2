import { UserButton } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <div className="mx-0 px-4 text-center">
      <aside>Subscriptions Aside</aside>
      {"   "}
      Hello in Subscriptions
      <UserButton />
    </div>
  );
}
