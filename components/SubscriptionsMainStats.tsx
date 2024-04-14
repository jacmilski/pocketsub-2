import React from "react";
import SingleStatsComponents from "./SingleStatsComponents";
import { SUBSCRIPTION_CURRENCY } from "@prisma/client";
import { SubscriptionsMainStatsProps } from "@/app/interfaces/interfaces";

const SubscriptionsMainStats = async ({
  stats,
}: SubscriptionsMainStatsProps) => {
  return (
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
  );
};

export default SubscriptionsMainStats;
