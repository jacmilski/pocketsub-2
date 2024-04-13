import AppContentHeader from "@/components/AppContentHeader";
import { SUBSCRIPTION_CURRENCY } from "@prisma/client";
import SingleStatsComponents from "@/components/SingleStatsComponents";
import { getDataForDashboard } from "@/app/utilities/dashboardMainStats-functions";
import { getStats } from "@/app/utilities/subscriptionsPage-functions";

export default async function SubscriptionsPage() {
  const data = await getDataForDashboard();
  if (!data) return <div>Ładowanie ...</div>;
  const stats = getStats(data);

  return (
    <section className="h-screen p-8">
      <AppContentHeader title="Subscriptions" />
      <main className="mx-auto grid h-full max-w-7xl grid-cols-1 grid-rows-[80px,_1fr] gap-6 py-6">
        <div className="rounded-xl bg-zinc-50 p-6">
          <div className="flex h-full items-center justify-between">
            <div className="flex h-full items-center gap-6">
              <SingleStatsComponents
                subTitle="Active subscriptions"
                sum={stats.totalActiveSubscriptions}
                currency={" " as SUBSCRIPTION_CURRENCY}
              />
            </div>
            <div className="flex h-full items-center gap-6">
              <SingleStatsComponents
                subTitle="Most expensive subscription"
                currency={SUBSCRIPTION_CURRENCY.PLN}
                sum={stats.mostExpensive}
              />
              <SingleStatsComponents
                subTitle="Cheapest subscription"
                currency={SUBSCRIPTION_CURRENCY.PLN}
                sum={stats.cheapest}
              />
              <SingleStatsComponents
                subTitle="Total monthly cost"
                currency={SUBSCRIPTION_CURRENCY.PLN}
                sum={stats.totalMonthlyCost}
              />
              <SingleStatsComponents
                subTitle="Total yearly cost"
                currency={SUBSCRIPTION_CURRENCY.PLN}
                sum={stats.totalYearlyCost}
              />
              <SingleStatsComponents
                subTitle="Average cost"
                currency={SUBSCRIPTION_CURRENCY.PLN}
                sum={stats.averageCostPerSubscription}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6"></div>
      </main>
    </section>
  );
}
