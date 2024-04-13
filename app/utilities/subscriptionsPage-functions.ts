import {
  Payment,
  SUBSCRIPTION_BILLING_PERIOD,
  Subscription,
} from "@prisma/client";
import { exchangeRates } from "./dashboardCatBreakdown-functions";

export const getStats = (
  data: (Subscription & {
    payments: Payment[];
  })[],
) => {
  let activeSubscriptions = 0;
  let mostExpensive = 0;
  let cheapest = Infinity;
  let totalMonthlyCost = 0;
  let totalYearlyCost = 0;

  data.forEach((subscription) => {
    activeSubscriptions++;

    const costInPln = subscription.price * exchangeRates[subscription.currency];

    if (costInPln > mostExpensive) {
      mostExpensive = costInPln;
    }

    if (costInPln < cheapest) {
      cheapest = costInPln;
    }

    switch (subscription.billing_period) {
      case SUBSCRIPTION_BILLING_PERIOD.MONTHLY:
        totalMonthlyCost += costInPln;
        totalYearlyCost += costInPln * 12;
        break;
      case SUBSCRIPTION_BILLING_PERIOD.QUARTERLY:
        totalMonthlyCost += costInPln / 3;
        totalYearlyCost += costInPln * 4;
        break;
      case SUBSCRIPTION_BILLING_PERIOD.YEARLY:
        totalMonthlyCost += costInPln / 12;
        totalYearlyCost += costInPln;
      default:
        break;
    }
  });
  let avgCostPerSub = totalMonthlyCost / activeSubscriptions;
  return {
    totalActiveSubscriptions: activeSubscriptions,
    mostExpensive: mostExpensive.toFixed(2),
    cheapest: cheapest.toFixed(2),
    totalMonthlyCost: totalMonthlyCost.toFixed(2),
    totalYearlyCost: totalYearlyCost.toFixed(2),
    averageCostPerSubscription: avgCostPerSub.toFixed(2),
  };
};
